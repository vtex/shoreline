import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from '@vtex/admin-core'
import { ToastManager } from './Manager'
import { ToasterProps, ToastManagerActions } from './typings'

/**
 * Wraps the ToastManager. This component mounts the
 * ToastManager on a Portal, and composes the client API.
 * */
export class Toaster {
  private portalId = 'onda-toast-portal'

  private bindActions = (actions: ToastManagerActions) => {
    this.toast = actions.notify
  }

  public constructor(props: ToasterProps) {
    if (!isBrowser) {
      console.warn('Toast components can only be rendered on the client side.')
      return
    }

    const { subframe } = props
    let portal: HTMLElement

    const documentRef = subframe ? window.top.document : document

    const existingPortal = documentRef.getElementById(this.portalId)

    if (existingPortal) {
      portal = existingPortal
    } else {
      const div = documentRef.createElement('div')
      div.id = this.portalId
      documentRef.body.appendChild(div)
      portal = div
    }

    render(
      <ThemeProvider>
        <ToastManager actions={this.bindActions} />
      </ThemeProvider>,
      portal
    )
  }

  public toast!: ToastManagerActions['notify']
}

const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)
