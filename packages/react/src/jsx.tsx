import React from 'react'
import { useSystem } from '@vtex/onda-core'
import { merge, pick, omit, isFunction } from '@vtex/onda-util'

import type { __element } from './symbols'
import { __options, __stylesheet } from './symbols'
import type { VariantsCall, CsxCall } from './types'
import { useOptionsIdentity, getStylesheet, getOptions } from './util'
import type { Stylesheet, Sync } from './useStylesheet'
import { useStylesheet } from './useStylesheet'
import type { DOMElements } from './domElements'
import { domElements } from './domElements'

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
 * @todo handle generic components
 */
export function _jsx<T extends React.ElementType = 'div'>(type: T) {
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
      memoize: false,
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
      memoize = false,
    } = configuration

    const stylesheet = merge(parentStylesheet, jsxStylesheet)
    const options = [...parentOptions, ...jsxOptions]

    let Component = (props: any, ref: React.Ref<any>) => {
      const { as: ComponentCall = type, ...unparsedProps } = props
      const system = useSystem()
      const propsWithOptions = useOptions(
        pick(unparsedProps, options) as any,
        omit(unparsedProps, options) as any,
        system
      )

      const styledProps = useStylesheet({
        stylesheet,
        sync,
        props: propsWithOptions,
      })

      const { children, ...htmlProps } = styledProps

      return (
        <ComponentCall ref={ref} {...htmlProps}>
          {isFunction(children)
            ? children(htmlProps)
            : propsWithOptions.children}
        </ComponentCall>
      )
    }

    Component = forwardRef(Component)

    if (memoize) {
      Component = memo(Component)
    }

    Component = Object.assign(Component as any, {
      [__options]: options,
      [__stylesheet]: stylesheet,
    })

    return Component as any
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

function forwardRef<T extends React.ForwardRefRenderFunction<any, any>>(
  component: T
) {
  return React.forwardRef(component) as unknown as T
}

function memo<T extends React.ComponentType<any>>(
  component: T,
  propsAreEqual?: (
    prevProps: Readonly<React.ComponentProps<T>>,
    nextProps: Readonly<React.ComponentProps<T>>
  ) => boolean
) {
  return React.memo(component, propsAreEqual) as unknown as T
}

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
      keyof Variants | keyof Options | 'as'
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
        keyof Variants | keyof Options | 'as'
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
        keyof Variants | keyof Options | 'as'
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
      keyof Variants | keyof Options | 'as'
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
        keyof Variants | keyof Options | 'as'
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
        keyof Variants | keyof Options | 'as'
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
  Type extends React.ElementType,
  Options extends {},
  Variants extends {}
> {
  options?: string[]
  useOptions?: (
    options: Options,
    props: React.ComponentPropsWithoutRef<Type> &
      CsxCall &
      VariantsCall<Variants>,
    system: ReturnType<typeof useSystem>
  ) => React.ComponentPropsWithoutRef<Type>
  sync?: Array<Sync<Variants>>
  memoize?: boolean
}

export type IntrinsicElementsKeys = keyof JSX.IntrinsicElements
export type ComponentInfer<T> = T extends
  | IntrinsicElementsKeys
  | React.ComponentType<any>
  ? T
  : never
