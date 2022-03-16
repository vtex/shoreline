import type { AnyObject } from '@vtex/admin-ui-util'
import type { StyleProp } from '@vtex/admin-ui-core'

const __as = Symbol('cached type')

export interface SystemStyles {
  baseStyle?: StyleProp
  csx?: StyleProp
  css?: any
}

export type ComponentStyleProps = Omit<SystemStyles, 'baseStyle'>

export type RenderProp<P = AnyObject> = (props: P) => JSX.Element | null

export type MergeLeft<A, B> = A & Omit<B, keyof A>

export type Join<A, B> = A & B

export type IntrinsicElementsKeys = keyof JSX.IntrinsicElements

export type ComponentInfer<T> = T extends
  | IntrinsicElementsKeys
  | React.ComponentType<any>
  ? T
  : never

/**
 * Props that form the componets internally
 */
export type PrivateProps<
  As extends React.ElementType,
  P extends {}
> = As extends string
  ? MergeLeft<P, React.HTMLProps<As>> & SystemStyles & P
  : MergeLeft<P, React.ComponentPropsWithRef<As>> & SystemStyles & P

/**
 * Props that are called by the user
 */
export type PublicProps<As extends React.ElementType> = PrivateProps<As, {}>

export interface AdminUIElement<Type, Props extends {}>
  extends React.ForwardRefExoticComponent<
    Join<
      MergeLeft<
        Props,
        Omit<React.ComponentPropsWithRef<ComponentInfer<Type>>, 'as'>
      >,
      ComponentStyleProps
    >
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
    El extends IntrinsicElementsKeys = Type extends IntrinsicElementsKeys
      ? Type
      : never
  >(
    props: Join<
      MergeLeft<MergeLeft<{ as?: El }, Props>, React.ComponentPropsWithRef<El>>,
      ComponentStyleProps
    >
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
    props: Join<
      MergeLeft<MergeLeft<{ as: As }, Props>, React.ComponentPropsWithRef<As>>,
      ComponentStyleProps
    >
  ): JSX.Element
  displayName?: string
  [__as]: Type
}

export interface AdminUIComponent<Type, Props extends {}>
  extends React.ForwardRefExoticComponent<
    Join<
      MergeLeft<
        Props,
        Omit<React.ComponentPropsWithRef<ComponentInfer<Type>>, 'as'>
      >,
      ComponentStyleProps
    >
  > {
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
    props: Join<
      MergeLeft<MergeLeft<{ as?: As }, Props>, React.ComponentPropsWithRef<As>>,
      ComponentStyleProps
    >
  ): JSX.Element

  /**
   * Prioritize elements over components
   * @example
   * const Button = jsx('button')()
   *
   * <Button href="" /> // 🚨 type error
   * <Button as="a" href="" /> // ✅ all good
   */
  <
    El extends IntrinsicElementsKeys = Type extends IntrinsicElementsKeys
      ? Type
      : never
  >(
    props: Join<
      MergeLeft<MergeLeft<{ as: El }, Props>, React.ComponentPropsWithRef<El>>,
      ComponentStyleProps
    >
  ): JSX.Element
  displayName?: string
  [__as]: Type
}

export type Component<
  T extends React.ElementType,
  Props extends {} = {}
> = T extends string
  ? AdminUIElement<T, Props>
  : T extends {
      [__as]: infer TT
    }
  ? AdminUIElement<TT, Props>
  : AdminUIComponent<T, Props>
