import { useSystem, StyleObject } from '@vtex/admin-core'
import { ONDA_METADATA } from './symbols'
import { Sync } from './useStyleSheet'

/**
 * "as" prop
 * @memberof types
 * @template P Props
 */
export type As<P = any> = React.ElementType<P>

/**
 * Render prop type
 * @memberof types
 * @template P Props
 */
export type RenderProp<P = {}> = (props: P) => React.ReactElement<P>

/**
 * @memberof types
 * @template T Element type
 */
export type HTMLAttributesWithRef<T = any> = React.HTMLAttributes<T> &
  React.RefAttributes<T>

/**
 * Returns only the HTML attributes inside P
 * ```ts
 * type OnlyId = ExtractHTMLAttributes<{ id: string; foo: string }>;
 * type HTMLAttributes = ExtractHTMLAttributes<any>;
 * ```
 * @memberof types
 * @template P Props
 */
export type ExtractHTMLAttributes<P> = Pick<
  HTMLAttributesWithRef,
  Extract<keyof HTMLAttributesWithRef, keyof P>
>

/**
 * Generic component props with "as" prop
 * @memberof types
 * @template P Additional props
 * @template T React component or string element
 */
export type PropsWithAs<P, T extends As> = P &
  Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'state' | keyof P> & {
    csx?: StyleObject
    css?: any
    as?: T
    children?: React.ReactNode | RenderProp<ExtractHTMLAttributes<any>>
  }

export interface OndaComponentMetadata {
  /** attached behavior */
  useOptions: Function
  /**
   * props that will pass through
   */
  options: string[]
  styleSheet: any
}

export type OndaComponent<Type extends As, Options, Variants> = {
  <PolymorphicType extends As>(
    props: PropsWithAs<Options, PolymorphicType> & { as: PolymorphicType } & VariantsCall<Variants>
  ): JSX.Element
  (props: PropsWithAs<Options, Type> & VariantsCall<Variants>): JSX.Element
  displayName?: string
  defaultProps?: Partial<PropsWithAs<Options, Type> & VariantsCall<Variants>>
  [ONDA_METADATA]: OndaComponentMetadata
}

export interface Configuration<Type extends As, Options, Variants> {
  options?: string[]
  useOptions?: (
    options: Options,
    props: React.ComponentPropsWithoutRef<Type>,
    system: ReturnType<typeof useSystem>
  ) => React.ComponentPropsWithoutRef<Type>
  sync?: Sync<Variants>[]
}

export type VariantsCall<Variants> = {
  [k in keyof Variants]?: keyof Variants[k]
}
