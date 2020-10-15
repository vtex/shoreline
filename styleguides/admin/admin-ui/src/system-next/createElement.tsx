import React, { Ref } from 'react'

import { isFunction } from './util'

type Props = {
  children?: React.ReactNode
  component: string | React.ComponentType<any>
  enableRenderPropsComposition?: boolean
  use?: string | React.ComponentType<any>
  htmlProps: any
  ref?: Ref<any>
}

export function createElement({
  children,
  component,
  enableRenderPropsComposition = true,
  htmlProps,
  use,
  ref,
}: Props) {
  if (enableRenderPropsComposition && isFunction(children)) {
    return children(htmlProps)
  }

  return React.createElement(
    component,
    { as: use, ...htmlProps, ref },
    htmlProps.children || children
  )
}
