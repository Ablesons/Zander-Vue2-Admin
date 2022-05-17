<!--
 * @Description: 下拉组件 - 请求接口
 * @Author: Zander
 * @Date: 2022/5/17 22:08
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/17 22:08
 -->
<template>
  <div class="zd-select-plus" style="width: 100%;">
    <el-input
      v-if="disabled"
      :placeholder="placeholder"
      v-model="temp"
      suffix-icon="el-icon-search"
      disabled
      :size="size"
    />
    <el-popover
      v-else
      popper-class="el-select-dropdown"
      ref="popover"
      trigger="focus"
      :placement="placement"
      v-model="visible"
      :open-delay="5"
      @after-enter="handleAfterEnter"
      @after-leave="handleHide"
      :append-to-body="appendToBody">
      <el-input
        clearable
        v-model="temp"
        slot="reference"
        ref="refInputElement"
        :size="size"
        :placeholder="placeholder"
        suffix-icon="el-icon-search"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @clear="handleClear"
        @keydown.native.stop="handleKeyDown"/>
      <el-pagination
        v-if="total > 0"
        style="margin-bottom: 3px;"
        :current-page.sync="currentPage"
        small
        background
        :pager-count="5"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="defaultPageSize"
        :total="total"
        layout="total, pager, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <el-table
        border
        stripe
        :style="{width: `${width}px`}"
        :show-header="showHeader"
        :data="filterGridData"
        :max-height="height"
        :tabindex="-1"
        ref="elementSelectTable"
        highlight-current-row
        empty-text="暂无数据"
        fit
        v-loading="loading"
        :row-style="rowStyle"
        @row-click="handleClick"
        @row-dblclick="handleDblClick"
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange"
        :header-cell-style="{
          background: 'rgb(230,238,250)',
          fontSize: '13px',
          color: 'black'
        }">
        <el-table-column
          align="center"
          v-for="(item, index) in showColumn"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        />
      </el-table>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'SelectPlus',
  props: {
    width: Number,
    height: {
      type: Number,
      default: 300
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    dblclick: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    filterKey: String,
    placement: {
      type: String,
      default: 'bottom'
    },
    inputKey: {
      type: String,
      required: true
    },
    inputLabel: {
      type: String,
      required: true
    },
    interface: {
      type: Function,
      required: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    defaultQuery: {
      type: Boolean,
      default: true
    },
    allowCustom: {
      type: Boolean,
      default: false
    },
    autoUpperCase: {
      type: Boolean,
      default: false
    },
    defaultPageSize: {
      type: Number,
      default: 10
    },
    defaultQueryParam: Object,
    showColumn: {
      type: Array,
      required: true
    },
    inputInner: String,
    value: [String, Number],
    appendToBody: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'mini'
    }
  },
  data() {
    return {
      visible: false,
      queryParam: {
        pageNum: 1,
        pageSize: this.defaultPageSize
      },
      temp: '',
      fixLabel: '',
      loading: false,
      gridData: [],
      filterGridData: [],
      currentPage: 1,
      total: 0,
      selectedRow: [],
      selectedIndex: 0
    }
  },
  watch: {
    inputInner(val) {
      if (val) {
        this.temp = val;
        this.fixLabel = val;
      }
    },
    value(val) {
      if (!val) {
        this.clear()
      }
    }
  },
  mounted() {
    if (this.inputInner) {
      this.temp = this.inputInner;
      this.fixLabel = this.temp;
    }
    addEventListener('keyup', this.keyUp)
  },
  beforeDestroy() {
    removeEventListener('keyup', this.keyUp)
  },
  methods: {
    init() {
      let param = this.queryParam;
      if (this.filterKey) {
        this.queryParam[this.filterKey] = this.temp;
      }
      if (this.defaultQueryParam) {
        param = Object.assign(this.queryParam, this.defaultQueryParam);
      }
      this.getGridData(param);
    },
    getGridData(param) {
      this.loading = true;
      this.interface(param).then(res => {
        this.loading = false;
        if (this.filterKey) {
          delete this.queryParam[this.filterKey];
        }
        if (res && res.data && res.success) {
          if (res.data.list) {
            this.gridData = res.data.list;
            this.total = res.data.total;
          }
          if (res.data instanceof Array) {
            this.total = -1;
            this.gridData = res.data;
          }
          this.filterGridData = this.gridData;
        }
        this.handleAfterEnter();
      }).catch(() => {
        this.loading = false;
      })
    },
    handleAfterEnter() {
      this.$nextTick(() => {
        this.$refs.popover && this.$refs.popover.updatePopper();
      });
    },
    handleHide() {
      if (!this.allowCustom && this.fixLabel !== this.temp) {
        this.clear();
      }
    },
    handleInput(val) {
      if (this.allowCustom) {
        this.$emit('input', val);
        this.$emit('select', val);
        this.$emit('update:inputInner', val);
        this.$emit('change', val);
      }
      if (!val) {
        if (this.defaultQuery) {
          this.clear();
          if (this.total > 0) {
            if (this.filterKey) {
              this.queryParam[this.filterKey] = val;
            }
            this.queryParam.pageNum = 1;
            this.queryParam.pageSize = this.defaultPageSize;
            this.getGridData(this.queryParam);
            return;
          }
          this.filterGridData = this.gridData;
        } else {
          this.filterGridData = [];
          this.gridData = [];
        }
        return;
      }
      if (this.total >= 0) {
        this.queryParam.pageNum = 1;
        this.queryParam.pageSize = this.defaultPageSize;
        if (this.filterKey) {
          if (this.autoUpperCase) {
            this.queryParam[this.filterKey] = val.toUpperCase();
          } else {
            this.queryParam[this.filterKey] = val;
          }
        }
        this.getGridData(this.queryParam);
        return;
      }
      this.filterGridData = this.gridData.filter(data => {
        let bool = false;
        for (let i = 0; i < this.showColumn.length; i++) {
          const col = this.showColumn[i];
          const prop = col.prop;
          if (data[prop] && data[prop].indexOf(val) > -1) {
            bool = true;
          }
        }
        return bool;
      });
    },
    handleBlur() {
      if (!this.allowCustom && !this.filterKey) {
        this.clear();
      }
    },
    handleFocus() {
      this.init();
      this.visible = true;
    },
    handleClear() {
      this.currentPage = 1;
      this.$emit('clear', null);
    },
    handleSizeChange(val) {
      this.queryParam.pageNum = 1;
      this.queryParam.pageSize = val;
      if (this.filterKey) {
        this.queryParam[this.filterKey] = this.temp;
      }
      this.getGridData(this.queryParam);
    },
    handleCurrentChange(val) {
      this.queryParam.pageNum = val;
      if (this.filterKey) {
        this.queryParam[this.filterKey] = this.temp;
      }
      this.getGridData(this.queryParam);
    },
    rowStyle({ row, rowIndex }) {
      Object.defineProperty(row, 'rowIndex', {
        // 给每行添加不可枚举属性rowIndex来标识当前行
        value: rowIndex,
        writable: true,
        enumerable: false
      });
    },
    handleClick(row) {
      if (!this.dblclick) {
        this.handleSelect(row);
      }
    },
    handleDblClick(row) {
      if (this.dblclick) {
        this.handleSelect(row);
      }
    },
    tableRowClassName(row) {
      let rowName = '';
      const findRow = this.selectedRow.find(item => item.rowIndex === row.rowIndex);
      if (findRow) {
        rowName = 'rowStyle '; // 可以通过此处给选中行一个class，根据自己需求更改样式
      }
      return rowName; // 也可以再加上其他类名 如果有需求的话
    },
    handleSelectionChange(rows) {
      this.selectedRow = rows; // 保存已选择行
    },
    handleSelect(row) {
      this.temp = row[this.inputLabel];
      this.fixLabel = this.temp;
      this.$emit('input', row[this.inputKey]);
      this.$emit('select', row);
      this.$emit('update:inputInner', this.temp);
      this.$emit('change', row[this.inputKey]);
      this.visible = false;
    },
    clear() {
      this.temp = '';
      this.$emit('input', null);
      this.$emit('select', null);
      this.$emit('update:inputInner', null);
      this.$emit('change', null);
    },
    keyUp(e) {
      // 表格没有数据时不执行后续方法
      if (this.filterGridData.length === 0) {
        return;
      }
      const refsElTable = this.$refs.elementSelectTable;
      const elTableTr = refsElTable.$el.getElementsByClassName('el-table__row').item(0);
      if (e.keyCode === 40) {
        this.$nextTick(() => {
          if (this.selectedRow.length === 0) {
            this.selectedIndex = 0;
          } else if (this.selectedIndex === this.filterGridData.length - 1) {
            this.selectedIndex = 0;
            refsElTable.bodyWrapper.scrollTop = -(
              elTableTr.offsetHeight *
              (this.filterGridData.length - 6)
            );
          } else {
            if (this.selectedIndex > 6 && this.selectedIndex < 14) {
              refsElTable.bodyWrapper.scrollTop =
                elTableTr.offsetHeight * (this.selectedIndex - 6);
            }
            this.selectedIndex++;
          }
          if (!refsElTable) {
            return;
          }
          const findRow = this.selectedRow.find(item => item.rowIndex === this.selectedIndex);
          // 如果只有一行且点击的也是这一行则取消选择 否则清空再选中当前点击行
          if (findRow && this.selectedRow.length === 1) {
            refsElTable.toggleRowSelection(
              this.filterGridData[this.selectedIndex],
              false
            );
            return;
          }
          refsElTable.clearSelection();
          refsElTable.toggleRowSelection(this.filterGridData[this.selectedIndex]); // 把现在当前行勾选
        })
      } else if (e.keyCode === 38) {
        // 上键
        this.$nextTick(() => {
          if (this.selectedRow.length === 0) {
            // 当前没有选中行，则直接选中第一个
            this.selectedIndex = 0;
          } else if (this.selectedIndex === 0) {
            // 如果选中的是第一行了，那么下一行选中的是最后一行
            this.selectedIndex = this.filterGridData.length - 1;
            refsElTable.bodyWrapper.scrollTop =
              elTableTr.offsetHeight * (this.filterGridData.length - 6);
          } else {
            // 正常递减
            this.selectedIndex--;
            refsElTable.bodyWrapper.scrollTop += -elTableTr.offsetHeight;
          }
          if (!refsElTable) {
            return;
          }
          const findRow = this.selectedRow.find(item => item.rowIndex === this.selectedIndex); // 找出当前选中行
          // 如果只有一行且点击的也是这一行则取消选择 否则清空再选中当前点击行
          if (findRow && this.selectedRow.length === 1) {
            refsElTable.toggleRowSelection(
              this.filterGridData[this.selectedIndex],
              false
            );
            return;
          }
          refsElTable.clearSelection();
          refsElTable.toggleRowSelection(this.filterGridData[this.selectedIndex]); // 把现在当前行勾选
        })
      } else if (e.keyCode === 13) {
        // 回车键
        if (document.hasFocus() && document.activeElement === refsElTable.$el) {
          this.handleSelect(refsElTable.selection[0]);
          this.$refs.refInputElement.focus();
        }
      }
      e.stopPropagation();
      e.cancelBubble = true;
      e.preventDefault();
    },
    handleKeyDown(event) {
      if (event.keyCode === 40) {
        this.focusFirstNode();
      }
    },
    focusFirstNode() {
      this.$nextTick(() => {
        const self = this;
        const refsElTable = this.$refs.elementSelectTable.$el;
        if (refsElTable) {
          refsElTable.focus();
          !self && refsElTable.click();
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .rowStyle {
  background: #f5f7fa !important;
}
</style>
