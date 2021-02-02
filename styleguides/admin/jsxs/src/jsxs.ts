import { jsx } from '@emotion/react'
import {
  ElementType,
  ReactNode,
  Attributes,
  FunctionComponent,
  ComponentClass,
  ReactElement,
} from 'react'

import { isFunction } from './util'

/**
 * emotion jsx
 */
export function jsxs<P extends {}>(
  type: FunctionComponent<P> | ComponentClass<P> | ElementType,
  props: Attributes & P,
  ...children: ReactNode[]
): ReactElement<P> {
  /** ⤵️ Render props composition */
  if (isFunction(children)) {
    return children(props)
  }

  return jsx(
    type,
    props,
    ...children
  )
}
