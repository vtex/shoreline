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
  useOwnProps: Function
  /**
   * props that will pass through
   */
  ownProps: string[]
  styleSheet: any
}

export type OndaComponent<T extends As, O, V> = {
  <TT extends As>(
    props: PropsWithAs<O, TT> & { as: TT } & VariantsCall<V>
  ): JSX.Element
  (props: PropsWithAs<O, T> & VariantsCall<V>): JSX.Element
  displayName?: string
  defaultProps?: Partial<PropsWithAs<O, T> & VariantsCall<V>>
  [ONDA_METADATA]: OndaComponentMetadata
}

export interface Configuration<T extends As, O, V> {
  options?: string[]
  useOptions?: (
    options: O,
    props: React.ComponentPropsWithoutRef<T>,
    system: ReturnType<typeof useSystem>
  ) => React.ComponentPropsWithoutRef<T>
  sync?: Sync<V>[]
}

export type VariantsCall<Variants> = {
  [k in keyof Variants]?: keyof Variants[k]
}
