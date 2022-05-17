<!--
 * @Description: 左侧导航收起折叠
 * @Author: Zander
 * @Date: 2022/5/10 15:22
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/10 15:22
 -->
<template>
  <div :class="[{ 'is-active': isActive }]" @click="toggleClick">
    <icon-svg
      icon-class="hamburger"
      class="hamburgerIcon"
      width="20"
      height="20"
    />
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped lang="scss">
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
