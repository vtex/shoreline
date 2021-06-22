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
import { Box, Flex } from '@vtex/admin-primitives'
import { IconSearch, IconCancel } from '@vtex/admin-ui-icons'

import { Button } from '../Button'
import { SystemComponent } from '../../types'
import { useStateContext, StateContext } from './context'
import styles from './styles'
import { Label } from '../Label'
import { VisuallyHidden } from '../VisuallyHidden'
import { intl, Intl } from './intl'
import { Paragraph } from '../Paragraph'

interface SearchBoxProps extends ComponentPropsWithoutRef<'div'> {
  state: any
  label: string
}

const _SearchBox = forwardRef(function SearchBox(
  props: SearchBoxProps,
  ref: Ref<HTMLDivElement>
) {
  const { children, state, label, ...boxProps } = props

  const labelProps = state.combobox.getLabelProps()

  return (
    <Box {...boxProps} ref={ref} csx={styles.box}>
      <VisuallyHidden>
        <label {...labelProps}>{label}</label>
      </VisuallyHidden>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </Box>
  )
})

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  onClear?: () => void
}

function Input(props: InputProps) {
  const { onClear, onFocus, ...elementProps } = props
  const { cn } = useSystem()

  const {
    combobox: { getComboboxProps, getInputProps, openMenu, setInputValue },
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

    setInputValue('')
  }

  return (
    <Box {...comboboxProps} csx={styles.inputContainer}>
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
    combobox: { getMenuProps, highlightedIndex },
    collection: { value, label },
  } = useStateContext()
  const { cn } = useSystem()
  const className = cn(merge(styles.menu, csx))

  const menuProps = getMenuProps()
  const empty = value.length === 0

  return (
    <Label>
      <Paragraph csx={styles.label}>{label}</Paragraph>
      <ul {...menuProps} {...elementProps} className={className}>
        {value.map((item: any, index: number) => {
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
      </ul>
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

type SuggestionProps = SystemComponent & CloneProps

function Suggestion(props: SuggestionProps) {
  const { item, index, csx, highlighted, ...elementProps } = props

  const {
    combobox: { getItemProps },
    source: { render },
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
    <li {...liProps} {...elementProps} className={className}>
      {render(item)}
    </li>
  )
}

type KbdProps = ComponentPropsWithoutRef<'kbd'>

/**
 * Keyboard key component
 * @example
 * <Kbd>enter</Kbd>
 */
function Kbd(props: KbdProps) {
  return <Box element="kbd" csx={styles.kbd} {...props} />
}

/**
 * SearchBox footer
 * @example
 * <SearchBox>
 *  <SearchBox.Footer />
 * </SearchBox>
 */
function Footer() {
  return (
    <Flex justify="center" align="center" element="footer" csx={styles.footer}>
      <Box>
        <Kbd>↓</Kbd> <Kbd>↑</Kbd> <Intl id="toNavigate" />
      </Box>
      <Box>
        <Kbd>enter</Kbd> <Intl id="toSelect" />
      </Box>
      <Box>
        <Kbd>esc</Kbd> <Intl id="toCancel" />
      </Box>
    </Flex>
  )
}



export const unstableSearchBox = Object.assign(_SearchBox, {
  Input,
  Menu,
  Suggestion,
  Footer
})
