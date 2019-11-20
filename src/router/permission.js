import router from '@/router'
router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || '登录'
  next()
})
