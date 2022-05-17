<!--
 * @Description: 测试样例 - 列表
 * @Author: Zander
 * @Date: 2022/5/16 22:07
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/16 22:07
 -->
<template>
  <div class="table-container">
    <zd-table
      tableId="test_table"
      ref="myTestTable"
      border
      page-show
      setting
      showExport
      height="100%"
      :loading="loading"
      :data="tableData"
      :columns="columns"
      @sort-change="sortChange"
      @select-all="selectTable"
      @selection-change="selectTable"
      @row-dblclick="dblclick"
      :default-sort="getSort"
      @handlePage="handlePage"
      @export="handleExport"
    />
  </div>
</template>

<script>
import BaseListMixins from '@/mixins/base-list-mixins';
import { apiTestExportExcel, apiTestLogicBatchDeleteByIds, apiTestLogicDeleteById, apiTestSearch } from '@api/test';

export default {
  name: 'TestList',
  mixins: [BaseListMixins],
  data() {
    return {
      columns: [
        {
          label: '主键',
          value: 'id',
          width: 100
        },
        {
          label: '编码',
          value: 'code',
          width: 100
        },
        {
          label: '名称',
          value: 'name',
          width: 100
        },
        {
          label: '有效状态',
          value: 'status',
          width: 100,
          dict: 'USER_STATUS'
        },
        {
          label: '创建人ID',
          value: 'creatorId',
          width: 100
        },
        {
          label: '创建人',
          value: 'creator',
          width: 100
        },
        {
          label: '更新人ID',
          value: 'updaterId',
          width: 100
        },
        {
          label: '更新人',
          value: 'updater',
          width: 100
        },
        {
          label: '创建时间',
          value: 'createDate',
          width: 100
        },
        {
          label: '更新时间',
          value: 'updateDate',
          width: 100
        }
      ]
    }
  },
  watch: {
    handleSearchListValue(params) {
      this.searchTestList(params)
    }
  },
  created() {
    // 注册全局事件,一定要销毁全局事件,避免未知Bug
    this.$bus.on('searchTestList', this.searchTestList);

    Object.assign(this.pageParam, {
      sort: '', // 默认排序列
      order: 'desc' // 默认排序方式
    });
  },
  beforeDestroy() {
    // 销毁全局事件
    this.$bus.off('searchTestList', this.searchTestList);
  },
  methods: {
    searchTestList(params) {
      this.loading = true
      apiTestSearch(this.getSearchParams(params)).then(result => {
        this.loading = false;
        this.setSearchResult('myTestTable', result);
      })
    },
    dblclick(row) {
      this.handleTableEdit('handleTestEditForm', row)
    },
    handleClick(row) {
      this.handleTableView('handleTestViewForm', row)
    },
    handleTestDelete(row) {
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true;
        apiTestLogicDeleteById(row.id).then(result => {
          this.loading = false;

          if (result) {
            if (result.success) {
              // 刷新表格数据
              this.searchTestList(false);

              this.$message({
                message: result.message,
                type: 'success'
              });
            } else {
              this.$message({
                message: result.message,
                type: 'error'
              });
            }
          }
        })
      }).catch(() => {});
    },
    handleTestBatchDelete() {
      const ids = this.selection.map(item => item.id);
      this.$confirm(`此操作将删除${ids.length}条记录, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true;
        apiTestLogicBatchDeleteByIds(ids.join(',')).then(result => {
          this.loading = false;
          if (result) {
            if (result.success) {
              // 刷新表格数据
              this.searchTestList(this.searchParams);
              this.$message({
                message: result.message,
                type: 'success'
              });
            } else {
              this.$message({
                message: result.message,
                type: 'error'
              });
            }
          }
        }).catch(() => {})
      }).catch(() => {})
    },
    handleExport() {
      this.loading = true;
      const params = this.searchParams;
      Object.assign(params, { fileName: '测试样例' });
      apiTestExportExcel(params).then(() => {
        this.loading = false;
      });
    }
  }
}
</script>
