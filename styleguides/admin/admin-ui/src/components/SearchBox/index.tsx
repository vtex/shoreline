import React, {
  cloneElement,
  ComponentPropsWithoutRef,
  forwardRef,
  Fragment,
  ReactElement,
  ReactNode,
  Ref,
} from 'react'
import { useSystem, merge } from '@vtex/admin-core'
import { IconSearch, IconCancel } from '@vtex/admin-ui-icons'
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion'

import { Button } from '../Button'
import { SystemComponent } from '../../types'
import { useStateContext, StateContext } from './context'
import styles from './styles'
import { Label } from '../Label'
import { VisuallyHidden } from '../VisuallyHidden'
import { intl, Intl } from './intl'

interface SearchBoxProps extends ComponentPropsWithoutRef<'div'> {
  state: any
}

const _SearchBox = forwardRef(function SearchBox(
  props: SearchBoxProps,
  ref: Ref<HTMLDivElement>
) {
  const { children, state, ...boxProps } = props
  const { cn } = useSystem()

  const labelProps = state.combobox.getLabelProps()

  return (
    <AnimateSharedLayout type="crossfade">
      <motion.div
        {...(boxProps as any)}
        ref={ref}
        layout
        className={cn(styles.box)}
      >
        <VisuallyHidden>
          <label {...labelProps}>
            <Intl id="comboboxLabel" />
          </label>
        </VisuallyHidden>
        <StateContext.Provider value={state}>{children}</StateContext.Provider>
      </motion.div>
    </AnimateSharedLayout>
  )
})

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  onClear?: () => void
}

function Input(props: InputProps) {
  const { onClear, onFocus, ...elementProps } = props
  const { cn } = useSystem()

  const {
    combobox: { getComboboxProps, getInputProps, openMenu, reset },
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
        className={cn(styles.input)}
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
    collection: { items, label },
  } = useStateContext()
  const { cn } = useSystem()
  const className = cn(merge(styles.menu, csx))

  const menuProps = getMenuProps()
  const empty = items.length === 0

  return (
    <Label>
      {isOpen && (
        <motion.p
       
          className={cn(styles.label)}
          layout
        >
          <motion.span initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}>{label}</motion.span>
        </motion.p>
      )}
      <motion.ul {...menuProps} {...elementProps} layout className={className}>
        <AnimatePresence>
          {isOpen &&
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
        </AnimatePresence>
      </motion.ul>
    </Label>
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
  render?: (item: any) => void
}

function Suggestion(props: SuggestionProps) {
  const { item, index, csx, highlighted, render, ...elementProps } = props

  const {
    combobox: { getItemProps },
  } = useStateContext()
  const { cn } = useSystem()
  const className = cn(
    merge(
      styles.option,
      {
        bg: highlighted ? 'sidebar.hover' : 'light.primary',
        color: highlighted ? 'blue' : 'dark.primary',
      },
      csx
    )
  )
  const liProps = getItemProps({ item, index })

  return (
    <motion.li
      {...liProps}
      {...elementProps}
      layout
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {render ? render(item) : item}
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
  return (
    <motion.footer layout className={cn(styles.footer)}>
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
  )
}

export const unstableSearchBox = Object.assign(_SearchBox, {
  Input,
  Menu,
  Suggestion,
  Footer,
})
