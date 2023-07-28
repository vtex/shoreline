import type React from 'react'
import { useEffect, useState } from 'react'
import { useModalState } from '@vtex/admin-ui'

import type { DialogState } from 'ariakit'

export interface ActionsState extends DialogState {
  activeItem: string
  setActiveItem: React.Dispatch<React.SetStateAction<string>>
  hasActiveItem: boolean
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
}

export function useActions(props: UseActionsProps) {
  const { initialTitle } = props
  const modal = useModalState()

  const [title, setTitle] = useState(initialTitle)

  const [activeItem, setActiveItem] = useState('')

  const hasActiveItem = !!activeItem

  useEffect(() => {
    if (modal.open) return

    setActiveItem('')
    setTitle(initialTitle)
  }, [modal.open])

  return {
    ...modal,
    activeItem,
    setActiveItem,
    hasActiveItem,
    title,
    setTitle,
  }
}

export interface UseActionsProps {
  initialTitle: string
}
