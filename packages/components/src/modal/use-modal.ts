import { useState } from 'react'

export function useModal(props?: ModalStateProps): ModalState {
  const { defaultOpen = false } = props || {}

  const [open, setOpen] = useState(defaultOpen)

  const hide = () => {
    setOpen(false)
  }

  const show = () => {
    setOpen(true)
  }

  const toggle = () => {
    setOpen((current) => !current)
  }

  return {
    open,
    hide,
    show,
    toggle,
  }
}

export interface ModalState {
  open: any
  toggle: any
  hide: any
  show: any
}

export interface ModalStateProps {
  defaultOpen?: boolean
}
