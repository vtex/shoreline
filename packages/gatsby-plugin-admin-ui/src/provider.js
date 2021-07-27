import { useMemo } from 'react'
import {
  createSystem,
  ThemeProvider,
  jsxs,
  createComponent,
} from '@vtex/admin-ui'

import overrides from './index'
import components from './components'
import { useConfig } from './useConfig'

const Root = createComponent(ThemeProvider, useRoot)

function useRoot(props) {
  const { appName = 'gatsby' } = useConfig()
  const system = useMemo(
    () =>
      createSystem(appName, {
        overrides,
        components,
      }),
    [appName]
  )

  return {
    system,
    ...props,
  }
}

export function wrapRootElement(args) {
  const { element } = args
  return jsxs(Root, {}, element)
}
