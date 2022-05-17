<!--
 * @Description: 表格组件
 * @Author: Zander
 * @Date: 2022/5/10 15:04
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/10 15:04
 -->
<template>
  <div class="custom-table-box" ref="tableBox" :style="{ height, maxHeight }">
    <div :style="{height: `calc(100% - ${pageShow ? 36 : 0}px)`}">
      <vxe-table
        ref="editorTable"
        :id="tableId"
        :border="border"
        v-loading="loading"
        :stripe="stripe"
        :size="size"
        :height="'100%'"
        :show-header="showHeader"
        :highlight-current-row="highlightCurrentRow"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :cell-class-name="cellClassName"
        :cell-style="cellStyle"
        :header-row-class-name="headerRowClassName"
        :header-row-style="headerRowStyle"
        :header-cell-class-name="headerCellClassName"
        :header-cell-style="headerCellStyle"
        show-header-overflow
        show-overflow
        keep-source
        :row-config="{isHover: true, height: 30}"
        :column-config="{resizable: true}"
        :custom-config="{storage: (true & setting)}"
        align="center"
        :data="data"
        :sort-config="{trigger: 'cell', remote: true, defaultSort: sortData, orders: ['desc', 'asc', null]}"
        :edit-config="{trigger: 'click', mode: editMode, showStatus: true, activeMethod: activeMethod}"
        @edit-disabled="editDisabledEvent"
        @edit-actived="editActivedEvent"
        @sort-change="sortChange"
        @resizable-change="resizableChangeEvent()"
        @checkbox-all="handleSelectAll"
        @checkbox-change="handleTableChange"
        @cell-click="cellClick"
        @cell-dblclick="cellDblclick"
        @filter-change="filterChange"
        @header-cell-click="headerClick"
        @current-change="currentChange">
        <vxe-column type="checkbox" title="checkbox" width="40" fixed="left"/>
        <vxe-column type="seq" title="序号" width="50" fixed="left"/>
        <template v-for="item in tableColumn">
          <!-- 操作列/自定义列 -->
          <slot v-if="item.slot" :name="item.slot"></slot>
          <!-- 普通列 -->
          <vxe-column
            v-else
            :key="item.key || item.value"
            :field="item.value"
            :title="item.label"
            :fixed="item.fixed"
            :width="item.width"
            :min-width="item.minWidth"
            :filters="item.filters"
            :sortable="item.sortable === undefined ? true : item.sortable"
            :formatter="item.formatter"
            :edit-render="{autofocus: '.el-input__inner', enabled: (typeof item.type === 'string')}"
          >
            <template v-if="item.dict" #default="{ row }">
              <span>{{ setDicName(item.dict, row[item.value]) }}</span>
            </template>
            <template #edit="{ row, column }">
              <el-input v-if="item.type === 'text'" :disabled="disabled[item.value]" v-model="row[item.value]" clearable size="mini" type="text" @change="importChange({ row, column }, item.value, row[item.value])" />
              <el-input v-if="item.type === 'textarea'" :disabled="disabled[item.value]" v-model="row[item.value]" clearable size="mini" type="textarea" @change="importChange({ row, column }, item.value, row[item.value])" />
              <el-input-number v-if="item.type === 'number'" :disabled="disabled[item.value]" v-model="row[item.value]" clearable size="mini" :max="item.max" :min="item.min" :precision="item.precision" :step="item.step" :controls-position="item.position" @change="importChange({ row, column }, item.value, row[item.value])" />
              <zd-select v-if="item.type === 'select'" :dict="item.dict" :disabled="disabled[item.value]" v-model="row[item.value]" clearable size="mini" @change="importChange({ row, column }, item.value, row[item.value])"/>
              <el-time-picker v-if="item.type === 'time'" :disabled="disabled[item.value]" v-model="row[item.value]" clearable size="mini" @change="importChange({ row, column }, item.value, row[item.value])" />
              <el-date-picker v-if="item.type === 'date'" :disabled="disabled[item.value]" v-model="row[item.value]" clearable size="mini" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" @change="importChange({ row, column }, item.value, row[item.value])" />
              <el-date-picker v-if="item.type === 'week'" :disabled="disabled[item.value]" v-model="row[item.value]" clearable size="mini" type="week" @change="importChange({ row, column }, item.value, row[item.value])" />
              <el-date-picker v-if="item.type === 'month'" :disabled="disabled[item.value]" v-model="row[item.value]" clearable size="mini" type="month" @change="importChange({ row, column }, item.value, row[item.value])" />
              <el-date-picker v-if="item.type === 'year'" :disabled="disabled[item.value]" v-model="row[item.value]" clearable size="mini" type="year" @change="importChange({ row, column }, item.value, row[item.value])" />
              <el-date-picker v-if="item.type === 'datetime'" :disabled="disabled[item.value]" v-model="row[item.value]" clearable size="mini" type="datetime" @change="importChange({ row, column }, item.value, row[item.value])" />
            </template>
          </vxe-column>
        </template>
      </vxe-table>
    </div>
    <div class="ab-disposition" v-if="pageShow || $slots.default">
      <div class="operation-panel">
        <div class="setting-btn" v-if="showExport || setting">
          <el-tooltip class="item" effect="dark" content="导出文件" placement="top">
            <i v-if="showExport" class="symbol el-icon-download" @click="handleTemplateDownload"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="设置表格显示列" placement="top">
            <i v-if="setting" class="symbol el-icon-setting" @click="dialogVisible = true" >
              <el-dialog
                title="列表设置"
                top="0px"
                width="270px"
                :visible.sync="dialogVisible"
                append-to-body
                modal-append-to-body
                modal
                ref="transferDialogBox"
                custom-class="ab-virtual"
                :close-on-click-modal="false"
              >
                <div class="transfer-box">
                  <div class="transfer-title">
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAll">全选<span>{{ actualColumns.length }}/{{ columns.length }}</span></el-checkbox>
                  </div>
                  <div class="transfer-body">
                    <el-checkbox-group class="transfer-list" v-model="actualColumns" @change="handleCheckedCities">
                      <el-checkbox v-for="column in checkAllList" :label="column.value" :key="column.value">{{ column.label }}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="handleTransfer">确 定</el-button>
              <el-button type="success" @click="handleResetTransfer">还 原</el-button>
              <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
              </el-dialog>
            </i>
          </el-tooltip>
        </div>
        <slot></slot>
      </div>
      <el-pagination
        v-if="pageShow && pageParam.total > 0"
        background
        small
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        :layout="pagination.layout"
        :total="pageParam.total"
        :pager-count="pagination.pageCount"
        :current-page="pagination.pageIndex"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script>
