<script>
export default {
  functional: true,
  props: {
    isGroup: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'fade-in-out'
    }
  },
  render(h, context) {
    const { isGroup, name } = context.props
    let transitionEl = `transition${isGroup ? '-group' : ''}`
    return h(transitionEl, {
      attrs: {
        name: name,
        mode: 'out-in'
      }
    }, context.children)
  }
}
</script>
