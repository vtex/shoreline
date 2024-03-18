import { adminStore } from './admin-store'
import type { AdminIframeEvent, AdminContext } from './types'

type MessageParams = {
  type: string
  data: {
    [key: keyof any]: any
  }
}

/**
 * Publish a message to the parent iframe, which is the admin shell.
 */
export function publishMessage(params: MessageParams) {
  window.parent.postMessage(
    {
      id: 'admin-ejected-app-message',
      ...params,
    },
    '*'
  )
}

export function isAdminShellEvent(e: any): e is AdminIframeEvent {
  return e?.type === 'admin-iframe-message'
}

export function sendEventToEmbeddedApp(
  data: AdminContext,
  iframe: HTMLIFrameElement
) {
  const e: AdminIframeEvent = {
    type: 'admin-iframe-message',
    data,
  }

  const targetOrigin = new URL(iframe.src).origin

  iframe.contentWindow?.postMessage(e, targetOrigin)
}

// Retrieve context from parent iframe
export function listenForAdminShellEvents() {
  window.addEventListener('message', ({ data }) => {
    if (isAdminShellEvent(data)) {
      adminStore.set(data.data)
    }
  })
}
