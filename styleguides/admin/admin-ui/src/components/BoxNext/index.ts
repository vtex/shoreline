import React from 'react'
import { Box as ReakitBox, BoxHTMLProps } from 'reakit'
import { SxStyleProp } from '@theme-ui/core'

import {
  createElement,
  createComponent,
  omitCSSProps,
  pickHTMLProps,
  mergeRefs,
  useCx,
  compose,
} from '../../system-next'
import { ComponentType, ColorStyleProps, BorderStyleProps } from './types'

export interface BoxProps
  extends Omit<BoxHTMLProps, 'color' | 'translate'>,
    ColorStyleProps,
    BorderStyleProps {
  use?: string | ComponentType<any>
  sx?: SxStyleProp
  children?: React.ReactNode | ((props: BoxProps) => React.ReactNode)
}

export const Box = createComponent<BoxProps>(
  (props, ref) => {
    const boxProps = useBox(props)

    return createElement({
      children: props.children,
      component: ReakitBox,
      use: props.use,
      htmlProps: boxProps,
      ref,
    })
  },
  {
    // @ts-expect-error
    assign: { displayName: 'Box', useProps: useBox },
    memoize: false,
  }
)

function useBox(props: BoxProps) {
  const compoundProps = compose(props)
  const className = useCx(compoundProps)
  const htmlProps = omitCSSProps(pickHTMLProps(compoundProps))

  const ref = compoundProps.elementRef ?? {
    ref: mergeRefs(compoundProps.elementRef, compoundProps.ref),
  }

  const wrapElement = compoundProps.wrapElement ?? {
    wrapElement: compoundProps.wrapElement,
  }

  return { ...htmlProps, className, ...ref, ...wrapElement }
}
