import { useState } from 'react'
import { useSafeLayoutEffect } from './useSafeLayoutEffect'

/**
 * Generates a unique ID. Uses React's useId if available.
 */
export function useId(defaultId?: string): string | undefined {
  const [id, setId] = useState(defaultId)

  useSafeLayoutEffect(() => {
    if (defaultId || id) return
    const random = Math.random().toString(36).substr(2, 6)

    setId(`id-${random}`)
  }, [defaultId, id])

  return defaultId || id
}
