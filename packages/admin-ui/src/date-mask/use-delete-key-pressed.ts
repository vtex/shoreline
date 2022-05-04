import { useRef } from 'react'
import { useSafeLayoutEffect } from '@vtex/admin-ui-hooks'

/**
 * Watches for backspace/delete key press event.
 */
export function useDeleteKeyPressed() {
  const deleteKeyRef = useRef<boolean>(false)

  const isDeleteKeyPressed = () => {
    return deleteKeyRef.current
  }

  useSafeLayoutEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.code === 'Delete') {
        deleteKeyRef.current = true
      }
    }

    const handleKeyUp = (evt: KeyboardEvent) => {
      if (evt.code === 'Delete') {
        deleteKeyRef.current = false
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return isDeleteKeyPressed
}
