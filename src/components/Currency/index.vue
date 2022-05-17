<!--
 * @Description: 金额格式化文本框
 * @Author: Zander
 * @Date: 2022/5/10 15:54
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/10 15:54
 -->
<template>
  <div class="el-input" :class='"el-input" + size'>
    <input
      class="el-input__inner"
      v-bind:value="formatValue"
      ref="input"
      v-on:input="updateValue($event.target.value)"
      v-on:blur="onBlur($event)"
      v-on:focus="selectAll"
    />
  </div>
</template>

<script>
import accounting from 'accounting';

export default {
  name: 'Currency',
  props: {
    value: {
      type: Number,
      default: 0
    },
    symbol: {
      type: String,
      default: ''
    },
    decimal: {
      type: Number,
      default: 2
    },
    size: {
      type: String,
      default: 'mini'
    }
  },
  data() {
    return {
      focused: false,
      oldValue: 0
    }
  },
  computed: {
    formatValue() {
      if (this.focused) {
        return this.value ? accounting.unformat(`${this.value}`) : '';
      }

      if (this.value === 0) {
        return accounting.formatMoney(this.value, this.symbol, this.decimal);
      }

      return accounting.formatMoney(this.value, this.symbol, this.decimal);
    }
  },
  methods: {
    updateValue(value) {
      const formatValue = value ? accounting.unformat(`${value}`) : '';

      this.$emit('input', formatValue);
    },
    onBlur($event) {
      this.focused = false;

      this.$emit('blur', $event);

      if (this.oldValue !== this.value) {
        this.$emit('change', $event);
      }
    },
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    selectAll(event) {
      this.oldValue = this.value;
      this.focused = true;
      setTimeout(() => {
        event.target.select();
      }, 0);
    }
  }
}
</script>

<style scoped lang="scss">
.el-input__inner {
  text-align: right;
}
</style>
