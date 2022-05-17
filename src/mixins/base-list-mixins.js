/**
 * @Description: 基础列表混入方法
 * @Author: Zander
 * @Date: 2022/5/6 16:21
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/6 16:21
 */
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      tableHeight: '100%',
      searchParams: {},
      pageParam: {
        pageNum: 1,
        pageSize: 20,
        sort: '', // 默认排序列
        order: '' // 默认排序方式
      },
      handleSearchListValue: 0,
      selection: []
    }
  },
  computed: {
    getSort: function () {
      let order = 'ascending';
      if (this.pageParam.order === 'desc') {
        order = 'descending';
      }

      return {
        prop: this.pageParam.sort,
        order: order
      };
    }
  },
  methods: {
    // 操作分页
    handlePage(params) {
      Object.assign(this.pageParam, params);
      this.handleSearchListValue++;
    },
    // 排序
    sortChange(data) {
      const { prop, order } = data;

      Object.assign(this.pageParam, {
        sort: prop,
        order: order
      });

      this.handleSearchListValue++;
    },
    // 获取表格查询参数
    getSearchParams(params) {
      if (typeof params === 'object') {
        this.searchParams = JSON.parse(JSON.stringify(params));
      }
      Object.assign(this.searchParams, this.pageParam);

      return this.searchParams;
    },
    // 设置查询结果参数
    setSearchResult(pageName, result) {
      const { success, data } = result;
      if (success) {
        const { list } = data;
        this.tableData = list;

        delete data.list;

        Object.assign(this.pageParam, data);

        const refPage = this.$refs[pageName];
        if (refPage) {
          refPage.setPage(this.pageParam);
        }
      }
    },
    // 编辑方法总线挂载
    handleTableEdit(eventName, row) {
      this.$bus.emit(eventName, row, 'edit');
    },
    // 查看方法总线挂载
    handleTableView(eventName, row) {
      this.$bus.emit(eventName, row, 'view');
    },
    // 监听复选框事件
    selectTable(selection) {
      this.selection = selection;
      // 非单个禁用
      const single = selection.length !== 1;
      // 非多个禁用
      const multiple = !selection.length;
      this.$emit('changeTableSelection', single, multiple, selection)
    }
  }
}
