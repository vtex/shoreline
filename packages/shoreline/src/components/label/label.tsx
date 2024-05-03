import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { useStore } from '@vtex/shoreline-utils'

import { Composable, Compose } from '../compose'
import { createMessageHook } from '../locale'
import { messages } from './messages'
import { useFieldContext } from '../field'

const useMessage = createMessageHook(messages)

/**
 * Label component
 * @example
 * <Label>Label</Label>
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  props,
  ref
) {
  const {
    asChild = false,
    optional = false,
    children,
    id: defaultId,
    ...domProps
  } = props

  const Comp = asChild ? Compose : 'label'

  const getMessage = useMessage()

  const store = useFieldContext()
  const id = useStore(store, (s) => s.id)

  return (
    <Comp data-sl-label ref={ref} htmlFor={defaultId || id} {...domProps}>
      <Composable>{children}</Composable>
      {optional && (
        <span data-sl-label-optional-flag>{getMessage('optional')}</span>
      )}
    </Comp>
  )
})

export interface LabelOptions {
  /**
   * Enables component composition
   * @default false
   */
  asChild?: boolean
  /**
   * Whether the input linked to this label is optional
   * @default false
   */
  optional?: boolean
}

export type LabelProps = LabelOptions & ComponentPropsWithoutRef<'label'>
