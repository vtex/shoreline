import { createComponent, jsxs } from '@vtex/admin-core'
import { IconSearch } from '@vtex/admin-ui-icons'

import { Primitive, PrimitiveProps } from '@vtex/admin-primitives'
import { AbstractInput, AbstractInputProps } from '../AbstractInput'
import { Button } from '../Button'
import { VisuallyHidden } from '../VisuallyHidden'
import { Label } from '../Label'
import { SystemComponentProps } from '../../types'
import { FormEvent } from 'react'
import { Spinner } from '../Spinner'

export const Search = createComponent(Primitive, useSearch)

export function useSearch(props: SearchProps): PrimitiveProps<'form'> {
  const {
    id,
    placeholder,
    onSubmit,
    loading,
    height = 'regular',
    csx = {},
    ...inputProps
  } = props

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit?.()
  }

  return {
    element: 'form',
    role: 'search',
    onSubmit: handleSubmit,
    children: [
      jsxs(VisuallyHidden, {}, jsxs(Label, { htmlFor: id }, placeholder)),
      jsxs(AbstractInput, {
        id,
        placeholder,
        icon: loading
          ? jsxs(Spinner, {})
          : jsxs(IconSearch, {
              csx: {
                color: 'blue',
                ...(height === 'small'
                  ? {
                      margin: '0.375rem 0 0.376rem 0.5rem',
                      top: 0,
                    }
                  : {}),
              },
            }),
        csx: {
          ...(height === 'small'
            ? {
                height: 32,
                padding: '0.4375rem 0.25rem 0.4375rem 2rem',
                margin: 0,
              }
            : {}),
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
  'icon' | 'id' | 'placeholder'
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
  /** Size of the button
   * @default regular
   */
  height?: 'small' | 'regular'
}
