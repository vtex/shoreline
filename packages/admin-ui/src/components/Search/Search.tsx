import type { ComponentPropsWithRef } from 'react'
import React, { Fragment } from 'react'
import { jsx } from '@vtex/admin-ui-react'
import { IconSearch, IconCancel } from '@vtex/admin-ui-icons'

import type { SearchFormState } from './hooks/useSearchState'
import { AbstractInput } from '../AbstractInput'
import { Button } from '../Button'
import { VisuallyHidden } from '../VisuallyHidden'
import { Label } from '../Label'
import { Spinner } from '../Spinner'

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
export const Search = jsx('form')(
  {
    position: 'relative',
    marginX: '1px',
  },
  {
    options: ['state'],
    useOptions(options: SearchOptions, props) {
      const { state } = options
      const { id, placeholder, 'aria-label': label = '', ...formProps } = props

      return {
        ...formProps,
        onSubmit: state.onSubmit,
        'aria-label': `${label} Form`,
        role: 'search',
        children: (
          <Fragment>
            <VisuallyHidden>
              <Label htmlFor={id}>{label} Input</Label>
            </VisuallyHidden>
            <AbstractInput
              placeholder={placeholder}
              id={id}
              value={state.value}
              icon={
                state.loading ? (
                  <Spinner
                    size={20}
                    csx={{
                      top: 0,
                      position: 'absolute',
                      margin: '0.625rem 0.25rem 0 0.5rem',
                    }}
                  />
                ) : (
                  <IconSearch
                    csx={{
                      color: 'base',
                      margin: '0.625rem 0.25rem 0 0.5rem',
                      top: 0,
                    }}
                  />
                )
              }
              csx={{
                height: '2.5rem',
                paddingY: '0.4375rem',
                paddingLeft: '2rem',
                paddingRight: '2.5rem',
                margin: 0,
              }}
              onChange={(e) => state.setValue(e.target.value)}
              buttonElements={
                state.showClear ? (
                  <Button
                    icon={<IconCancel />}
                    onClick={state.clear}
                    size="small"
                    variant="adaptative-dark"
                    csx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      marginRight: '0.375rem',
                    }}
                  />
                ) : undefined
              }
            />
            <VisuallyHidden>
              <button type="submit">Search</button>
            </VisuallyHidden>
          </Fragment>
        ),
      }
    },
  }
)

export interface SearchOptions {
  state: SearchFormState
}

export type SearchProps = ComponentPropsWithRef<typeof Search> & SearchOptions
