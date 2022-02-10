import React from 'react'
import { merge, pick, omit, isFunction } from '@vtex/admin-ui-util'
import * as ReactIs from 'react-is'

import { useSystem } from './context'
import type { __element } from './symbols'
import { __options, __stylesheet } from './symbols'

import type { VariantsCall, CsxCall } from './types'
import { useOptionsIdentity, getStylesheet, getOptions } from './util'
import type { Stylesheet, Sync } from './hooks/useStylesheet'
import { useStylesheet } from './hooks/useStylesheet'

/**
 * Base jsx function
 * Use it to create admin-ui-powered components
 * @template T Component/Element type, 'div' by default
 * @example
 * // with jsx tag
 * jsx('div')()
 *
 * // with component
 * import { Role } from 'reakit'
 *
 * jsx(Role)()
 *
 * // composition
 * const A = jsx('div')()
 * const B = jsx(A)()
 *
 * // polymorphism
 * const Button = jsx('button')()
 *
 * <Button as="a" href="#">Button Link</Button>
 *
 * ### 🚧 TODOs ###
 * @todo inherit behavior
 * @todo inherit styles
 * @todo inherit types
 * @todo handle generic components
 */
export function jsx<T extends React.ElementType = 'div'>(type: T) {
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
    ? AdminUIJsxElement<TT, Options, Variants>
    : TT extends {
        [__element]: infer DeepTT
      }
    ? AdminUIJsxElement<DeepTT, Options, Variants>
    : AdminUIJsxComponent<TT, Options, Variants> {
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

      const fragment = (ComponentCall as any) === ReactIs.Fragment
      const { children, ...maybeDirtyProps } = styledProps
      const htmlProps = fragment
        ? omit(maybeDirtyProps, ['className', 'style'])
        : maybeDirtyProps

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
 * AdminUI JSX Elements
 * @memberof types
 * @template Type Element type
 * @template Options Extra options
 * @template Variants Stylesheet variants
 *
 * ### 🚧 TODOs ###
 * @todo support variant types inheritance
 * @todo suppoer option types inheritance
 */
export interface AdminUIJsxElement<
  Type,
  Options extends {},
  Variants extends {}
> extends React.ForwardRefExoticComponent<
    Omit<
      React.ComponentPropsWithRef<ComponentInfer<Type>>,
      keyof Variants | keyof Options | 'as'
    > &
      VariantsCall<Variants> &
      CsxCall
  > {
  /**
   * Prioritize elements over components
   * @example
   * const Button = jsx('button')()
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
   * const Button = jsx('button')()
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
   * @default 'AdminUIComponent'
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
 * AdminUI JSX Components
 * @memberof types
 * @template Type Component type
 * @template Options Extra options
 * @template Variants Stylesheet variants
 *
 * ### 🚧 TODOs ###
 * @todo support variant types inheritance
 * @todo suppoer option types inheritance
 */
export interface AdminUIJsxComponent<
  Type,
  Options extends {},
  Variants extends {}
> extends React.ForwardRefExoticComponent<
    Options &
      Omit<
        React.ComponentPropsWithRef<ComponentInfer<Type>>,
        keyof Variants | keyof Options | 'as'
      > &
      VariantsCall<Variants> &
      CsxCall
  > {
  /**
   * Prioritize components over elements
   * @example
   * const Button = jsx('button')()
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
   * const Button = jsx('button')()
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
   * @default 'AdminUIComponent'
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
  ) => React.ComponentPropsWithoutRef<Type> & VariantsCall<Variants>
  sync?: Array<Sync<Variants>>
  memoize?: boolean
}

export type IntrinsicElementsKeys = keyof JSX.IntrinsicElements
export type ComponentInfer<T> = T extends
  | IntrinsicElementsKeys
  | React.ComponentType<any>
  ? T
  : never
