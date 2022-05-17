<!--
 * @Description: 测试样例 - 添加、编辑
 * @Author: Zander
 * @Date: 2022/5/16 22:08
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/16 22:08
 -->
<template>
  <zd-dialog
    :title="title"
    :size="formWidth"
    :visible="isVisible"
    :height="formHeight"
    :fit="fit"
    :action="action"
    :loading="loading"
    @open="openDialog"
    @close="closeDialog">
    <el-form
      :model="dbForm"
      :rules="rules"
      ref="dbForm"
      label-width="6vw"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="主键" prop="id">
            <el-input
              v-model="dbForm.id"
              placeholder="请输入主键"
              :autocomplete="autocomplete"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="编码" prop="code">
            <el-input
              v-model="dbForm.code"
              placeholder="请输入编码"
              :autocomplete="autocomplete"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="名称" prop="name">
            <el-input
              v-model="dbForm.name"
              placeholder="请输入名称"
              :autocomplete="autocomplete"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="有效状态" prop="status">
            <zd-select
              v-model="dbForm.status"
              clearable
              placeholder="请选择有效状态（0：无效；1：有效）"
              dict="USER_STATUS"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="创建人ID" prop="creatorId">
            <el-input
              v-model="dbForm.creatorId"
              placeholder="请输入创建人ID"
              :autocomplete="autocomplete"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="创建人" prop="creator">
            <el-input
              v-model="dbForm.creator"
              placeholder="请输入创建人"
              :autocomplete="autocomplete"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="更新人ID" prop="updaterId">
            <el-input
              v-model="dbForm.updaterId"
              placeholder="请输入更新人ID"
              :autocomplete="autocomplete"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="更新人" prop="updater">
            <el-input
              v-model="dbForm.updater"
              placeholder="请输入更新人"
              :autocomplete="autocomplete"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="创建时间" prop="createDate">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="dbForm.createDate"
              type="date"
              placeholder="请选择创建时间"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="更新时间" prop="updateDate">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="dbForm.updateDate"
              type="date"
              placeholder="请选择更新时间"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="创建人机构ID" prop="creatorOrgid">
            <el-input
              v-model="dbForm.creatorOrgid"
              placeholder="请输入创建人机构ID"
              :autocomplete="autocomplete"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="删除标识" prop="isdel">
            <el-input-number
              v-model="dbForm.isdel"
              controls-position="right"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="foot">
      <el-button @click="handleReset">取 消</el-button>

      <el-button type="warning" v-if="this.action === 'add'" @click="handleSubmit(true)">保存并继续</el-button>

      <el-button type="primary" v-if="this.action !== 'view'" @click="handleSubmit(false)">保 存</el-button>
    </div>
  </zd-dialog>
</template>

<script>
import BaseFormMixins from '@/mixins/base-form-mixins';
import { apiTestSave, apiTestUpdateById } from '@api/test';

export default {
  name: 'TestForm',
  mixins: [BaseFormMixins],
  data() {
    return {
      defaultForm: {
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
      },
      rules: {
        id: [{ max: 50, message: '最大可输入50', trigger: 'blur' }],
        code: [
          { required: true, message: '请输入编码', trigger: 'blur' },
          { max: 200, message: '最大可输入200', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { max: 200, message: '最大可输入200', trigger: 'blur' }
        ],
        creatorId: [{ max: 50, message: '最大可输入50', trigger: 'blur' }],
        creator: [{ max: 100, message: '最大可输入100', trigger: 'blur' }],
        updaterId: [{ max: 50, message: '最大可输入50', trigger: 'blur' }],
        updater: [{ max: 100, message: '最大可输入100', trigger: 'blur' }],
        creatorOrgid: [{ max: 50, message: '最大可输入50', trigger: 'blur' }]
      }
    }
  },
  methods: {
    openDialog() {
      if (this.action === 'add') {
        this.dbForm = this.deepCopy(this.defaultForm)
      } else if (this.action === 'edit') {
        this.dbForm = this.deepCopy(this.formParam.data)
      } else if (this.action === 'view') {
        this.dbForm = this.deepCopy(this.formParam.data)
      } else {
        this.dbForm = this.deepCopy(this.defaultForm)
      }
      this.loading = false
    },
    closeDialog() {
      if (this.isHandleContinue && this.formParam.action === 'add') {
        this.isHandleContinue = false;

        // 刷新表格数据
        this.$bus.emit('handleTestSearch');
      }

      this.$emit('closeDialog');
    },
    handleReset() {
      this.dbForm = this.deepCopy(this.defaultForm);
      this.closeDialog();
    },
    handleSubmit(isContinue) {
      if (this.action === 'add') {
        this.addFun(isContinue);
      } else {
        this.editFun();
      }
    },
    addFun(isContinue) {
      this.$refs.dbForm.validate(valid => {
        if (valid) {
          this.loading = true;
          apiTestSave(this.dbForm).then(result => {
            this.loading = false;
            const { success, message } = result;
            if (success) {
              this.$message({
                message: message,
                type: 'success'
              });
              // 提交操作，刷新表单关闭弹框
              if (!isContinue) {
                // 刷新表格数据
                this.$bus.emit('handleTestSearch');
                // 重置表单
                this.handleReset();
              } else {
                this.dbForm = this.deepCopy(this.defaultForm)
                this.isHandleContinue = true;
              }
            } else {
              this.$message({
                message: message,
                type: 'error'
              });
            }
          }).catch(() => {
            this.loading = false
          });
        }
      })
    },
    editFun() {
      this.$refs.dbForm.validate(valid => {
        if (valid) {
          this.loading = true;
          apiTestUpdateById(this.dbForm).then(result => {
            this.loading = false;
            const { success, message } = result;
            if (success) {
              this.$message({
                message: message,
                type: 'success'
              });
              // 刷新表格数据
              this.$bus.emit('handleTestSearch');

              // 重置表单
              this.handleReset();
            } else {
              this.$message({
                message: message,
                type: 'error'
              });
            }
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>
