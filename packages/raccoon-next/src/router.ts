import { publishMessage } from './message'

export function useNavigation() {
  const navigate = (path: string, options?: NavigateOptions) => {
    if (!path.startsWith('/')) {
      console.warn('The path must start with /')

      return
    }

    const { type = 'navigation' } = options ?? {}

    publishMessage({
      type,
      data: {
        path,
      },
    })
  }

  return {
    navigate,
  }
}

interface NavigateOptions {
  type: 'navigation' | 'adminRelativeNavigation'
}
