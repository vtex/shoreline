import React from 'react'
import { useSystem } from '@vtex/admin-core'
import { merge, pick, omit, isFunction } from '@vtex/onda-util'

import { ONDA_METADATA } from './symbols'
import { As, OndaComponent, Configuration, PropsWithAs } from './types'
import { cleanProps, useOptionsIdentity, isOndaComponent } from './util'
import { useStyleSheet, StyleSheet } from './useStyleSheet'
import { domElements } from './domElements'

/**
 * Base jsx function
 * Use it to create onda-powered components
 * @example
 * // with jsx tag
 * __jsx('div')()
 * 
 * // with component
 * import { Role } from 'reakit'
 * 
 * __jsx(Role)()
 * 
 * // composition
 * const A = __jsx('div')()
 * const B = __jsx(A)()
 * 
 * // polymorphism
 * const Button = __jsx('button')()
 * 
 * <Button as="a" href="#">Button Link</Button>
 */
function __jsx<T extends As>(type: T) {
  return function component<O, Variants, InferVariants extends Variants>(
    styleSheet: StyleSheet<Variants> = {},
    configuration: Configuration<T, O, InferVariants> = {
      sync: [],
      useOptions: useOptionsIdentity,
      options: [],
    }
  ): OndaComponent<T, O, Variants> {
    const {
      sync = [],
      useOptions = useOptionsIdentity,
      options = [],
    } = configuration

    const sheet = isOndaComponent(type as any)
      ? merge((type as any)[ONDA_METADATA].sheet, styleSheet)
      : styleSheet

    const ConcreteOndaComponent = ((
      { as: ComponentCall = type, state = {}, ...props }: PropsWithAs<O, T>,
      ref: React.Ref<T>
    ) => {
      const system = useSystem()
      const interceptedProps = useOptions(
        pick(props, options as any),
        omit(props, options as any) as any,
        system
      )

      const hookedProps = merge(props, interceptedProps)

      const propsWithCompiledStyle = useStyleSheet({
        styleSheet,
        sync,
        options,
        props: hookedProps,
      })

      const { children, ...htmlProps } =
        typeof type === 'string'
          ? cleanProps(propsWithCompiledStyle)
          : merge(propsWithCompiledStyle, pick(hookedProps, options))

      return (
        <ComponentCall {...state} ref={ref} {...htmlProps}>
          {isFunction(children) ? children(htmlProps) : children}
        </ComponentCall>
      )
    }) as OndaComponent<T, O, Variants>

    const Forwarded = React.forwardRef(ConcreteOndaComponent as any) as any

    return Object.assign(Forwarded, {
      [ONDA_METADATA]: {
        useOptions,
        options,
        styleSheet: sheet ?? {},
      },
    })
  }
}

/**
 *
 * @example
 * // with elements
 * const Div = jsx.div({
 *  color: 'blue'
 * })
 *
 * <Div>Blue colored div</Div>
 *
 * // with components
 * import { Role } from 'reakit' // or any custom library
 *
 * const Box = jsx(Role, {
 *  color: 'blue'
 * })
 *
 * <Box>Blue colored box</Box>
 */
const jsx = __jsx as typeof __jsx &
  {
    [key in typeof domElements[number]]: ReturnType<typeof __jsx>
  }

domElements.forEach((domElement) => {
  jsx[domElement] = __jsx(domElement)
})

export { jsx }
