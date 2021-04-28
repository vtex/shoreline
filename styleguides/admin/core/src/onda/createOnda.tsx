import React from 'react'
import { isValidElementType } from 'react-is'
import { merge, pick, omit, isFunction } from '@vtex/admin-ui-system'

import { useSystem } from '../core'
import { ONDA_METADATA } from './symbols'
import { As, OndaComponent, Options, PropsWithAs } from './types'
import {
  cleanProps,
  useOwnPropsIdentity,
  isOndaComponent,
  pickOwnProps,
} from './util'
import { useStyleSheet, StyleSheet, Sync } from './useStyleSheet'

export function createOnda<
  T extends As,
  O,
  Variants,
  InferVariants extends Variants
>(
  target: T | Options<T, O, Variants>,
  styleSheet: StyleSheet<Variants> = {},
  sync: Sync<InferVariants>[] = []
): OndaComponent<T, O, Variants> {
  const unsafeType = target as any

  // chooses the correct configuration setting for the target
  const configuration = {
    type: (isValidElementType(target) ? target : target.as) as T,
    ownProps: pickOwnProps(unsafeType),
    useOwnProps: unsafeType?.useOwnProps ?? useOwnPropsIdentity,
    sheet: isOndaComponent(unsafeType)
      ? merge(unsafeType[ONDA_METADATA].sheet, styleSheet)
      : styleSheet,
  }

  const ConcreteOndaComponent = ((
    { as: ComponentCall = configuration?.type, ...props }: PropsWithAs<O, T>,
    ref: React.Ref<T>
  ) => {
    const system = useSystem()
    const interceptedProps = configuration.useOwnProps(
      pick(props, configuration.ownProps),
      omit(props, configuration.ownProps),
      system
    )

    const hookedProps = merge(props, interceptedProps)

    const propsWithCompiledStyle = useStyleSheet({
      styleSheet,
      sync,
      props: hookedProps,
      ownProps: configuration.ownProps,
    })

    const { children, ...htmlProps } =
      typeof configuration.type === 'string'
        ? cleanProps(propsWithCompiledStyle)
        : merge(
            propsWithCompiledStyle,
            pick(hookedProps, configuration.ownProps)
          )

    return (
      <ComponentCall ref={ref} {...htmlProps}>
        {isFunction(children) ? children(htmlProps) : children}
      </ComponentCall>
    )
  }) as OndaComponent<T, O, Variants>

  const Forwarded = React.forwardRef(ConcreteOndaComponent as any) as any

  return Object.assign(Forwarded, {
    [ONDA_METADATA]: {
      useOwnProps: configuration.useOwnProps,
      ownProps: configuration.ownProps,
      styleSheet: configuration?.sheet ?? {},
    },
  })
}
