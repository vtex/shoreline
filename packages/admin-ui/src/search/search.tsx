import React from 'react'
import { createComponent, useElement, tag } from '@vtex/admin-ui-react'
import { IconMagnifyingGlass, IconXCircle } from '@vtex/phosphor-icons'

import * as styles from './search.style'
import { Center } from '../center'
import { Button } from '../button'
import { SearchFormState } from './hooks/useSearchState'
import { Spinner } from '../components/Spinner'
import { VisuallyHidden } from '../components/VisuallyHidden'
import { useMessageFormatter } from '../i18n'
import { messages } from './search.i18n'

const iconByName = {
  search: <IconMagnifyingGlass size="small" csx={styles.icon} />,
  spinner: <Spinner size={16} csx={styles.icon} />,
}

export const Search = createComponent<'form', SearchOptions>((props) => {
  const formatMessage = useMessageFormatter(messages)

  const label = formatMessage('search')

  const {
    state,
    role = 'search',
    'aria-label': ariaLabel = label,
    disabled = false,
    ...formProps
  } = props

  const iconName = state.loading ? 'spinner' : 'search'
  const icon = iconByName[iconName]

  const hasClearButton = state.showClear && !disabled

  return useElement('form', {
    ...formProps,
    role,
    onSubmit: state.onSubmit,
    baseStyle: styles.form,
    children: (
      <>
        <Center csx={styles.innerContainer('start')}>{icon}</Center>
        <tag.input
          csx={styles.input}
          placeholder={label}
          aria-label={ariaLabel}
          disabled={disabled}
          value={state.value}
          onChange={(e) => state.setValue(e.target.value)}
        />
        {hasClearButton ? (
          <Center csx={styles.innerContainer('end')}>
            <Button
              aria-label={formatMessage('clearButton')}
              icon={<IconXCircle />}
              variant="neutralTertiary"
              csx={styles.clearButton}
              onClick={state.clear}
            />
          </Center>
        ) : null}
        <VisuallyHidden>
          <button type="submit" tabIndex={-1}>
            {label}
          </button>
        </VisuallyHidden>
      </>
    ),
  })
})

export interface SearchOptions {
  state: SearchFormState
  disabled?: boolean
}

export type SearchProps = React.ComponentPropsWithRef<typeof Search>
