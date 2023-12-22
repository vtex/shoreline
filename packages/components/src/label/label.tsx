import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { useStore } from '@vtex/shoreline-store'

import { Composable, Compose } from '../compose'
import { createMessageHook } from '../locale'
import { messages } from './messages'
import './label.css'
import { useFieldContext } from '../field'

const useMessage = createMessageHook(messages)

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

export interface LabelProps extends ComponentPropsWithoutRef<'label'> {
  asChild?: boolean
  optional?: boolean
}
