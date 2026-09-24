/*
 * @Author: wangyu
 * @Date: 2024-11-19 14:08:55
 * @LastEditTime: 2025-12-07 09:52:33
 * @LastEditors: wangyu
 * @Description:
 * @FilePath: \tdpy-screen-dev\src\utils\index.js
 */
/**
 *  通用js方法
 */

// 防抖
export function debounce(fn, time) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, time)
  }
}

// 节流
export function throttle(fn, time) {
  let activeTime = 0
  return function () {
    const current = Date.now()
    if (current - activeTime >= time) {
      fn.apply(this, arguments)
      activeTime = Date.now()
    }
  }
}
// 深拷贝
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(deepClone)

  const clone = {}
  for (const key in obj) {
    clone[key] = deepClone(obj[key])
  }
  return clone
}

/**
 * @description: 转千位分隔符数字
 * @param {*} num
 * @return {*}
 */
export function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num)
}

// 使用 import.meta.glob 预加载所有图片资源
// eager: true 表示直接引入模块，而不是返回 () => import()
// import: 'default' 表示直接获取默认导出（即图片路径）
const images = import.meta.glob('../assets/images/**/*.{png,jpg,jpeg,gif,svg,webp}', { eager: true, import: 'default' })

/**
 * @description: 根据图片路径获取图片
 * @param {*} path
 * @return {*}
 * **/
export function getImage(path) {
  if (!path) return ''
  // 统一路径分隔符
  const normalizedPath = path.replace(/\\/g, '/')
  const key = `../assets/images/${normalizedPath}`

  if (images[key]) {
    return images[key]
  }

  console.warn(`[getImage] Image not found: ${key}`)
  return ''
}
