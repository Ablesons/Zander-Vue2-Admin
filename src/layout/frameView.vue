<!--
 * @Description: iFrame组件
 * @Author: Zander
 * @Date: 2022/5/10 15:07
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/10 15:07
 -->
<template>
  <div class="frame" v-loading="loading">
    <iframe class="frame-iframe" ref="refFrameElement" :src="frameSrc" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: 'frameView',
  data() {
    return {
      loading: false,
      frameSrc: this.src
    }
  },
  props: {
    src: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.loading = true;
    this.init();
  },
  methods: {
    init() {
      this.$nextTick(() => {
        const iframe = this.$refs.refFrameElement;
        if (iframe) {
          if (iframe.attachEvent) {
            iframe.attachEvent('onload', () => {
              this.loading = false
            })
          } else {
            iframe.onload = () => {
              this.loading = false
            }
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.frame {
  height: 100vh;
  z-index: 998;

  .frame-iframe {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 0;
    box-sizing: border-box;
  }
}

.main-content {
  margin: 0 !important;
}
</style>
