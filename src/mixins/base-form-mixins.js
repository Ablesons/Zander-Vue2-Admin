/**
 * @Description: 基础表单混入方法
 * @Author: Ableson
 * @Date: 2021/11/18 13:59
 * @LastEditors: Ableson
 * @LastEditTime: 2021/11/18 13:59
 */
export default {
  data() {
    return {
      autocomplete: 'off',
      isHandleContinue: false,
      dbForm: {},
      loading: false
    }
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '新增/编辑'
    },
    formWidth: Number,
    fit: {
      type: Boolean,
      default: false
    },
    formHeight: Number,
    formParam: Object
  },
  computed: {
    action: function () {
      if (this.formParam && this.formParam.action) {
        return this.formParam.action;
      }
      return '';
    }
  },
  methods: {
    deepCopy(param) {
      return JSON.parse(JSON.stringify(param));
    }
  }
}
