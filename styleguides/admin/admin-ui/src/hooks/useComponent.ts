import { renameKeys, useClassName, cleanProps } from '@vtex/admin-ui-system'

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
  const htmlProps = cleanProps(props)
  const finalProsp = ({ ...htmlProps, className } as unknown) as T

  return finalProsp
}
