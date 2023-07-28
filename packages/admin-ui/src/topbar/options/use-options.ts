import type React from 'react'
import { useEffect, useState } from 'react'
import { useModalState } from '@vtex/admin-ui'

import type { DialogState } from 'ariakit'

export interface TopbarOptionsState extends DialogState {
  activeItem: string
  setActive: (id: string) => void
  hasActiveItem: boolean
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
}

export function useTopbarOptions(props: UseOptionsProps) {
  const { initialTitle } = props
  const modal = useModalState()

  const [title, setTitle] = useState(initialTitle)

  const [activeItem, setActiveItem] = useState('')

  const hasActiveItem = !!activeItem

  const setActive = (id: string) => setActiveItem(id)

  useEffect(() => {
    if (modal.open) return

    setActive('')
    setTitle(initialTitle)
  }, [modal.open])

  return {
    ...modal,
    activeItem,
    setActive,
    hasActiveItem,
    title,
    setTitle,
  }
}

export interface UseOptionsProps {
  initialTitle: string
}
