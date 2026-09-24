const listenersMap = new Map()

const on = (eventName, handler) => {
  if (!listenersMap.has(eventName)) {
    listenersMap.set(eventName, new Set())
  }
  listenersMap.get(eventName).add(handler)
}

const off = (eventName, handler) => {
  if (!listenersMap.has(eventName)) return
  listenersMap.get(eventName).delete(handler)
}

const emit = (eventName, payload) => {
  if (!listenersMap.has(eventName)) return
  listenersMap.get(eventName).forEach((handler) => {
    handler(payload)
  })
}

export default {
  on,
  off,
  emit
}
