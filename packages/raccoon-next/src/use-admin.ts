import { useStore } from './utils/store'
import { isIframe } from './utils/env'
import { adminStore } from './admin-store'

const ADMIN_KEY = 'embedded-admin-ui-context'

// On development, let admin context (token) leak to other
// browser tabs so we can develop on `localhost:3000` instead
// of having to be inside admin. This improves DX because iframes
// can break some Next.JS features, like HMR and React Fast Refresh
if (process.env.NODE_ENV === 'development') {
  try {
    const broadcaster = new BroadcastChannel(ADMIN_KEY)

    adminStore.subscribe(
      (data) => isIframe() && broadcaster.postMessage(JSON.stringify(data))
    )

    broadcaster.addEventListener('message', (payload) => {
      if (isIframe()) {
        return
      }

      const data = JSON.parse(payload.data)

      adminStore.set(data)
      localStorage.setItem(ADMIN_KEY, payload.data)
    })

    const data = localStorage.getItem(ADMIN_KEY)

    if (data) {
      adminStore.set(JSON.parse(data))
    }
  } catch (err) {
    /** noop */
  }
}

export function useAdmin() {
  return useStore(adminStore)
}
