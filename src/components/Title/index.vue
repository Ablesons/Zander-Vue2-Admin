<!--
 * @Description: 标题
 * @Author: Zander
 * @Date: 2022/5/10 14:39
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/10 14:39
 -->
<template>
  <div class="block">
    <div class="tit" :style="setStyle">
      <div class="title" :style="{ 'border-color': borderColor }">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="right">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    bgColor: {
      type: String,
      default: '#fff'
    },
    borderShow: {
      type: Boolean,
      default: true
    },
    borderColor: {
      type: String,
      default: '#3877d6'
    },
    customStyle: Object
  },
  computed: {
    setStyle() {
      const obj = {
        borderBottom: !this.borderShow ? 'none' : '1px dashed #cae0f6',
        background: this.bgColor
      };
      return Object.assign(obj, this.customStyle, {});
    }
  }
}
</script>

<style scoped lang="scss">
.block {
  .tit {
    padding: 5px 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    .title {
      padding-left: 8px;
      border-left: 4px solid #3877d6;
      line-height: 1;
      color: #3877d6;
      font-weight: bold;
      font-size: 15px;
    }

    .right {
      padding-right: 10px;
    }
  }
}
</style>
