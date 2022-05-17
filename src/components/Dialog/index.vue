<!--
 * @Description: 弹窗组件封装
 * @Author: Zander
 * @Date: 2022/5/16 21:14
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/16 21:14
 -->
<template>
  <div :class="`${action === 'view' ? 'zd-dialog-view' : ''}`" v-bind:key="myKey">
    <el-dialog
      :title="title"
      :top="'0px'"
      :visible.sync="isVisible"
      :width="mySize"
      :modal="modal"
      :custom-class="customClass"
      :modal-append-to-body="modalBody"
      :append-to-body="false"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      :wrapperClosable="false"
      :close-on-press-escape="closeEscape"
      @open="handleDrawerOpen"
      @close="handleDrawerClose"
    >
      <div
        class="form-dialog-body"
        :style="{ height: myHeight, maxHeight: myMaxHeight }"
      >
        <div class="tw-dialog-loading" v-if="loading" v-loading="loading"></div>
        <slot ></slot>
      </div>
      <div slot="footer" class="form-dialog-footer" v-if="$slots.foot">
        <slot name="foot" ></slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { commonUtils } from '@utils/common';

export default {
  name: 'Dialog',
  props: {
    action: {
      type: String,
      default: 'add'
    },
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '新增/编辑'
    },
    size: {
      type: Number,
      default: 800
    },
    height: Number,
    closeEscape: {
      type: Boolean,
      default: false
    },
    fit: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: true
    },
    appendBody: {
      type: Boolean,
      default: false
    },
    modalBody: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    customClass: String
  },
  watch: {
    visible () {
      this.isVisible = this.visible;
      if (this.isVisible) {
        if (this.appendBody) {
          document.body.appendChild(this.$el);
        }
        this.setStyle();
      }
    }
  },
  data() {
    return {
      mySize: '0',
      myHeight: null,
      myMaxHeight: null,
      isVisible: false,
      myKey: commonUtils.getUUID()
    }
  },
  mounted() {
    if (this.isVisible) {
      if (this.appendBody) {
        document.body.appendChild(this.$el);
      }
      this.setStyle();
    }
    if (this.closeEscape) {
      this.handleEsc();
    }
  },
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },
  deactivated() {
    if (this.appendBody && this.$el && this.$el.parentNode) {
      this.$emit('close');
    }
  },
  methods: {
    setStyle() {
      this.$nextTick(() => {
        const clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
        const el = this.$el.getElementsByClassName('el-dialog__wrapper')[0];
        const num = this.$slots.foot ? 123 : 75;
        this.myMaxHeight = `calc(100vh - ${num + el.offsetTop}px)`;
        if (this.fit) {
          this.mySize = `${clientWidth - el.offsetLeft}px`;
          this.myHeight = `calc(100vh - ${num + el.offsetTop}px)`;
        } else {
          if (this.size > clientWidth) {
            this.mySize = `${clientWidth - el.offsetLeft}px`;
            this.myHeight = `calc(100vh - ${num + el.offsetTop}px)`;
          } else {
            this.myHeight = `${this.height}px`;
            this.mySize = `${this.size}px`;
          }
        }
      })
    },
    handleEsc() {
      const self = this;
      this.$nextTick(function() {
        document.addEventListener('keyup', function(e) {
          // 此处填写你的业务逻辑即可
          if (e.keyCode === 27) {
            self.handleDrawerClose();
          }
        });
      });
    },
    handleDrawerOpen() {
      this.$emit('open');
    },
    handleDrawerClose() {
      this.myKey = commonUtils.getUUID();
      this.$emit('close');
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog {
  overflow: hidden;
  margin-bottom: 0;
  top: 50%;
  transform: translateY(-50%);
  .el-dialog__header {
    position: relative;
    padding: 10px;
    color: #797979;
    font-weight: 400;
    border-bottom: 1px solid #e8eaec;
    background-color: #f5f7fa;
    box-sizing: border-box;
    .el-dialog__title {
      font-size: 16px;
    }
    .el-dialog__headerbtn {
      top: 50%;
      transform: translateY(-50%);
      .el-dialog__close:hover {
        color: #1b9aee;
      }
    }
    .el-dialog__headerbtn:hover .el-dialog__close {
      color: #2b579a;
    }
  }
  .el-dialog__body {
    padding: 15px;
    .form-dialog-body {
      //max-height: calc(100vh - 207px);
      box-sizing: border-box;
      overflow-y: auto;
      overflow-x: hidden;
      padding-right: 5px;
      .tw-dialog-loading {
        position: absolute !important;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
      &::-webkit-scrollbar {
        width: 3px;
      }
      &::-webkit-scrollbar-thumb {
        background: #d8d8d8;
        border-radius: 10px;
      }
      &::-webkit-scrollbar-track-piece {
        background: transparent;
      }
    }
  }
  .el-dialog__footer {
    padding: 10px;
  }
}
</style>
