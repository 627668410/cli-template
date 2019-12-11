/* eslint-disable no-undef */
class PMonitor {
  init () {
    this.error()
    window.onload = () => {
      const getLoadTime = this.getLoadTime.bind(this)
      if (window.requestIdleCallback) {
        window.requestIdleCallback(getLoadTime)
      } else {
        setTimeout(getLoadTime)
      }
    }
  }
  getLoadTime () {
    const [{ domComplete }] = performance.getEntriesByType('navigation')
    this.log('页面加载时间')
    console.log(domComplete)
  }

  // 错误捕获
  error () {
    window.onerror = (msg, url, row, col, error) => {
      this.log('js运行错误')
      console.log(msg, url, row, col, error)
      // 设为false会阻止浏览器报告错误的默认行为
      return true
    }

    /** 重写console.error */
    const consoleError = window.console.error
    window.console.error = (error) => {
      this.log('console.error')
      consoleError.call(window, error)
    }

    window.addEventListener('unhandledrejection', (error) => {
      this.log(`被reject但未被处理的promise异常`)
      console.log('详细信息')
      console.log(error)
      console.log('错误信息')
      console.log(error.promise)
    })

    window.addEventListener('error', (error) => {
      // 过滤js运行错误
      let target = error.target || error.srcElement
      let isElementTarget = target instanceof HTMLScriptElement || target instanceof HTMLLinkElement || target instanceof HTMLImageElement
      if (!isElementTarget) return false
      let url = target.src || target.href
      this.log('资源加载错误', url)
    }, true)
  }

  log (title) {
    console.log(`
    --------------------${title}-------------------
    `)
  }
}

export default PMonitor
