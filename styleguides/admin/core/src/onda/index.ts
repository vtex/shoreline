import React from 'react'
import { isValidElementType } from 'react-is'
import isPropValid from '@emotion/is-prop-valid'
import { merge, pick, omit, jsxs } from '@vtex/admin-ui-system'
import { StyleObject, StyleProp } from '@vtex/admin-ui-system'

import { useSystem } from '../core'

// key that stores the onda component metadata
const ONDA_META = Symbol('onda component metadata')

function isOnda(value: any): boolean {
  return !!value[ONDA_META]
}

function pickOwnProps(type: any) {
  // is a configuration
  if (!!type.as) {
    if (isOnda(type.as)) {
      // passed an onda component on `as`
      const meta = type[ONDA_META]
      return [...(meta?.ownProps ?? []), ...(type?.ownProps ?? [])]
    }
    return type?.ownProps ?? []
  }

  // is a literal type
  if (isOnda(type)) {
    const meta = type[ONDA_META]
    return meta?.ownProps ?? []
  }

  return []
}

/**
 * Onda component factory
 */
export function onda<T extends As, O, Variants, InferVariants extends Variants>(
  morphType: T | Options<T, O, Variants>,
  sheet: Sheet<Variants> = {},
  sync: Sync<InferVariants>[] = []
): Component<T, O, Variants> {
  const unsafeType = morphType as any

  // chooses the correct configuration setting for the morphType
  const configuration = {
    type: (isValidElementType(morphType) ? morphType : morphType.as) as T,
    ownProps: pickOwnProps(unsafeType),
    useHook: unsafeType?.useHook ?? identity,
    sheet: isOnda(unsafeType)
      ? merge(unsafeType[ONDA_META].sheet, sheet)
      : sheet,
  }

  const OndaComponent = ((
    { as = configuration?.type, ...props }: PropsWithAs<O, T>,
    ref: React.Ref<T>
  ) => {
    const system = useSystem()
    const interceptedProps = configuration.useHook(
      pick(props, configuration.ownProps),
      omit(props, configuration.ownProps),
      system
    )

    const hookedProps = merge(props, interceptedProps)

    const propsWithCompiledStyle = useSheet({
      sheet,
      sync,
      props: hookedProps,
      ownProps: configuration.ownProps,
    })

    const htmlProps =
      typeof configuration.type === 'string'
        ? cleanProps(propsWithCompiledStyle)
        : merge(
            propsWithCompiledStyle,
            pick(hookedProps, configuration.ownProps)
          )

    return jsxs(as, {
      ref,
      ...htmlProps,
    })
  }) as Component<T, O, Variants>

  const Forwarded = React.forwardRef(OndaComponent as any) as any

  return Object.assign(Forwarded, {
    [ONDA_META]: {
      useHook: configuration.useHook,
      ownProps: configuration.ownProps,
      sheet: configuration?.sheet ?? {},
    },
  })
}

interface UseSheetParams<V> {
  sheet: Sheet<V>
  sync: Sync<any>[]
  ownProps: string[]
  props: any
}

/**
 * use a stylesheet
 * @param sheet
 * @param props
 */
function useSheet<V>(params: UseSheetParams<V>) {
  const { sheet, sync, props, ownProps } = params
  const { csx, className, ...htmlProps } = props
  const { cn, cx } = useSystem()

  const { variants = {}, ...preCsx } = sheet

  const variantList = Object.keys(variants)

  const synced = sync.reduce((acc, s) => {
    const { csx, ...variantsToSync } = s

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
  const finalProps = omit(htmlProps, [...variantList, ...ownProps]) as any

  return { ...finalProps, className: cx(cn(sheetObject), className) }
}

function identity<I, J>(_: I, j: J) {
  return j
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
  /** attached behavior */
  useHook: Function
  /**
   * props that will pass through
   */
  ownProps: string[]
  sheet: any
}

type Component<T extends As, O, V> = {
  <TT extends As>(
    props: PropsWithAs<O, TT> & { as: TT } & VariantsCall<V>
  ): JSX.Element
  (props: PropsWithAs<O, T> & VariantsCall<V>): JSX.Element
  displayName?: string
  defaultProps?: Partial<PropsWithAs<O, T> & VariantsCall<V>>
  [ONDA_META]: OndaComponentMetadata
}

type Options<T extends As, O, V> =
  | {
      as: T
      defaultProps?: Partial<PropsWithAs<O, T> & VariantsCall<V>>
    }
  | {
      as: T
      ownProps: string[]
      defaultProps?: Partial<PropsWithAs<O, T> & VariantsCall<V>>
    }
  | {
      as: T
      ownProps: string[]
      useHook: (
        ownProps: O,
        props: React.ComponentPropsWithoutRef<T>,
        system: ReturnType<typeof useSystem>
      ) => React.ComponentPropsWithoutRef<T>
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