import tableMixin from './index.js';
import { commonUtils } from '@utils/common';
import Sortable from 'sortablejs';
import { localStorageUtils } from '@utils/storage';
import { getDicName } from '@utils/cache';

export default {
  name: 'ZdTable',
  mixins: [tableMixin],
  data() {
    return {
      dialogVisible: false,
      actualColumns: [],
      tableColumn: [],
      columnsWidth: {},
      pagination: {
        pageCount: 5, // 分页按钮个数
        pageIndex: 1, // 当前位于哪页
        pageSize: 20, // 1页显示多少条
        pageSizes: [20, 50, 100, 200, 500, 1000, 2000], // 每页显示多少条
        layout: 'total, sizes, prev, pager, next, jumper' // 翻页属性
      },
      pageParam: {},
      checkAllList: [],
      checkList: [],
      isIndeterminate: true,
      checkAll: false,
      sortable: null,
      disabled: {}
    }
  },
  watch: {
    pageConfig: {
      handler() {
        Object.assign(this.pagination, this.pageConfig, {});
      },
      deep: true,
      immediate: true
    },
    dialogVisible(val) {
      if (val) {
        this.sortableCheckbox();
        return;
      }
      if (this.sortable) {
        this.sortable.destroy();
        this.sortable = null;
      }
    }
  },
  computed: {
    setDicName() {
      return (label, value) => {
        return getDicName(label, value);
      }
    }
  },
  mounted () {
    this.columnDrop();
  },
  beforeDestroy() {
    if (this.sortable) {
      this.sortable.destroy();
    }
  },
  methods: {
    changeActualColumns() {
      const obj = {}, list = [], arr = [];
      this.columns.forEach(item => {
        obj[item.value] = item;
        arr.push(item.value);
      });
      if (this.actualColumns && this.actualColumns.length > 0) {
        this.actualColumns.forEach(item => {
          list.push(Object.assign(obj[item], {
            key: commonUtils.getUUID(),
            width: this.columnsWidth[item] > 0 ? this.columnsWidth[item] : obj[item].width
          }));
        });
        this.tableColumn = list;
      } else {
        this.tableColumn = this.columns;
        this.actualColumns = arr;
        this.checkList = arr;
        this.checkAllList = JSON.parse(JSON.stringify(this.columns))
      }
      this.handleCheckedCities(this.actualColumns)
      this.$refs.editorTable.refreshColumn();
    },
    setTableColumns(columns, type) {
      if (this.tableId !== '' && this.setting) {
        const column = localStorageUtils.getItem('TABLE_COLUMNS') || {};
        const state = type === 'delete' ? type : column[this.tableId] ? 'update' : 'add';
        const data = {
          columns: columns,
          type: state
        }
        const obj = Object.assign(column, { [this.tableId]: data }, {});
        localStorageUtils.setItem('TABLE_COLUMNS', obj)
      }
      this.$emit('setColumns', columns);
    },
    getLocalTableColumns() {
      if (this.tableId !== '') {
        const column = localStorageUtils.getItem('TABLE_COLUMNS');
        if (column && column[this.tableId]) {
          const columns = column[this.tableId].columns;
          const customData = {}, list = [], obj = {}, arr = [];
          this.columns.forEach(item => {
            obj[item.value] = item;
          });
          columns.map(column => {
            if (column.show) {
              customData[column.value] = column.width
            }
            arr.push(column.value)
            list.push(obj[column.value])
          })
          this.columnsWidth = customData;
          this.actualColumns = Object.keys(customData) || [];
          this.checkList = arr;
          this.checkAllList = list;
        }
      }
    },
    async handleTransfer() {
      await this.changeActualColumns();
      await this.resizableChangeEvent('');
      this.$refs.editorTable.refreshColumn();
      this.dialogVisible = false;
    },
    async handleResetTransfer() {
      const obj = {}, arr = [];
      this.columns.forEach(item => {
        obj[item.value] = item;
        arr.push(item.value);
      });
      this.tableColumn = this.columns;
      this.actualColumns = arr;
      this.checkList = arr;
      this.checkAllList = JSON.parse(JSON.stringify(this.columns))
      await this.changeActualColumns();
      await this.resizableChangeEvent('delete');
      this.$refs.editorTable.refreshColumn();
      this.dialogVisible = false;
    },
    columnDrop() {
      this.$nextTick(() => {
        if (this.showColumns && this.showColumns.length > 0) {
          const customData = {}, list = [], obj = {}, arr = [];
          this.columns.forEach(item => {
            obj[item.value] = item;
          });
          this.showColumns.map(column => {
            if (column.show) {
              customData[column.value] = column.width
            }
            arr.push(column.value)
            list.push(obj[column.value])
          })
          this.actualColumns = Object.keys(customData);
          this.columnsWidth = customData;
          this.checkList = arr;
          this.checkAllList = list;
        } else {
          this.getLocalTableColumns();
        }
        this.changeActualColumns();
      })
    },
    setPage(param) {
      this.pageParam = JSON.parse(JSON.stringify(param));
      Object.assign(this.pagination, {
        pageSize: this.pageParam.pageSize || 20
      });
    },
    // 上下分页 pageIndex
    handleCurrentChange(pageNum) {
      this.$emit(
        'handlePage',
        Object.assign(this.pageParam, {
          pageNum: pageNum
        })
      );
    },
    // 每页多少条切换 pageSize
    handleSizeChange(pageSize) {
      this.$emit(
        'handlePage',
        Object.assign(this.pageParam, {
          pageSize: pageSize
        })
      );
    },
    resizableChangeEvent(type) {
      const columns = this.$refs.editorTable.getColumns()
      const customData = {};
      columns.map(column => {
        if (column.type === undefined) {
          customData[column.property] = column.renderWidth
        }
      })
      const arr = this.checkAllList.map(item => {
        return {
          value: item.value,
          width: customData[item.value] ? customData[item.value] : 0,
          show: typeof customData[item.value] === 'number'
        }
      })
      this.setTableColumns(arr, type);
    },
    async insertEvent(row, defaultValue, active) {
      const $table = this.$refs.editorTable;
      const { row: newRow } = await $table.insertAt(defaultValue || {}, row)
      if (active) {
        await $table.setActiveCell(newRow, active);
      }
    },
    getInsertEvent() {
      const $table = this.$refs.editorTable;
      return $table.getInsertRecords();
    },
    getUpdateEvent() {
      const $table = this.$refs.editorTable;
      return $table.getUpdateRecords();
    },
    removeCheckboxRow() {
      this.$refs.editorTable.removeCheckboxRow();
    },
    remove (row) {
      const $table = this.$refs.editorTable
      $table.remove(row)
    },
    handleGetTableDate() {
      const $table = this.$refs.editorTable;
      return $table.getTableData().fullData
    },
    saveEvent() {
      const $table = this.$refs.editorTable;
      const { insertRecords, removeRecords, updateRecords } = $table.getRecordset();
      return { insertRecords, removeRecords, updateRecords };
    },
    editDisabledEvent({ row, column }) {
      this.$emit('edit-disabled', { row, column });
    },
    editActivedEvent({ row, rowIndex }) {
      this.disabled = {};
      this.$emit('edit-actived', this.disabled, { row, rowIndex });
    },
    handleCheckAll(val) {
      if (!val) {
        this.$message.error('请至少选择一个，否则默认全显示。')
      }
      this.actualColumns = val ? this.checkList : [];
      this.isIndeterminate = false;
    },
    handleCheckedCities(value) {
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.columns.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.columns.length;
      this.actualColumns = this.checkList.filter(item => this.actualColumns.includes(item))
    },
    handleTemplateDownload() {
      this.$emit('export');
    },
    sortableCheckbox() {
      const _this = this
      this.$nextTick(() => {
        const el = _this.$refs.transferDialogBox.$el.querySelector('.transfer-list');
        _this.sortable = Sortable.create(el, {
          handle: '.el-checkbox',
          ghostClass: 'dragHostBg',
          chosenClass: 'dragHostBg',
          dragClass: 'drag',
          onEnd: ({ newIndex, oldIndex }) => {
            const columns = _this.checkAllList, list = [];
            const targetRow = columns.splice(oldIndex, 1)[0];
            columns.splice(newIndex, 0, targetRow);
            _this.checkAllList = columns;
            columns.forEach(item => {
              list.push(item.value);
            })
            this.checkList = list;
            this.actualColumns = this.checkList.filter(item => this.actualColumns.includes(item))
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.custom-table-box{
  position: relative;
  ::v-deep .vxe-table {
    .vxe-body--column {
      .vxe-cell {
        padding: 0 5px;
        .el-input--mini {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          .el-input__inner {
            width: 100%;
          }
        }
        .el-textarea__inner {
          height: 30px;
          min-height: auto !important;
          box-sizing: border-box;
        }
      }
    }
  }
}
.ab-disposition {
  background: #ffffff;
  padding: 5px 10px;
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
    flex: 1;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: flex-start;
    .setting-btn {
      width: 50px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      font-weight: bold;
      flex-shrink: 0;
      justify-content: space-between;
      padding-right: 5px;
      .symbol {
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        flex-shrink: 0;
        border: 1px solid #dcdfe6;
        border-radius: 50%;
        font-size: 12px;
        cursor: pointer;
        &:hover {
          color: #409eff;
          border-color: #c6e2ff;
          background-color: #ecf5ff;
        }
      }
    }
  }
}
::v-deep .ab-virtual {
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
    background-color: #eaeaea;
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
    padding: 10px;
    .transfer-box {
      width: 250px;
      max-height: 100%;
      overflow: hidden;
      position: relative;
      border-radius: 4px;
      background: #FFFFFF;
      vertical-align: middle;
      border: 1px solid #e6ebf5;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      .transfer-title {
        margin: 0;
        height: 40px;
        color: #000000;
        line-height: 40px;
        background: #F5F7FA;
        padding-left: 15px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        border-bottom: 1px solid #e6ebf5;
        .el-checkbox{
          display: block;
          line-height: 40px;
          .el-checkbox__label {
            color: #303133;
            font-size: 14px;
            font-weight: normal;
            span {
              position: absolute;
              right: 15px;
              color: #909399;
              font-size: 12px;
              font-weight: normal;
            }
          }
        }
      }
      .transfer-body {
        height: 330px;
        .transfer-list {
          height: 100%;
          padding: 6px 0;
          overflow: auto;
          box-sizing: border-box;
          -webkit-box-sizing: border-box;
          .el-checkbox {
            height: 30px;
            line-height: 30px;
            padding-left: 15px;
            display: block !important;
          }
        }
      }
    }
  }
  .el-dialog__footer {
    padding: 10px;
    background-color: #eaeaea;
  }
}
::v-deep .el-pagination {
  .el-input {
    display: inline-block;
    .el-input__inner {
      height: 22px;
      line-height: 22px;
    }
  }
}
::v-deep .el-pagination__jump {
  margin-left: 10px;
}
</style>
