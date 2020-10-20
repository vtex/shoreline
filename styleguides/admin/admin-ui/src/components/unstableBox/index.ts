import React, { forwardRef, Ref } from 'react'
import { Box as ReakitBox, BoxHTMLProps } from 'reakit'
import { SxStyleProp } from '@theme-ui/core'
import {
  createElement,
  omitCSSProps,
  pickHTMLProps,
  useCx,
} from '@vtex/admin-ui-system'
import { LayoutPatterns } from '@vtex/admin-ui-theme'

import { SemanticTags, HeadingTags } from './types'

export interface BoxProps extends Omit<BoxHTMLProps, 'ref'>, LayoutPatterns {
  element?: 'div' | 'span' | SemanticTags | HeadingTags
  styles?: SxStyleProp
  children?: React.ReactNode | ((props: BoxProps) => React.ReactNode)
}

export const unstableBox = forwardRef(function Box(
  props: BoxProps,
  ref: Ref<HTMLDivElement>
) {
  const boxProps = useBox(props)

  return createElement({
    component: ReakitBox,
    element: props.element,
    htmlProps: boxProps,
    ref,
  })
})

export function useBox(props: BoxProps): BoxProps {
  const className = useCx(props)
  const htmlProps = omitCSSProps(pickHTMLProps(props))

  const wrapElement = props.wrapElement ?? {
    wrapElement: props.wrapElement,
  }

  return { ...htmlProps, className, ...wrapElement }
}
