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
  private portal: HTMLElement | null = null

  private bindActions = (actions: ToastManagerActions) => {
    this.dispatch = actions.dispatch
  }

  private mount = () => {
    setTimeout(() => {
      render(
        <ThemeProvider>
          <ToastManager actions={this.bindActions} />
        </ThemeProvider>,
        this.portal
      )
    }, 100)
  }

  public constructor(props: ToasterProps) {
    if (!isBrowser) {
      console.warn('Toasts can only be rendered on the client-side.')
      return
    }

    const { subframe } = props

    const documentRef = !!subframe ? window.top.document : document

    const existingPortal = documentRef.getElementById(this.portalId)

    if (existingPortal) {
      this.portal = existingPortal
    } else {
      const div = documentRef.createElement('div')
      div.id = this.portalId
      documentRef.body.appendChild(div)
      this.portal = div
    }

    this.mount()
  }

  public dispatch!: ToastManagerActions['dispatch']
}

const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)
