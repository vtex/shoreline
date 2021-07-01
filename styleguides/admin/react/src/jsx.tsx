import React from 'react'
import { useSystem } from '@vtex/admin-core'
import { merge, pick, omit, isFunction } from '@vtex/onda-util'

import { __options, __stylesheet } from './symbols'
import { As, OndaComponent, Configuration, PropsWithAs } from './types'
import { cleanProps, useOptionsIdentity, getStylesheet, getOptions } from './util'
import { useStylesheet, Stylesheet } from './useStyleSheet'
import { DOMElements, domElements } from './domElements'

/**
 * Base jsx function
 * Use it to create onda-powered components
 * @example
 * // with jsx tag
 * _jsx('div')()
 *
 * // with component
 * import { Role } from 'reakit'
 *
 * _jsx(Role)()
 *
 * // composition
 * const A = _jsx('div')()
 * const B = _jsx(A)()
 *
 * // polymorphism
 * const Button = _jsx('button')()
 *
 * <Button as="a" href="#">Button Link</Button>
 */
export function _jsx<T extends As = 'div'>(type: T) {

  const parentStylesheet = getStylesheet(type) ?? {}
  const parentOptions = getOptions(type) ?? []


  return function component<
    TT extends T,
    Options extends {},
    Variants extends {},
    InferVariants extends Variants
  >(
    jsxStylesheet: Stylesheet<Variants> = {},
    configuration: Configuration<TT, Options, InferVariants> = {
      sync: [],
      useOptions: useOptionsIdentity,
      options: [],
    }
  ): OndaComponent<TT, Options, InferVariants> {
    const {
      sync = [],
      useOptions = useOptionsIdentity,
      options: jsxOptions = [],
    } = configuration

    const stylesheet = merge(parentStylesheet, jsxStylesheet)
    const options = [...parentOptions, ...jsxOptions]

    const ConcreteOndaComponent = (
      props: PropsWithAs<Options, TT>,
      ref: React.Ref<any>
    ) => {
      const { as: ComponentCall = type, ...unparsedProps } = props
      const system = useSystem()
      const interceptedProps = useOptions(
        pick(unparsedProps, options) as any,
        omit(unparsedProps, options) as any,
        system
      )
      const mergedProps = merge(unparsedProps, interceptedProps)

      const propsWithCompiledStyle = useStylesheet({
        stylesheet,
        sync,
        options,
        props: mergedProps,
      })

      const { children, ...htmlProps } =
        typeof type === 'string'
          ? cleanProps(propsWithCompiledStyle)
          : merge(propsWithCompiledStyle, pick(mergedProps, options))

      return (
        <ComponentCall ref={ref} {...htmlProps}>
          {isFunction(children) ? children(htmlProps) : children}
        </ComponentCall>
      )
    }

    const Forwarded = React.forwardRef(ConcreteOndaComponent)

    return Object.assign(Forwarded as any, {
      [__options]: options,
      [__stylesheet]: stylesheet,
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
 * const Box = jsx(Role)({
 *  color: 'blue'
 * })
 *
 * <Box>Blue colored box</Box>
 */
const jsx = _jsx as typeof _jsx &
  {
    [key in DOMElements]: {
      <
        TT extends key,
        Options extends {},
        Variants extends {},
        InferVariants extends Variants
      >(
        styleSheet?: Stylesheet<Variants>,
        configuration?: Configuration<TT, Options, InferVariants>
      ): OndaComponent<TT, Options, InferVariants>
    }
  }

domElements.forEach((domElement) => {
  jsx[domElement] = _jsx(domElement)
})

export { jsx }
