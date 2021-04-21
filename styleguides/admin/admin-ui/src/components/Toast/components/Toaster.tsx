import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from '@vtex/admin-core'
import { ToastManager } from './Manager'
import { ToastManagerActions } from './typings'

/**
 * Wraps the ToastManager. This component mounts the
 * ToastManager on a Portal, and composes the client API.
 * */
class Toaster {
  private portalId = 'onda-toast-portal'

  private bindActions = (actions: ToastManagerActions) => {
    this.notify = actions.notify
  }

  public constructor() {
    let portal: HTMLElement
    const existingPortal = document.getElementById(this.portalId)

    if (existingPortal) {
      portal = existingPortal
    } else {
      const div = document.createElement('div')
      div.id = this.portalId
      document.body.appendChild(div)
      portal = div
    }

    render(
      <ThemeProvider>
        <ToastManager actions={this.bindActions} />
      </ThemeProvider>,
      portal
    )
  }

  public notify!: ToastManagerActions['notify']
}

export const toaster = new Toaster()
