import React, { forwardRef, Ref } from 'react'
import { Box as ReakitBox, BoxHTMLProps } from 'reakit'
import { SxStyleProp } from '@theme-ui/core'

import {
  createElement,
  omitCSSProps,
  pickHTMLProps,
  useCx,
  compose,
} from '../../system-next'
import {
  ColorStyleProps,
  BorderStyleProps,
  SemanticTags,
  HeadingTags,
} from './types'

export interface BoxProps
  extends Omit<BoxHTMLProps, 'color' | 'translate'>,
    ColorStyleProps,
    BorderStyleProps {
  element?: 'div' | 'span' | SemanticTags | HeadingTags
  sx?: SxStyleProp
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
  const compoundProps = compose(props)
  const className = useCx(compoundProps)
  const htmlProps = omitCSSProps(pickHTMLProps(compoundProps))

  const { ref } = compoundProps

  const wrapElement = compoundProps.wrapElement ?? {
    wrapElement: compoundProps.wrapElement,
  }

  return { ...htmlProps, className, ref, ...wrapElement }
}
