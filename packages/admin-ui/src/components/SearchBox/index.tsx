import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'
import React, { cloneElement, Fragment } from 'react'
import { useSystem } from '@vtex/admin-ui-react'
import { merge } from '@vtex/admin-ui-util'
import {
  IconSearch,
  IconCancel,
  IconHistory,
  IconContainer,
} from '@vtex/admin-ui-icons'
import type { Variants } from 'framer-motion'
import { motion, AnimateSharedLayout } from 'framer-motion'

import { Button } from '../Button'
import type { SystemComponent } from '../../types'
import { useStateContext, StateContext } from './context'
import styles from './styles'
import { Label } from '../Label'
import { VisuallyHidden } from '../VisuallyHidden'
import type { Locale } from './intl'
import { Intl, useLocale, LocaleProvider } from './intl'
import { Paragraph } from '../Paragraph'

export { unstableUseSearchBoxState } from './hooks/useSearchBoxState'

const itemMotion: Variants = {
  init: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
  },
  leave: {
    opacity: 0,
  },
}

interface SearchBoxProps {
  state: any
  children?: ReactNode
  locale?: Locale
}

function __SearchBox(props: SearchBoxProps) {
  const { children, state, locale = 'en-US' } = props
  const { cn } = useSystem()

  const labelProps = state.combobox.getLabelProps()

  return (
    <LocaleProvider value={locale}>
      <AnimateSharedLayout>
        <motion.div
          layout
          initial={{
            originY: 'unset',
          }}
          className={cn(styles.box)}
        >
          <VisuallyHidden>
            <label {...labelProps}>
              <Intl id="comboboxLabel" />
            </label>
          </VisuallyHidden>
          <StateContext.Provider value={state}>
            {children}
          </StateContext.Provider>
        </motion.div>
      </AnimateSharedLayout>
    </LocaleProvider>
  )
}

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  onClear?: () => void
}

function Input(props: InputProps) {
  const { onClear, onFocus, ...elementProps } = props
  const { cn } = useSystem()
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
    <motion.div {...comboboxProps} className={cn(styles.inputContainer)} layout>
      <IconSearch csx={styles.inputIcon} />
      <input
        {...inputProps}
        {...elementProps}
        placeholder={intl('placeholder')}
        onFocus={handleFocus}
        className={cn(styles.input(isOpen, type === 'seed'))}
      />
      {inputProps?.value !== '' && (
        <Button
          csx={styles.inputButton}
          variant="tertiary"
          icon={<IconCancel />}
          onClick={handleClear}
        />
      )}
    </motion.div>
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

  const { cn } = useSystem()

  const menuProps = getMenuProps()
  const seed = type === 'seed'
  const empty = items.length === 0
  const displayScrollBar = !seed && items.length > 10
  const displayEmptyView = !seed && empty && isOpen
  const displaySuggestions = !seed && !empty && isOpen
  const className = cn(merge(styles.menu(displayScrollBar), csx))

  return (
    <Label>
      {displaySuggestions && (
        <motion.p className={cn(styles.label)} layout>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Intl id={type === 'search' ? 'adminPages' : 'lastSearches'} />
          </motion.span>
        </motion.p>
      )}
      <motion.ul {...menuProps} {...elementProps} layout className={className}>
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
      </motion.ul>
    </Label>
  )
}

function EmptyView() {
  const { cn } = useSystem()

  return (
    <motion.li
      layout
      className={cn(styles.emptyContainer)}
      variants={itemMotion}
      initial="init"
      animate="enter"
      exit="leave"
    >
      <motion.p layout className={cn(styles.emptyTitle)}>
        <Intl id="emptyTitle" />
      </motion.p>
      <motion.p layout className={cn(styles.emptySubtitle)}>
        <Intl id="emptySubtitle" />
      </motion.p>
    </motion.li>
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

  const { cn } = useSystem()
  const className = cn(merge(styles.option(highlighted), csx))
  const liProps = getItemProps({ item, index })

  return (
    <motion.li
      {...liProps}
      {...elementProps}
      layout
      className={className}
      variants={itemMotion}
      initial="init"
      animate="enter"
      exit="leave"
    >
      <IconContainer space="regular">
        {type === 'storage' && (
          <IconHistory
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
    </motion.li>
  )
}

type KbdProps = ComponentPropsWithoutRef<'kbd'>

/**
 * Keyboard key component
 * @example
 * <Kbd>enter</Kbd>
 */
function Kbd(props: KbdProps) {
  const { cn } = useSystem()

  return <motion.kbd className={cn(styles.kbd)} {...(props as any)} layout />
}

/**
 * SearchBox footer
 * @example
 * <SearchBox>
 *  <SearchBox.Footer />
 * </SearchBox>
 */
function Footer() {
  const { cn } = useSystem()
  const {
    combobox: { isOpen },
    collection: { type },
  } = useStateContext()

  return type !== 'seed' && isOpen ? (
    <motion.footer
      layout
      variants={itemMotion}
      initial="init"
      animate="enter"
      transition={{
        enter: {
          delay: 0.38,
        },
        leave: {
          delay: 0.15,
        },
      }}
      exit="leave"
      className={cn(styles.footer)}
    >
      <motion.div layout>
        <Kbd>↓</Kbd> <Kbd>↑</Kbd> <Intl id="toNavigate" />
      </motion.div>
      <motion.div layout>
        <Kbd>enter</Kbd> <Intl id="toSelect" />
      </motion.div>
      <motion.div layout>
        <Kbd>esc</Kbd> <Intl id="toCancel" />
      </motion.div>
    </motion.footer>
  ) : null
}

export const unstableSearchBox = Object.assign(__SearchBox, {
  Input,
  Menu,
  Suggestion,
  Footer,
})
