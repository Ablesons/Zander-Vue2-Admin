/**
 * @Description: 表格组件方法
 * @Author: Zander
 * @Date: 2022/5/10 15:03
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/10 15:03
 */
export default {
  props: {
    tableId: {
      type: String,
      default: ''
    },
    setting: {
      type: Boolean,
      default: false
    },
    showExport: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    height: {
      type: Number | String,
      default: '100%'
    },
    maxHeight: {
      type: String,
      default: '100%'
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'mini'
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightCurrentRow: {
      type: Boolean,
      default: true
    },
    rowClassName: [String, Function],
    rowStyle: [Object, Function],
    cellClassName: [String, Function],
    cellStyle: [Object, Function],
    headerRowClassName: [String, Function],
    headerRowStyle: [Object, Function],
    headerCellClassName: [String, Function],
    headerCellStyle: [Object, Function],
    defaultSort: Object,
    pageShow: {
      type: Boolean,
      default: true
    },
    showColumns: Object,
    pageConfig: Object,
    selectionShow: {
      type: Boolean,
      default: true
    },
    indexShow: {
      type: Boolean,
      default: true
    },
    editMode: {
      type: String,
      default: 'row'
    },
    activeMethod: Function
  },
  data() {
    return {
      sortData: { field: '', order: 'desc' },
      selection: []
    }
  },
  watch: {
    defaultSort: {
      handler(val) {
        if (val) {
          const { prop, order } = val;
          Object.assign(this.sortData, {
            field: prop,
            order: order === 'ascending' ? 'asc' : 'desc'
          });
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    importChange(scope, label, value) {
      this.$refs.editorTable.updateStatus(scope)
      this.$emit('import-change', scope, label, value)
    },
    handleSelectAll({ checked, records }) {
      this.$emit('select-all', records, checked);
    },
    handleTableChange({ checked, records }) {
      this.selection = records;
      this.$emit('selection-change', records, checked);
    },
    cellClick({ row, column, cell, $event }) {
      this.$emit('cell-click', row, column, cell, $event);
      this.$emit('row-click', row, column, $event);
    },
    cellDblclick({ row, column, cell, $event }) {
      this.$emit('cell-dblclick', row, column, cell, $event);
      this.$emit('row-dblclick', row, column, $event);
    },
    sortChange({ column, property, order }) {
      const obj = { column: column, prop: property, order: order };
      Object.assign(obj, {
        order: order === 'asc' ? 'ascending' : 'descending'
      })
      this.$emit('sort-change', obj);
    },
    filterChange(filterList) {
      this.$emit('filter-change', filterList);
    },
    headerClick({ column, $event }) {
      this.$emit('header-click', column, $event);
    },
    currentChange({ newValue, oldValue }) {
      this.$emit('current-change', newValue, oldValue);
    },
    clearSelection() {
      if (this.$refs.editorTable) {
        this.$refs.editorTable.clearCheckboxRow();
      } else {
        console.error('clearSelection方法为找到，可能表格未加载完毕');
      }
    },
    toggleRowSelection(row) {
      this.$refs.editorTable.toggleCheckboxRow(row);
    },
    toggleAllSelection() {
      if (this.$refs.editorTable) {
        this.$refs.editorTable.toggleAllCheckboxRow();
      } else {
        console.error('toggleAllSelection方法为找到，可能表格未加载完毕');
      }
    },
    setCurrentRow(row) {
      if (row) {
        this.$refs.editorTable.setCurrentRow(row);
      } else {
        this.$refs.editorTable.setCurrentRow();
      }
    },
    sort(prop, order) {
      this.$refs.editorTable.sort(prop, order);
    }
  }
}
