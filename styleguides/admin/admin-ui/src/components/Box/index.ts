import { forwardRef, Ref, ElementType, ReactNode } from 'react'
import { Box as ReakitBox, BoxHTMLProps } from 'reakit'
import {
  PatternsProps,
  SpaceStyleProps,
  SizeStyleProps,
} from '@vtex/admin-ui-theme'

import { useClassName, createElement, SxStyleProp } from '../../system'

export const Box = forwardRef(function Box(
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
  const { themeKey, text = 'body', ...htmlProps } = props
  const className = useClassName({ props: { text, ...htmlProps }, themeKey })

  return { ...props, className }
}

export interface BoxProps
  extends Omit<BoxHTMLProps, 'ref' | 'style' | 'className' | 'sx'>,
    PatternsProps,
    SpaceStyleProps,
    SizeStyleProps {
  element?: ElementType
  styles?: SxStyleProp
  children?: ReactNode | ((props: BoxProps) => ReactNode)
  themeKey?: string
}
