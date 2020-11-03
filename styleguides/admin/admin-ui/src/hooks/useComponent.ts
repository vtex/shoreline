import { useClassName } from '@vtex/admin-ui-system'

interface Params<T> {
  props: T
  themeKey?: string
}

/**
 * Util do create a simple component hook
 */
export function useComponent<T>(params: Params<T>): T {
  const props = renameKeys({ styleOverrides: 'styles' }, params.props ?? {})
  const className = useClassName({ props, themeKey: params.themeKey })

  return ({ ...props, className } as unknown) as T
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renameKeys(keysMap: { [x: string]: any }, obj: { [x: string]: any }) {
  return Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] },
    }),
    {}
  )
}
