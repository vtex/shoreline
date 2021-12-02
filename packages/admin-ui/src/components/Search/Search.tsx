import type { ComponentPropsWithRef } from 'react'
import React from 'react'
import { jsx } from '@vtex/admin-ui-react'
import { IconSearch, IconCancel } from '@vtex/admin-ui-icons'

import { AbstractInput } from '../AbstractInput'
import { Button } from '../Button'
import { Spinner } from '../Spinner'
import { VisuallyHidden } from '../VisuallyHidden'

import type { SearchFormState } from './hooks/useSearchState'

import style from './Search.style'

/**
 * Search form
 * @example
 * const state = useSearchState()
 *
 * <Search
 *  state={state}
 *  placeholder="Placeholder"
 *  aria-label="Search"
 * />
 *
 * @link [For accessibility guidelines](https://admin-ui-docs.vercel.app/form/search/#accessibility)
 */

const iconByName = {
  search: <IconSearch csx={style.search} />,
  spinner: <Spinner csx={style.spinner} size={20} />,
}

export const Search = jsx('form')(
  {
    position: 'relative',
    marginX: '1px',
  },
  {
    options: ['state'],
    useOptions(options: SearchOptions, props) {
      const { state } = options

      const iconName = state.loading ? 'spinner' : 'search'
      const Icon = iconByName[iconName]

      const ClearButton = state.showClear ? (
        <Button
          variant="adaptative-dark"
          aria-label="Clear search"
          csx={style.clearButton}
          icon={<IconCancel />}
          onClick={state.clear}
          size="small"
        />
      ) : null

      const { id, placeholder, 'aria-label': label = '', ...formProps } = props

      return {
        ...formProps,
        onSubmit: state.onSubmit,
        'aria-label': label,
        role: 'search',
        children: (
          <>
            <AbstractInput
              aria-label={label}
              placeholder={placeholder}
              id={id}
              value={state.value}
              icon={Icon}
              csx={style.input}
              onChange={(e) => state.setValue(e.target.value)}
              buttonElements={ClearButton}
            />
            <VisuallyHidden>
              <button type="submit" tabIndex={-1}>
                Search
              </button>
            </VisuallyHidden>
          </>
        ),
      }
    },
  }
)

export interface SearchOptions {
  state: SearchFormState
}

export type SearchProps = ComponentPropsWithRef<typeof Search> & SearchOptions
