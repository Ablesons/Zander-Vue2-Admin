<!--
 * @Description: 测试样例 - 列表查询面板
 * @Author: Zander
 * @Date: 2022/5/16 22:07
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/16 22:07
 -->
<template>
  <div class="search-container">
    <el-form :model="queryParams" ref="queryForm">
      <el-row>
        <el-col :span="6">
          <el-form-item prop="id">
            <el-input
              clearable
              v-model="queryParams.id"
              placeholder="请输入主键"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item prop="code">
            <el-input
              clearable
              v-model="queryParams.code"
              placeholder="请输入编码"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item prop="name">
            <el-input
              clearable
              v-model="queryParams.name"
              placeholder="请输入名称"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item prop="status">
            <zd-select
              v-model="queryParams.status"
              clearable
              placeholder="请选择有效状态（0：无效；1：有效）"
              dict="USER_STATUS"
            />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item prop="creatorId">
            <el-input
              clearable
              v-model="queryParams.creatorId"
              placeholder="请输入创建人ID"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item prop="creator">
            <el-input
              clearable
              v-model="queryParams.creator"
              placeholder="请输入创建人"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item prop="updaterId">
            <el-input
              clearable
              v-model="queryParams.updaterId"
              placeholder="请输入更新人ID"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item prop="updater">
            <el-input
              clearable
              v-model="queryParams.updater"
              placeholder="请输入更新人"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item prop="createDate">
            <el-date-picker
              clearable
              value-format="yyyy-MM-dd"
              v-model="queryParams.createDate"
              type="daterange"
              range-separator="至"
              start-placeholder="创建时间开始日期"
              end-placeholder="创建时间结束日期"
            />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item prop="updateDate">
            <el-date-picker
              clearable
              value-format="yyyy-MM-dd"
              v-model="queryParams.updateDate"
              type="daterange"
              range-separator="至"
              start-placeholder="更新时间开始日期"
              end-placeholder="更新时间结束日期"
            />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item prop="creatorOrgid">
            <el-input
              clearable
              v-model="queryParams.creatorOrgid"
              placeholder="请输入创建人机构ID"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item prop="isdel">
            <el-input-number
              clearable
              v-model="queryParams.isdel"
              controls-position="right"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'TestSearch',
  data() {
    return {
      queryParams: {
        id: null,
        code: null,
        name: null,
        status: null,
        creatorId: null,
        creator: null,
        updaterId: null,
        updater: null,
        createDate: null,
        updateDate: null,
        creatorOrgid: null,
        isdel: null
      }
    }
  },
  // 初始化
  created() {
    // 注册全局事件,一定要销毁全局事件,避免未知Bug
    this.$bus.on('handleTestSearch', this.handleTestSearch);
  },
  beforeDestroy() {
    // 销毁全局事件
    this.$bus.off('handleTestSearch', this.handleTestSearch);
  },
  mounted() {
    this.handleTestSearch();
  },
  methods: {
    handleTestSearch() {
      this.$bus.emit('searchTestList', JSON.parse(JSON.stringify(this.queryParams)));
    },
    handleTestReset() {
      this.$refs.queryForm.resetFields();
      this.handleQuery();
    }
  }
}
</script>
