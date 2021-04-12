import React from 'react'
import { isValidElementType } from 'react-is'
import isPropValid from '@emotion/is-prop-valid'
import { merge, pick, omit, jsxs } from '@vtex/admin-ui-system'
import { StyleObject, StyleProp } from '@vtex/admin-ui-system'

import { useSystem } from '../core'

// key that stores the onda component metadata
// const ONDA_META = Symbol('onda component metadata')

/**
 * Onda component factory
 */
export function onda<T extends As, O, Variants, InferVariants extends Variants>(
  morphType: T | Options<T, O, Variants>,
  sheet: Sheet<Variants> = {},
  sync: Sync<InferVariants>[] = []
): Component<T, O, Variants> {
  const unsafeType = morphType as any

  const settings = {
    type: (isValidElementType(morphType) ? morphType : morphType.as) as T,
    useHook: unsafeType?.useHook ?? identity,
    compose: unsafeType?.compose ?? true,
    sync,
  }

  const OndaComponent = ((
    { as = settings?.type, ...props }: PropsWithAs<O, T>,
    ref: React.Ref<T>
  ) => {
    const system = useSystem()
    const hookedProps = settings.useHook(props as any, system)
    const propsWithCompiledStyle = useSheet(sheet, sync, hookedProps)
    const htmlProps = settings.compose
      ? propsWithCompiledStyle
      : cleanProps(propsWithCompiledStyle)

    return jsxs(as, { ref, ...htmlProps })
  }) as Component<T, O, Variants>

  OndaComponent.metadata = {
    compose: settings.compose,
    useHook: settings.useHook,
  }

  return React.forwardRef(OndaComponent as any) as any
}

/**
 * use a stylesheet
 * @param sheet
 * @param props
 */
function useSheet<V>(sheet: Sheet<V>, syncArray: Sync<any>[], props: any) {
  const { csx, className, ...htmlProps } = props
  const { cn, cx } = useSystem()

  const { variants = {}, ...preCsx } = sheet

  const variantList = Object.keys(variants)

  const synced = syncArray.reduce((acc, sync) => {
    const { csx, ...variantsToSync } = sync

    const hasAll = Object.keys(variantsToSync).every((v) => {
      return htmlProps?.[v] === variantsToSync[v]
    })

    if (!hasAll) {
      return acc
    }

    return [...acc, csx] as any
  }, [])

  const variantStyles = variantList.reduce((acc, $key) => {
    const current = (variants as any)?.[$key] ?? {}
    return merge(acc, current?.[htmlProps?.[$key]] ?? {})
  }, {})

  const sheetObject = merge(preCsx, variantStyles, ...synced, csx)
  const finalProps = omit(htmlProps, variantList) as any

  return { ...finalProps, className: cx(className, cn(sheetObject)) }
}

function identity<I>(i: I) {
  return i
}

/**
 * clean not valid html props
 * @param props
 */
function cleanProps<P extends {}>(props: P) {
  const validKeys = Object.keys(props).filter(isPropValid)
  const htmlProps = pick(props, validKeys)
  return htmlProps
}

/**
 * "as" prop
 * @memberof types
 * @template P Props
 */
type As<P = any> = React.ElementType<P>

/**
 * Render prop type
 * @memberof types
 * @template P Props
 */
type RenderProp<P = {}> = (props: P) => React.ReactElement<any>

/**
 * @memberof types
 * @template T Element type
 */
type HTMLAttributesWithRef<T = any> = React.HTMLAttributes<T> &
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
type ExtractHTMLAttributes<P> = Pick<
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
    csx?: StyleProp
    css?: any
    as?: T
    children?: React.ReactNode | RenderProp<ExtractHTMLAttributes<any>>
  }

/**
 * Generic component props with "as" prop
 * @memberof types
 * @template P Additional props
 * @template T React component or string element
 */
// type PropsWithoutAs<P, T extends As> = P &
//   Omit<React.ComponentProps<T>, 'as' | 'state' | keyof P> & {
//     csx?: StyleProp
//     css?: any
//     children?: React.ReactNode | RenderProp<ExtractHTMLAttributes<any>>
//   }

export interface OndaComponentMetadata {
  /** if should compose or not */
  compose: boolean
  /** attached behavior */
  useHook: Function
}

type Component<T extends As, O, V> = {
  <TT extends As>(
    props: PropsWithAs<O, TT> & { as: TT } & VariantsCall<V>
  ): JSX.Element
  (props: PropsWithAs<O, T> & VariantsCall<V>): JSX.Element
  displayName?: string
  defaultProps?: Partial<PropsWithAs<O, T> & VariantsCall<V>>
  metadata: OndaComponentMetadata
}

// type RoleHTMLProps = React.HTMLAttributes<any> & React.RefAttributes<any>

type Options<T extends As, O, V> = {
  as: T
  useHook?: (
    options: O & React.ComponentPropsWithoutRef<T>,
    system: ReturnType<typeof useSystem>
  ) => React.ComponentPropsWithoutRef<T>
  compose?: boolean
  defaultProps?: Partial<PropsWithAs<O, T> & VariantsCall<V>>
}

type Sheet<Variants> = StyleObject & {
  variants?: {
    [k in keyof Variants]: { [b in keyof Variants[k]]: StyleObject }
  }
}

type Sync<Variants> = {
  [k in keyof Variants]?: keyof Variants[k]
} & {
  csx?: StyleObject
}

type VariantsCall<Variants> = {
  [k in keyof Variants]?: keyof Variants[k]
}
