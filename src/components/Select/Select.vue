<!--
 * @Description: 字典下拉组件
 * @Author: Zander
 * @Date: 2022/5/16 16:40
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/16 16:40
 -->
<template>
  <el-select
    style="width: 100%;"
    v-model="dictValue"
    :clearable="clearable"
    :placeholder="placeholder"
    v-bind="$attrs"
    v-on="$listeners"
    @change="handleChange"
  >
    <template v-for="(item, index) in dicList">
      <el-option
        :key="item.id + index"
        :label="item.dataName"
        :value="item.dataValue" />
    </template>
  </el-select>
</template>

<script>
import { getDic } from '@utils/cache';

export default {
  name: 'Select',
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: [Number, String, Array],
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    },
    dict: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dictValue: ''
    }
  },
  computed: {
    dicList() {
      return getDic(this.dict);
    }
  },
  watch: {
    value: {
      handler(val) {
        this.dictValue = val;
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleChange(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
