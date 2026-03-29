import { registerSW } from 'virtual:pwa-register'

registerSW({
  immediate: true,
  onRegisteredSW(swUrl, r) {
    if (r) {
      setInterval(() => {
        r.update()
      }, 60 * 60 * 1000)
    }
  }
})
