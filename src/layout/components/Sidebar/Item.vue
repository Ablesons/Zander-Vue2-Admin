<!--
 * @Description: MenuItem
 * @Author: Zander
 * @Date: 2022/5/11 17:07
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/11 17:07
 -->
<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];
    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        vnodes.push(<icon-svg icon-class={icon}/>)
      }
    }
    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>);
    }
    return vnodes;
  }
}
</script>
