<template>
  <div>
    <!--
      未封装功能：
        多级表头
        筛选
        状态行
     -->
    <!--
      options:
        loading:控制v-loading
        maxHeight:max-height,设置后固定表头
        indexLabel:序号列的名称
        stripe
        border
        mutiSelect:多选
        mutiSelectPosition:多选列的位置：left，right
        index：序号,
        headerClass:头部样式类,
        selectable: 类型为 Function(row, index)，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选
    -->
    <el-table v-loading="options.loading"
              :data="dataSource"
              :max-height="options.maxHeight"
              :stripe="options.stripe"
              :border="options.border"
              @row-click="handleRowClick"
              @selection-change="handleSelectionChange"
              :header-row-class-name="options.headerClass">
      <!--selection选择框-->
      <el-table-column v-if="options.mutiSelect&&options.mutiSelectPosition==='left'"
                       type="selection"
                       :selectable="options.selectable"
                       style="width:50px"
                       align="center"></el-table-column>

      <!--序号-->
      <el-table-column v-if="options.index"
                       :label="options.indexLabel"
                       type="index"
                       width="50"
                       align="center"></el-table-column>

      <!--数据列-->
      <template v-for="(column, index) in columns">
        <el-table-column :key="index"
                         :prop="column.prop"
                         :label="column.label"
                         :align="column.align||'center'"
                         :width="column.width"
                         :fixed="column.fixed"
                         :sortable="column.sortable">
          <template slot-scope="scope">
            <template v-if="!column.render">
              {{scope.row[column.prop]}}
            </template>
            <!-- render -->
            <template v-else>
              <RenderDom :row="scope.row"
                         :index="index"
                         :render="column.render" />
            </template>
            <!-- render button -->
            <template v-if="column.button">
              <template v-for="(btn, i) in column.group">
                <el-button :key="i"
                           :type="btn.type"
                           :size="btn.size || 'mini'"
                           :icon="btn.icon || ''"
                           :disabled="btn.disabled || false"
                           :plain="btn.plain || false"
                           @click.stop="btn.onClick(scope.row, scope.$index)">{{btn.name}}</el-button>
              </template>
            </template>
          </template>
        </el-table-column>
      </template>
      <!--selection选择框-->
      <el-table-column v-if="options.mutiSelect&&options.mutiSelectPosition==='right'"
                       type="selection"
                       style="width:50px"
                       align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'BTable',
  components: {
    RenderDom: {
      functional: true, // 函数式组件 - 无 data 和 this 上下文 => better render
      props: {
        row: Object,
        index: Number,
        render: Function
      },
      /**
       * @param {Function} createElement - 原生创建dom元素的方法， 弃用，推荐使用 jsx
       * @param {Object} ctx - 渲染的节点的this对象
       * @argument 传递参数 row index
       */
      render(createElement, ctx) {
        const { row, index } = ctx.props
        return ctx.props.render(createElement, row, index)
      }
    }
  },
  props: {
    dataSource: {
      type: Array,
      required: true
    },
    options: {// 表格参数控制 maxHeight、stripe 等等...
      type: Object,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  },
  created() {
    // 传入的options覆盖默认设置
    this.$parent.options = Object.assign({
      loading: false,
      maxHeight: 600,
      index: false,
      stripe: false, // 是否为斑马纹
      border: true,
      mutiSelect: false,
      indexLabel: '序号',
      mutiSelectPosition: 'left',
      headerClass: 'table-header'
    }, this.options)
    console.log('table.options', this.options)
  },
  methods: {
    handleSelectionChange(selection) {
      this.$emit('selection-change', selection)
    },
    handleRowClick(row, event, column) {
      this.$emit('row-click', row, event, column)
    }
  }
}
</script>
