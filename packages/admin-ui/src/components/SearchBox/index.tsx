import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'
import React, { cloneElement, Fragment } from 'react'
import { IconContainer, tag } from '@vtex/admin-ui-react'
import { merge } from '@vtex/admin-ui-util'
import {
  IconMagnifyingGlass,
  IconXCircle,
  IconClockCounterClockwise,
} from '@vtex/phosphor-icons'
import { keyframes } from '@vtex/admin-ui-core'

import { Button } from '../../button'
import type { SystemComponent } from '../../types'
import { useStateContext, StateContext } from './context'
import * as style from './SearchBox.style'
import { Label } from '../Label'
import { VisuallyHidden } from '../VisuallyHidden'
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
      <tag.div csx={style.box}>
        <VisuallyHidden>
          <label {...labelProps}>
            <Intl id="comboboxLabel" />
          </label>
        </VisuallyHidden>
        <StateContext.Provider value={state}>{children}</StateContext.Provider>
      </tag.div>
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
    <tag.div {...comboboxProps} csx={style.inputContainer}>
      <IconMagnifyingGlass csx={style.inputIcon} />
      <tag.input
        {...inputProps}
        {...elementProps}
        placeholder={intl('placeholder')}
        onFocus={handleFocus}
        csx={style.input(isOpen, type === 'seed')}
      />
      {inputProps?.value !== '' && (
        <Button
          csx={style.inputButton}
          variant="neutralTertiary"
          icon={<IconXCircle />}
          onClick={handleClear}
        />
      )}
    </tag.div>
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
        <tag.p csx={style.label}>
          <tag.span>{type !== 'search' && <Intl id="lastSearches" />}</tag.span>
        </tag.p>
      )}
      <tag.ul
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
      </tag.ul>
    </Label>
  )
}

function EmptyView() {
  const fadeIn = keyframes({ '0%': { opacity: 0 }, '100%': { opacity: 1 } })

  return (
    <tag.li
      csx={{
        ...style.emptyContainer,
        animation: `${fadeIn} 0.3s`,
      }}
    >
      <tag.p csx={style.emptyTitle}>
        <Intl id="emptyTitle" />
      </tag.p>
      <tag.p csx={style.emptySubtitle}>
        <Intl id="emptySubtitle" />
      </tag.p>
    </tag.li>
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
    <tag.li
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
              marginTop: '2px',
            }}
          />
        )}
      </IconContainer>
      <Paragraph
        csx={{
          marginLeft: 2,
        }}
      >
        {children ? children(item) : item}
      </Paragraph>
    </tag.li>
  )
}

type KbdProps = ComponentPropsWithoutRef<'kbd'>

/**
 * Keyboard key component
 * @example
 * <Kbd>enter</Kbd>
 */
function Kbd(props: KbdProps) {
  return <tag.kbd csx={style.kbd} {...(props as any)} />
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
    <tag.footer csx={style.footer}>
      <tag.div>
        <Kbd>↓</Kbd> <Kbd>↑</Kbd> <Intl id="toNavigate" />
      </tag.div>
      <tag.div>
        <Kbd>enter</Kbd> <Intl id="toSelect" />
      </tag.div>
      <tag.div>
        <Kbd>esc</Kbd> <Intl id="toCancel" />
      </tag.div>
    </tag.footer>
  ) : null
}

export const unstableSearchBox = Object.assign(__SearchBox, {
  Input,
  Menu,
  Suggestion,
  Footer,
})
