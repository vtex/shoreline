import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'
import React, { cloneElement, Fragment } from 'react'
import { IconContainer } from '@vtex/admin-ui-react'
import { merge } from '@vtex/admin-ui-util'
import {
  IconMagnifyingGlass,
  IconXCircle,
  IconClockCounterClockwise,
} from '@vtex/phosphor-icons'
import { keyframes } from '@vtex/admin-ui-core'

import { Box } from '../../box'
import { Button } from '../../button'
import type { SystemComponent } from '../../types'
import { useStateContext, StateContext } from './context'
import * as style from './SearchBox.style'
import { Label } from '../../label'
import { VisuallyHidden } from '../../visually-hidden'
import type { Locale } from './intl'
import { Intl, useLocale, LocaleProvider } from './intl'
import { Paragraph } from '../Paragraph'

export { unstableUseSearchBoxState } from './hooks/useSearchBoxState'

interface SearchBoxProps {
  state: any
  children?: ReactNode
  locale?: Locale
}

function __SearchBox(props: SearchBoxProps) {
  const { children, state, locale = 'en-US' } = props

  const labelProps = state.combobox.getLabelProps()

  return (
    <LocaleProvider value={locale}>
      <Box csx={style.box}>
        <VisuallyHidden>
          <label {...labelProps}>
            <Intl id="comboboxLabel" />
          </label>
        </VisuallyHidden>
        <StateContext.Provider value={state}>{children}</StateContext.Provider>
      </Box>
    </LocaleProvider>
  )
}

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  onClear?: () => void
}

function Input(props: InputProps) {
  const { onClear, onFocus, ...elementProps } = props
  const { intl } = useLocale()

  const {
    combobox: { getComboboxProps, getInputProps, openMenu, reset, isOpen },
    collection: { type },
  } = useStateContext()

  const comboboxProps = getComboboxProps()
  const inputProps = getInputProps()

  const handleFocus = (e: any) => {
    if (onFocus) {
      onFocus(e)
    }

    openMenu()
  }

  const handleClear = () => {
    if (onClear) {
      onClear()
    }

    reset()
  }

  return (
    <Box {...comboboxProps} csx={style.inputContainer}>
      <IconMagnifyingGlass csx={style.inputIcon} />
      <Box
        as="input"
        {...inputProps}
        {...elementProps}
        placeholder={intl('placeholder')}
        onFocus={handleFocus}
        csx={style.input(isOpen, type === 'seed')}
      />
      {inputProps?.value !== '' && (
        <Button
          className={style.inputButtonTheme}
          variant="neutralTertiary"
          icon={<IconXCircle />}
          onClick={handleClear}
        />
      )}
    </Box>
  )
}

interface MenuProps extends SystemComponent {
  emptyView?: ReactNode
  children?: ReactElement
}

function Menu(props: MenuProps) {
  const { children, emptyView = null, csx, ...elementProps } = props

  const {
    combobox: { getMenuProps, highlightedIndex, isOpen },
    collection: { items, type },
  } = useStateContext()

  const menuProps = getMenuProps()
  const seed = type === 'seed'
  const empty = items.length === 0
  const displayScrollBar = !seed && items.length > 10
  const displayEmptyView = !seed && empty && isOpen
  const displaySuggestions = !seed && !empty && isOpen

  return (
    <Label>
      {displaySuggestions && (
        <Box as="p" csx={style.label}>
          <Box as="span">{type !== 'search' && <Intl id="lastSearches" />}</Box>
        </Box>
      )}
      <Box
        as="ul"
        {...menuProps}
        {...elementProps}
        csx={merge(style.menu(displayScrollBar), csx)}
      >
        {displayEmptyView && <EmptyView />}
        {displaySuggestions &&
          items.map((item: any, index: number) => {
            const highlighted = highlightedIndex === index

            return (
              <Fragment key={index}>
                {cloneElement(children as any, {
                  item,
                  index,
                  highlighted,
                })}
              </Fragment>
            )
          })}
      </Box>
    </Label>
  )
}

function EmptyView() {
  const fadeIn = keyframes({ '0%': { opacity: 0 }, '100%': { opacity: 1 } })

  return (
    <Box
      as="li"
      csx={{
        ...style.emptyContainer,
        animation: `${fadeIn} 0.3s`,
      }}
    >
      <Box as="p" csx={style.emptyTitle}>
        <Intl id="emptyTitle" />
      </Box>
      <Box as="p" csx={style.emptySubtitle}>
        <Intl id="emptySubtitle" />
      </Box>
    </Box>
  )
}

interface CloneProps {
  /** @internal */
  item?: any
  /** @internal */
  index?: number
  /** @internal */
  highlighted?: boolean
}

interface SuggestionProps extends SystemComponent, CloneProps {
  children?: (item: any) => ReactNode
}

function Suggestion(props: SuggestionProps) {
  const {
    item,
    index,
    csx,
    highlighted = false,
    children,
    ...elementProps
  } = props

  const {
    combobox: { getItemProps },
    collection: { type },
  } = useStateContext()

  const liProps = getItemProps({ item, index })

  const fadeIn = keyframes({ '0%': { opacity: 0 }, '100%': { opacity: 1 } })

  return (
    <Box
      as="li"
      {...liProps}
      {...elementProps}
      csx={{
        animation: `${fadeIn} 0.3s`,
        ...merge(style.option(highlighted), csx),
      }}
    >
      <IconContainer size="regular">
        {type === 'storage' && (
          <IconClockCounterClockwise
            csx={{
              marginTop: '$space-05',
            }}
          />
        )}
      </IconContainer>
      <Paragraph
        csx={{
          marginLeft: '$space-2',
        }}
      >
        {children ? children(item) : item}
      </Paragraph>
    </Box>
  )
}

type KbdProps = ComponentPropsWithoutRef<'kbd'>

/**
 * Keyboard key component
 * @example
 * <Kbd>enter</Kbd>
 */
function Kbd(props: KbdProps) {
  return <Box as="kbd" csx={style.kbd} {...(props as any)} />
}

/**
 * SearchBox footer
 * @example
 * <SearchBox>
 *  <SearchBox.Footer />
 * </SearchBox>
 */
function Footer() {
  const {
    combobox: { isOpen },
    collection: { type },
  } = useStateContext()

  return type !== 'seed' && isOpen ? (
    <Box as="footer" csx={style.footer}>
      <Box>
        <Kbd>↓</Kbd> <Kbd>↑</Kbd> <Intl id="toNavigate" />
      </Box>
      <Box>
        <Kbd>enter</Kbd> <Intl id="toSelect" />
      </Box>
      <Box>
        <Kbd>esc</Kbd> <Intl id="toCancel" />
      </Box>
    </Box>
  ) : null
}

export const unstableSearchBox = Object.assign(__SearchBox, {
  Input,
  Menu,
  Suggestion,
  Footer,
})
