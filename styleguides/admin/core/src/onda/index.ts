import React from 'react'
import { isValidElementType } from 'react-is'
import { merge, pick, omit, jsxs } from '@vtex/admin-ui-system'

import { useSystem } from '../core'
import { ONDA_METADATA } from './symbols'
import { As, Component, Options, PropsWithAs, Sheet, Sync } from './types'
import { cleanProps, identity, isOndaComponent, pickOwnProps } from './util'
import { useSheet } from './useSheet'

export * from './types'
export * from './useSheet'
export * from './util'
export * from './symbols'

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
    sheet: isOndaComponent(unsafeType)
      ? merge(unsafeType[ONDA_METADATA].sheet, sheet)
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
    [ONDA_METADATA]: {
      useHook: configuration.useHook,
      ownProps: configuration.ownProps,
      sheet: configuration?.sheet ?? {},
    },
  })
}
