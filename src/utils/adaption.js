import { debounce } from './index.js';

class Adaption {
  #events = new Set()
  constructor({ width, height } = { height: 1080 }) {
    this.width = width
    this.height = height
    this.deviceSize = this.getDeviceSize()
  }

  getDeviceSize() {
    return {
      deviceHeight:
        document.documentElement.clientHeight ||
        document.body.clientHeight ||
        document.innerHeight ||
        0,
      deviceWidth:
        document.documentElement.clientWidth ||
        document.body.clientWidth ||
        document.innerWidth ||
        0,
    }
  }

  setDocFontSize() {
    document.documentElement.style.fontSize = this.fontSize(100) + 'px'
  }

  add(callback) {
    this.#events.add(callback)
  }

  delete(callback) {
    this.#events.delete(callback)
  }

  init() {
    window.addEventListener(
      'resize',
      debounce(() => {
        this.deviceSize = this.getDeviceSize()
        this.setDocFontSize()
        this.#events.forEach((callback) => {
          callback()
        })
      }, 500)
    )
    this.setDocFontSize()
  }

  fontSize(size) {
    const { deviceWidth, deviceHeight } = this.deviceSize
    let widthScale, heightScale
    if (this.width) {
      widthScale = deviceWidth / this.width
    }
    if (this.height) {
      heightScale = deviceHeight / this.height
    }
    return size * heightScale
  }
}

export default Adaption
