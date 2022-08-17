import type { ComponentPropsWithRef } from 'react'
import type { ResponsiveProp } from '@vtex/admin-ui-react'
import {
  createComponent,
  useElement,
  createHook,
  getResponsiveValue,
  useBreakpoint,
} from '@vtex/admin-ui-react'
import type { SpaceTokens, CSSPropAutocomplete } from '@vtex/admin-ui-core'

import * as styles from './columns.style'

export const Columns = createComponent<'div', ColumnsOptions>((props) => {
  const elementProps = useColumns(props)

  return useElement('div', elementProps)
})

export const useColumns = createHook<'div', ColumnsOptions>((props) => {
  const { space = '$l', ...restProps } = props

  const { breakpoint } = useBreakpoint()

  const responsiveSpace = getResponsiveValue(space, breakpoint)

  return {
    baseStyle: styles.columnsBaseline(responsiveSpace),
    ...restProps,
  }
})

export interface ColumnsOptions {
  space?: ResponsiveProp<CSSPropAutocomplete<SpaceTokens>>
}

export type ColumnsProps = ComponentPropsWithRef<typeof Columns> &
  ColumnsOptions
