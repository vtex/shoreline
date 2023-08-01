import type React from 'react'
import type { DialogState } from 'ariakit'

import { useEffect, useState } from 'react'
import { useModalState } from '../../modal'

export function useActionState(props: UseActionsProps) {
  const { defaultTitle } = props
  const modal = useModalState()

  const [title, setTitle] = useState(defaultTitle)

  const [activeItem, setActiveItem] = useState('')

  const hasActiveItem = !!activeItem

  const handleAction = (id: string, currentTitle: string, href = '') => {
    if (href) {
      modal.hide()

      return
    }

    setActiveItem(id)
    setTitle(currentTitle)
  }

  useEffect(() => {
    if (modal.open) return

    setActiveItem('')
    setTitle(defaultTitle)
  }, [modal.open])

  return {
    ...modal,
    activeItem,
    setActiveItem,
    hasActiveItem,
    title,
    setTitle,
    handleAction,
  }
}

export interface UseActionsProps {
  defaultTitle: string
}

export interface ActionsState extends DialogState {
  activeItem: string
  setActiveItem: React.Dispatch<React.SetStateAction<string>>
  hasActiveItem: boolean
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  handleAction: (id: string, currentTitle: string, href?: string) => void
}
