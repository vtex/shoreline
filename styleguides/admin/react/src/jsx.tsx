import React from 'react'
import { useSystem } from '@vtex/admin-core'
import { merge, pick, omit, isFunction, capitalize, get } from '@vtex/onda-util'

import { __element, __options, __stylesheet } from './symbols'
import { VariantsCall, CsxCall } from './types'
import {
  cleanProps,
  useOptionsIdentity,
  getStylesheet,
  getOptions,
} from './util'
import { useStylesheet, Stylesheet, Sync } from './useStylesheet'
import { DOMElements, domElements } from './domElements'

/**
 * Base jsx function
 * Use it to create onda-powered components
 * @template T Component/Element type, 'div' by default
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
 *
 * ### 🚧 TODOs ###
 * @todo inherit behavior
 * @todo inherit styles
 * @todo inherit types
 */
export function _jsx<T extends React.ElementType<any> = 'div'>(type: T) {
  const parentStylesheet = getStylesheet(type) ?? {}
  const parentOptions = getOptions(type) ?? []

  return function component<
    TT extends T,
    Options extends {},
    Variants extends {},
    InferVariants extends Variants
  >(
    jsxStylesheet: Stylesheet<Variants> = {},
    configuration: JsxConfiguration<TT, Options, InferVariants> = {
      sync: [],
      useOptions: useOptionsIdentity,
      options: [],
    }
  ): TT extends string
    ? OndaJsxElement<TT, Options, Variants>
    : TT extends {
        [__element]: infer DeepTT
      }
    ? OndaJsxElement<DeepTT, Options, Variants>
    : OndaJsxComponent<TT, Options, Variants> {
    const {
      sync = [],
      useOptions = useOptionsIdentity,
      options: jsxOptions = [],
    } = configuration

    console.log({ type })

    const stylesheet = merge(parentStylesheet, jsxStylesheet)
    const options = [...parentOptions, ...jsxOptions]

    const ConcreteOndaComponent = (props: any, ref: React.Ref<any>) => {
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

    ConcreteOndaComponent.displayName =
      typeof type === 'string'
        ? capitalize(String(type))
        : get(type, 'type.render.displayName', get(type, 'type.render.name', 'OndaComponent'))

    const Forwarded = React.forwardRef(ConcreteOndaComponent)

    return Object.assign(Forwarded as any, {
      [__options]: options,
      [__stylesheet]: stylesheet,
    })
  }
}

/**
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
        configuration?: JsxConfiguration<TT, Options, InferVariants>
      ): TT extends string
        ? OndaJsxElement<TT, Options, Variants>
        : TT extends {
            [__element]: infer DeepTT
          }
        ? OndaJsxElement<DeepTT, Options, Variants>
        : OndaJsxComponent<TT, Options, Variants>
    }
  }

domElements.forEach((domElement) => {
  jsx[domElement] = _jsx(domElement)
})

export { jsx }

/**
 * Onda JSX Elements
 * @memberof types
 * @template Type Element type
 * @template Options Extra options
 * @template Variants Stylesheet variants
 *
 * ### 🚧 TODOs ###
 * @todo support variant types inheritance
 * @todo suppoer option types inheritance
 */
export interface OndaJsxElement<Type, Options extends {}, Variants extends {}>
  extends React.ForwardRefExoticComponent<
    Omit<
      React.ComponentPropsWithRef<ComponentInfer<Type>>,
      keyof Variants | 'as'
    > &
      VariantsCall<Variants>
  > {
  /**
   * Prioritize elements over components
   * @example
   * const Button = jsx.button()
   *
   * <Button href="" /> // 🚨 type error
   * <Button as="a" href="" /> // ✅ all good
   */
  <
    E extends IntrinsicElementsKeys = Type extends IntrinsicElementsKeys
      ? Type
      : never
  >(
    props: Options &
      VariantsCall<Variants> & { as?: E } & Omit<
        React.ComponentPropsWithRef<E>,
        keyof Variants | 'as'
      > &
      CsxCall
  ): JSX.Element
  /**
   * Handle a component type
   * @example
   * const Button = jsx.button()
   *
   * <Button to="" /> // 🚨 type error
   * <Button as={GatsbyLink} to="" /> // ✅ all good
   */
  <
    As extends React.ComponentType = Type extends React.ComponentType
      ? Type
      : never
  >(
    props: Options &
      VariantsCall<Variants> & { as: As } & Omit<
        React.ComponentPropsWithRef<As>,
        keyof Variants | 'as'
      > &
      CsxCall
  ): JSX.Element
  /**
   * Component name displayed on console
   * @default 'OndaComponent'
   */
  displayName?: string
  /**
   * Component stylesheet
   * @private
   * @default {}
   */
  [__stylesheet]: Stylesheet<Variants>
  /**
   * Component options
   * @private
   * @default []
   */
  [__options]: string[]
  /**
   * Reference element
   * @private
   * @default 'div'
   */
  [__element]: Type
}

/**
 * Onda JSX Components
 * @memberof types
 * @template Type Component type
 * @template Options Extra options
 * @template Variants Stylesheet variants
 *
 * ### 🚧 TODOs ###
 * @todo support variant types inheritance
 * @todo suppoer option types inheritance
 */
export interface OndaJsxComponent<Type, Options extends {}, Variants extends {}>
  extends React.ForwardRefExoticComponent<
    Omit<
      React.ComponentPropsWithRef<ComponentInfer<Type>>,
      keyof Variants | 'as'
    > &
      VariantsCall<Variants>
  > {
  /**
   * Prioritize components over elements
   * @example
   * const Button = jsx.button()
   *
   * <Button to="" /> // 🚨 type error
   * <Button as={GatsbyLink} to="" /> // ✅ all good
   */
  <
    As extends React.ComponentType = Type extends React.ComponentType
      ? Type
      : never
  >(
    props: Options &
      VariantsCall<Variants> & { as?: As } & Omit<
        React.ComponentPropsWithRef<As>,
        keyof Variants | 'as'
      > &
      CsxCall
  ): JSX.Element
  /**
   * Handle a component type
   * @example
   * const Button = jsx.button()
   *
   * <Button href="" /> // 🚨 type error
   * <Button as="a" href="" /> // ✅ all good
   */
  <
    E extends IntrinsicElementsKeys = Type extends IntrinsicElementsKeys
      ? Type
      : never
  >(
    props: Options &
      VariantsCall<Variants> & { as: E } & Omit<
        React.ComponentPropsWithRef<E>,
        keyof Variants | 'as'
      > &
      CsxCall
  ): JSX.Element
  /**
   * Component name displayed on console
   * @default 'OndaComponent'
   */
  displayName?: string
  /**
   * Component stylesheet
   * @private
   * @default {}
   */
  [__stylesheet]: Stylesheet<Variants>
  /**
   * Component options
   * @private
   * @default []
   */
  [__options]: string[]
  /**
   * Reference element
   * @private
   * @default 'div'
   */
  [__element]: Type
}

export interface JsxConfiguration<
  Type extends React.ElementType<any>,
  Options extends {},
  Variants extends {}
> {
  options?: string[]
  useOptions?: (
    options: Options,
    props: React.ComponentPropsWithoutRef<Type>,
    system: ReturnType<typeof useSystem>
  ) => React.ComponentPropsWithoutRef<Type>
  sync?: Sync<Variants>[]
}

export type IntrinsicElementsKeys = keyof JSX.IntrinsicElements
export type ComponentInfer<T> = T extends
  | IntrinsicElementsKeys
  | React.ComponentType<any>
  ? T
  : never
