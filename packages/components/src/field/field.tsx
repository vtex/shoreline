import * as React from 'react'
import { forwardRef, useId } from '@vtex/shoreline-utils'
import { Store } from '@vtex/shoreline-store'

import { Composable, Compose } from '@vtex/shoreline-primitives'
import type { FieldContextType } from './field-context'
import { FieldProvider } from './field-provider'
import './field.css'

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

export interface FieldProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean
  error?: boolean
  space?: 'normal' | 'large'
}
