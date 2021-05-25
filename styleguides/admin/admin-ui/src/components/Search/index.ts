import { createComponent, jsxs, StyleObject } from '@vtex/admin-core'
import { IconSearch, IconCancel } from '@vtex/admin-ui-icons'

import { Primitive, PrimitiveProps } from '@vtex/admin-primitives'
import { AbstractInput, AbstractInputProps } from '../AbstractInput'
import { Button } from '../Button'
import { VisuallyHidden } from '../VisuallyHidden'
import { Label } from '../Label'
import { SystemComponentProps } from '../../types'
import { FormEvent } from 'react'
import { Spinner } from '../Spinner'

export const Search = createComponent(Primitive, useSearch)

const iconCsx = {
  color: 'dark.primary',
  margin: '0.625rem 0.25rem 0 0.5rem',
  top: 0,
}

export function useSearch(props: SearchProps): PrimitiveProps<'form'> {
  const {
    id,
    placeholder,
    onSubmit,
    loading,
    onClear,
    value = '',
    wrappingFormCSX = {},
    csx = {},
    ...inputProps
  } = props

  const showClear = !!onClear && value.toString().length > 0

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit?.()
  }

  return {
    element: 'form',
    role: 'search',
    onSubmit: handleSubmit,
    csx: { position: 'relative', wrappingFormCSX },
    children: [
      jsxs(VisuallyHidden, {}, jsxs(Label, { htmlFor: id }, placeholder)),
      jsxs(AbstractInput, {
        id,
        placeholder,
        value,
        icon: jsxs(loading ? Spinner : IconSearch, { csx: iconCsx }),
        buttonElements: showClear
          ? jsxs(Button, {
              icon: jsxs(IconCancel, {}),
              onClick: onClear,
              size: 'small',
              variant: 'adaptative-dark',
              csx: {
                position: 'absolute',
                top: 0,
                right: 0,
                marginRight: '0.375rem',
              },
            })
          : undefined,
        csx: {
          height: '2.5rem',
          paddingY: '0.4375rem',
          paddingLeft: '2rem',
          paddingRight: '2.5rem',
          margin: 0,
          ...csx,
        },
        ...inputProps,
      }),
      jsxs(VisuallyHidden, {}, jsxs(Button, { type: 'submit' }, 'Search')),
    ],
  }
}

export type SearchOwnProps = Omit<
  AbstractInputProps,
  'icon' | 'id' | 'placeholder' | 'buttonElements' | 'suffix'
>

export interface SearchProps extends SystemComponentProps<SearchOwnProps> {
  /** wheather is loading @default false */
  loading?: boolean
  /** id of the search, must be unique within a page */
  id: string
  /** placeholder text */
  placeholder: string
  /** action to perform on submit */
  onSubmit?: () => void
  /** style object for form wrapping search input */
  wrappingFormCSX?: StyleObject
}
