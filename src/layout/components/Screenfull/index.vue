<!--
 * @Description: 全屏设置
 * @Author: Zander
 * @Date: 2022/5/11 11:52
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/11 11:52
 -->
<template>
  <div id="screenfull" @click="click">
    <icon-svg :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" />
  </div>
</template>

<script>
import screenfull from 'screenfull';
const sf = screenfull;

export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    }
  },
  beforeDestory() {
    if (sf.isEnabled) {
      sf.off('change', this.change);
    }
  },
  mounted() {
    if (sf.isEnabled) {
      sf.on('change', this.change);
    }
  },
  methods: {
    change() {
      if (sf.isEnabled) {
        this.isFullscreen = sf.isFullscreen;
      }
    },
    click() {
      if (!sf.isEnabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        });
        return;
      }
      sf.toggle();
    }
  }
}
</script>
