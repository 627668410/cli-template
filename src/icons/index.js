import Vue from 'vue'
import SvgIcon from '@/components/svg-icon'// svg component
/**
 * svg-sprite-loader：去掉多余的注释只取path
 * svgo：去掉svg中path 中产生的冗余信息
 */
Vue.component('svg-icon', SvgIcon)
// 自动引入svg
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
