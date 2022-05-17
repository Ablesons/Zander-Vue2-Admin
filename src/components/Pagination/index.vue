<!--
 * @Description: 列表分页插件
 * @Author: Zander
 * @Date: 2022/5/16 16:31
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/16 16:31
 -->
<template>
  <div class="pagination-container">
    <div class="operation-panel">
      <div class="btn-item">
        <slot name="start"></slot>
      </div>
      <div class="btn-item" @click="handleExportClick">
        <el-tooltip
          class="item"
          effect="dark"
          content="导出Excel"
          placement="top-start"
          v-if="showExcel"
        >
          <icon-svg
            icon-class="excel"
            title="导出"
            style="width: 22px;height: 22px;"
          />
        </el-tooltip>
      </div>
      <div class="btn-item">
        <slot name="end"></slot>
      </div>
    </div>
    <el-pagination
      background
      small
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      :layout="pagination.layout"
      :total="pageParam.total"
      :pager-count="pagerCount"
      :current-page="pagination.pageIndex"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    showExcel: {
      type: Boolean,
      default: false
    },
    pagerCount: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      pagination: {
        pageIndex: 1, // 当前位于哪页
        pageSize: 20, // 1页显示多少条
        pageSizes: [20, 50, 100, 200, 500, 1000, 2000], // 每页显示多少条
        layout: 'total, sizes, prev, pager, next, jumper' // 翻页属性
      },
      pageParam: {}
    }
  },
  methods: {
    setPage(param) {
      this.pageParam = JSON.parse(JSON.stringify(param));
      Object.assign(this.pagination, {
        pageSize: this.pageParam.pageSize || 20
      });
    },
    /**
     * 上下分页 pageIndex
     * @param pageNum
     */
    handleCurrentChange(pageNum) {
      this.$emit(
        'handlePage',
        Object.assign(this.pageParam, {
          pageNum: pageNum
        })
      );
    },
    /**
     * 每页多少条切换
     * @param pageSize
     */
    handleSizeChange(pageSize) {
      this.$emit(
        'handlePage',
        Object.assign(this.pageParam, {
          pageSize: pageSize
        })
      );
    },
    /**
     * 导出文件
     */
    handleExportClick() {
      this.$emit('handleExport');
    }
  }
}
</script>

<style scoped lang="scss">
.pagination-container {
  background: #ffffff;
  padding: 10px 15px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: space-between;
  .operation-panel {
    height: 22px;
    line-height: 22px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: space-between;
    .btn-item{
      height: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      justify-content: space-between;
      .svg-icon {
        cursor: pointer;
      }
    }
  }
  ::v-deep .el-pagination {
    .el-input{
      display: inline-block;
      .el-input__inner {
        height: 22px;
        line-height: 22px;
      }
    }
  }
}
::v-deep .el-pagination__jump{
  margin-left: 10px;
}

.pagination-container.hidden {
  display: none;
}
</style>
