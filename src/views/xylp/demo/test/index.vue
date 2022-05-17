<!--
 * @Description: 测试
 * @Author: Zander
 * @Date: 2022/5/16 21:23
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/16 21:23
 -->
<template>
  <div class="zd-container">
    <zd-toolbar>
      <template slot="btn">
        <el-button
          type="success"
          class="btn-refresh"
          size="mini"
          icon="el-icon-refresh"
          @click="handleTestRefresh"
        >
          刷新
        </el-button>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-search"
          class="btn-search"
          @click="handleTestSearch"
        >查询</el-button
        >
        <el-button
          type="info"
          size="mini"
          icon="el-icon-refresh-right"
          class="btn-reset"
          @click="handleTestReset"
        >重置</el-button
        >
        <el-button
          v-permission="['TEST-ADD']"
          type="success"
          size="mini"
          class="btn-create"
          icon="el-icon-plus"
          @click="handleTestAdd"
        >
          新增
        </el-button>
        <el-button
          v-permission="['TEST-DEL-LOGIC-BATCH']"
          type="danger"
          size="mini"
          class="btn-CancelStowage"
          icon="el-icon-delete"
          :disabled="single"
          @click="handleTestDelete"
        >
          删除
        </el-button>
        <el-button
          v-permission="['TEST-DEL-LOGIC-BATCH']"
          type="danger"
          size="mini"
          class="btn-delete"
          icon="el-icon-delete"
          :disabled="multiple"
          @click="handleTestBatchDelete"
        >
          批量删除
        </el-button>
      </template>
      <TestSearch ref="testSearchComponents" />
    </zd-toolbar>
    <TestList ref="testTableComponents" @changeTableSelection="changeSelection" />
    <TestForm
      ref="testFormComponents"
      :isVisible="isVisible"
      :title="title"
      :fit="true"
      :formParam="formParam"
      @closeDialog="isVisible = false"
    />
  </div>
</template>

<script>
import TestSearch from './components/search'
import TestList from './components/list'
import TestForm from './components/form'

export default {
  name: 'test',
  components: { TestSearch, TestList, TestForm },
  data() {
    return {
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 弹出层标题
      title: '',
      isVisible: false,
      formParam: {
        action: 'add',
        data: null
      },
      selection: []
    }
  },
  created() {
    this.$bus.on('handleTestEditForm', this.handleTestForm);
  },
  beforeDestroy() {
    this.$bus.off('handleTestEditForm', this.handleTestForm);
  },
  methods: {
    handleTestAdd() {
      this.title = '添加信息'
      this.formParam = {
        action: 'add',
        data: null
      }
      this.isVisible = true
    },
    handleTestForm(rowData, action) {
      if (action === 'edit') {
        this.title = '编辑信息';
      } else if (action === 'view') {
        this.title = '查看信息';
      }
      this.formParam = {
        action: action,
        data: rowData
      };
      this.isVisible = true;
    },
    handleTestSearch() {
      this.$refs.testSearchComponents.handleTestSearch();
    },
    handleTestRefresh() {
      this.$refs.testSearchComponents.handleTestSearch();
    },
    handleTestReset() {
      this.$refs.testSearchComponents.handleTestReset();
    },
    handleTestDelete() {
      this.$refs.testTableComponents.handleTestDelete();
    },
    handleTestBatchDelete() {
      this.$refs.testTableComponents.handleTestBatchDelete();
    },
    changeSelection(single, multiple, selection) {
      this.selection = selection
      this.single = single
      this.multiple = multiple
    }
  }
}
</script>
