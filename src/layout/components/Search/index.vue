<!--
 * @Description: 头部搜索组件
 * @Author: Zander
 * @Date: 2022/5/15 14:33
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/15 14:33
 -->
<template>
  <div :class="{'show':show}" class="header-search">
    <icon-svg class-name="search-icon" icon-class="sousuo" />
    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="change"
    >
      <el-option v-for="item in options" :key="item.path" :value="item" :label="item.title.join(' > ')" />
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      search: '',
      options: [],
      searchPool: [],
      show: false,
      fuse: undefined
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    change() {},
    querySearch() {}
  }
}
</script>

<style scoped lang="scss">
.header-search {

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
