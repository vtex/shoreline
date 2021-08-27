import React from 'react'
import { render } from 'react-dom'
import { createSystem } from '@vtex/admin-ui-core'

import { Toaster } from './Toaster'
import type {
  ToastManagerProps,
  ToastManagerState,
  ToastOptions,
  ToastPosition,
  ToastProps,
} from './typings'

// TODO: REMOVE THIS ASAP
const [DangerousInnerOndaInstance] = createSystem({
  key: 'toast',
})

/**
 * Wraps the Toaster. This component mounts the
 * Toaster on a Portal and manages it - by
 * controlling it state, creating toasts,
 * adding and removing them from the stack.
 * It composes the client API.
 * */
export class ToastManager {
  private portalId = 'onda-toast-portal'
  private portal: HTMLElement | null = null
  private counter = 0
  private state: ToastManagerState = {
    'bottom-right': [],
  }

  private setState = (state: ToastManagerState) => {
    this.state = state
    this.renderOrUpdate()
  }

  private createToast = (props: ToastProps): ToastOptions => {
    const { position = 'bottom-right', duration = 5000 } = props

    this.counter += 1
    const id = this.counter

    return {
      ...props,
      id: String(id),
      position,
      duration,
      remove: this.removeToast,
      stack: [],
    }
  }

  private removeToast = (id: string, position: ToastPosition) => {
    this.setState({
      ...this.state,
      [position]: this.state[position].filter(
        (toast) => toast.id !== String(id)
      ),
    })
  }

  private renderOrUpdate = () => {
    render(
      <DangerousInnerOndaInstance>
        <Toaster state={this.state} />
      </DangerousInnerOndaInstance>,
      this.portal
    )
  }

  constructor(props: ToastManagerProps) {
    if (!isBrowser) {
      console.warn('Toasts can only be rendered on the client-side.')

      return
    }

    const { subframe } = props

    const documentRef = subframe ? window.top.document : document

    const existingPortal = documentRef.getElementById(this.portalId)

    if (existingPortal) {
      this.portal = existingPortal
    } else {
      const div = documentRef.createElement('div')

      div.id = this.portalId
      documentRef.body.appendChild(div)
      this.portal = div
    }

    this.renderOrUpdate()
  }

  public dispatch = (props: ToastProps) => {
    const toast = this.createToast(props)

    this.setState({
      ...this.state,
      [toast.position!]: [...this.state[toast.position!], toast],
    })

    return toast.id
  }
}

const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)
