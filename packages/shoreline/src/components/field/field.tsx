import * as React from 'react'
import { forwardRef, useId, Store } from '@vtex/shoreline-utils'

import { Composable, Compose } from '../compose'
import type { FieldContextType } from './field-context'
import { FieldProvider } from './field-provider'

/**
 * Implementation of a fieldset
 * @example
 * <Field>
 *  <Label>Label</Label>
 *  <Input />
 *  <FieldDescription>Short description</FieldDescription>
 *  <FieldError>Error message</FieldError>
 * </Field>
 */
export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  props,
  ref
) {
  const {
    id: defaultId,
    error = false,
    children,
    asChild = false,
    space = 'normal',
    ...otherProps
  } = props

  const id = useId(defaultId)
  const Comp = asChild ? Compose : 'div'

  const store = React.useMemo(
    () =>
      new Store<FieldContextType>({
        id,
        error,
      }),
    [error, id]
  )

  return (
    <Comp
      data-sl-field
      id={`${id}-field`}
      ref={ref}
      data-space={space}
      {...otherProps}
    >
      <FieldProvider store={store}>
        <Composable>{children}</Composable>
      </FieldProvider>
    </Comp>
  )
})

export interface FieldOptions {
  /**
   * Enables component composition
   * @default false
   */
  asChild?: boolean
  /**
   * Whether the field is in an error state
   * @default false
   */
  error?: boolean
  /**
   * Space between the field's children
   * @default 'normal'
   */
  space?: 'normal' | 'large'
}

export type FieldProps = FieldOptions & React.ComponentPropsWithoutRef<'div'>
