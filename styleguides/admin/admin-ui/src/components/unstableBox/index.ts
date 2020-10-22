import React, { forwardRef, Ref } from 'react'
import { Box as ReakitBox, BoxHTMLProps } from 'reakit'
import { SxStyleProp } from '@theme-ui/core'
import { cleanProps, createElement, useClassName } from '@vtex/admin-ui-system'
import {
  PatternsProps,
  SpaceStyleProps,
  SizeStyleProps,
} from '@vtex/admin-ui-theme'

import { SemanticTags, HeadingTags } from './types'

export interface BoxProps
  extends Omit<BoxHTMLProps, 'ref' | 'style' | 'className' | 'sx'>,
    PatternsProps,
    SpaceStyleProps,
    SizeStyleProps {
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

export function useBox(props: BoxProps) {
  const className = useClassName({ props })
  const htmlProps = cleanProps(props)

  const wrapElement = props.wrapElement ?? {
    wrapElement: props.wrapElement,
  }

  return { ...htmlProps, className, ...wrapElement }
}
