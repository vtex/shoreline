import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { publishMessage } from './message'

export function useNavigation() {
  const { replace } = useRouter()

  const navigate = useCallback(
    (path: string, options?: NavigateOptions) => {
      if (!path.startsWith('/')) {
        console.warn('The path must start with /')

        return
      }

      const { type = 'navigation' } = options ?? {}

      replace(path).then(() => {
        publishMessage({
          type,
          data: {
            path,
          },
        })
      })
    },
    [replace]
  )

  return {
    navigate,
  }
}

interface NavigateOptions {
  type: 'navigation' | 'adminRelativeNavigation'
}
