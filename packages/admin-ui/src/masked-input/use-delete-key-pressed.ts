import { useRef } from 'react'
import { useSafeLayoutEffect } from '@vtex/admin-ui-hooks'

const DELETE_KEY = 'Delete'

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
      if (evt.code === DELETE_KEY) {
        deleteKeyRef.current = true
      }
    }

    const handleKeyUp = (evt: KeyboardEvent) => {
      if (evt.code === DELETE_KEY) {
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
