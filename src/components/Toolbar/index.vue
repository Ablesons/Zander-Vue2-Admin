<!--
 * @Description: 工具条
 * @Author: Zander
 * @Date: 2022/5/9 15:01
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/9 15:01
 -->
<template>
  <div class="components-container zd-toolbar" ref="appMain" v-resize.immediate="changeHeight">
    <div class="head-top">
      <div class="left-panel">
        <div class="tit-left">
          <div class="fix">
            <icon-svg
              style="width: 24px;height: 24px;"
              icon-class="finger"
              color="#0099CC"
            />
          </div>
          <div class="txt">操作按钮:</div>
        </div>
        <div
          :key="myKey"
          class="btn"
          v-resize.immediate="getBtnListElement"
          ref="btnListElement"
        >
          <slot name="btn"></slot>
          <div
            v-show="advancedSwitch"
            style="padding-left: 10px;display: inline-block;"
          >
            <el-popover trigger="hover" placement="bottom">
              <div class="btn_advanced" ref="advancedElement"></div>
              <el-tag slot="reference">更多操作</el-tag>
            </el-popover>
          </div>
        </div>
      </div>
      <div class="fold" @click="handleClick">
        <div class="symbol" :class="active === 'open' ? '' : 'active'">
          <span class="line line1"></span>
          <span class="line line2"></span>
        </div>
        <div class="desc">折叠层</div>
      </div>
    </div>
    <el-collapse class="coll-opera" v-model="active">
      <el-collapse-item name="open">
        <slot></slot>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { commonUtils } from '@utils/common';

export default {
  name: 'index',
  data() {
    return {
      active: 'open',
      myKey: '',
      advancedSwitch: false,
      parentHeight: null,
      parentNode: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$emit('expand', true);
      this.parentHeight = this.$el.parentNode.offsetHeight;
      this.parentNode = this.$el.parentNode;
      this.changeHeight({ height: this.$el.offsetHeight });
    })
    this.myKey = commonUtils.getUUID();
    this.advancedSwitch = false;
    this.$el.addEventListener('keyup', this.keyUpEnter)
  },
  beforeDestroy() {
    this.$el.removeEventListener('keyup', this.keyUpEnter)
  },
  // keep-alive 缓存路由切换后调用
  activated() {
    this.myKey = commonUtils.getUUID();
    this.advancedSwitch = false;
  },
  methods: {
    // 获取btnList的宽度
    getBtnListElement() {
      this.parentHeight = this.$el.parentNode.offsetHeight;
      this.parentNode = this.$el.parentNode;
      this.changeHeight({ height: this.$el.offsetHeight });
      const ele = this.$refs.btnListElement;
      const advanced = this.$refs.advancedElement
      const eleWidth = ele.offsetWidth, node = [];
      let width = 120;
      const eleBtn = ele.getElementsByTagName('button');
      for (let i = 0, len = eleBtn.length; i < len; i++) {
        const btnWidth = eleBtn[i].offsetWidth;
        const btnMarginLeft = Number(
          window.getComputedStyle(eleBtn[i], null).marginLeft.replace(/[^\d]/g, '')
        );
        width += btnWidth + btnMarginLeft;
        if (width > eleWidth) {
          this.advancedSwitch = true;
          node.push(eleBtn[i]);
        }
      }
      if (node.length > 0) {
        node.forEach(item => {
          advanced.appendChild(item);
        });
      }
    },
    changeHeight({ height }) {
      if (this.parentNode) {
        const tableContainer = this.parentNode.getElementsByClassName('table-container')[0];
        if (tableContainer) {
          tableContainer.style.height = `${this.parentHeight - (height + 22)}px`
        }
      }
    },
    handleClick() {
      this.active = this.active === 'open' ? '' : 'open';
      this.$emit('expand', this.active === 'open');
    },
    keyUpEnter(e) {
      if (e.keyCode === 13) {
        this.$emit('keyUpEnter')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.components-container {
  width: 100%;
  margin-bottom: 2px;
  position: relative;

  .head-top {
    padding: 5px 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: space-between;

    .left-panel {
      width: calc(100% - 70px);
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;

      .tit-left {
        width: 80px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;

        .txt {
          color: #666;
          font-size: 12px;
          margin-left: 5px;
        }
      }

      .btn {
        width: calc(100% - 100px);
        margin-left: 10px;
      }
    }

    .fold {
      width: 70px;
      height: 30px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      cursor: pointer;
      font-size: 0;

      .symbol {
        width: 12px;
        display: inline-block;
        position: relative;

        .line {
          position: absolute;
          width: 12px;
          height: 4px;
          top: 50%;
          left: 50%;
          background: #0099cc;
          margin-left: -6px;
          margin-top: -2px;
        }
      }

      .active {
        .line1 {
          transform: rotate(90deg);
        }
        .line2 {
          transform: rotate(180deg);
        }
      }

      .desc {
        display: inline-block;
        color: #fff;
        font-size: 12px;
        width: 47px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        margin-left: 10px;
        border-radius: 2px;
        background: -moz-linear-gradient(left, #0099cc, #0099cc); /*火狐*/
        background: -webkit-gradient(
            linear,
            0% 0%,
            0% 100%,
            from(#0099cc),
            to(#0099cc)
        ); /*谷歌*/
      }
    }
  }

  ::v-deep .el-collapse {
    border-top: unset;

    .el-collapse-item {
      .el-collapse-item__header {
        height: 0;

        .el-collapse-item__arrow {
          display: none;
        }
      }

      .el-collapse-item__wrap {
        padding: 0;
        border-top: 2px solid #0099cc;

        .el-collapse-item__content {
          padding-bottom: 0;

          .el-form {
            .el-input__inner::-webkit-input-placeholder {
              color: #5b5b5b;
            }
            .el-input__inner::-moz-input-placeholder {
              color: #5b5b5b;
            }
            .el-input__inner::-ms-input-placeholder {
              color: #5b5b5b;
            }
            .el-range-input::-webkit-input-placeholder {
              color: #5b5b5b;
            }
            .el-range-input::-moz-input-placeholder {
              color: #5b5b5b;
            }
            .el-range-input::-ms-input-placeholder {
              color: #5b5b5b;
            }
          }
        }
      }
    }
  }
  ::v-deep .el-tag {
    padding: 7px 15px;
    height: auto;
    line-height: 1;
    cursor: pointer;
  }
}
</style>
