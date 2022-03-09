import React, { createContext, forwardRef, useContext, useEffect } from 'react'
import type { CheckboxProps, CheckboxState } from 'ariakit/checkbox'
import { Checkbox, CheckboxCheck, useCheckboxState } from 'ariakit/checkbox'
import type { ComboboxItemProps, ComboboxProps } from 'ariakit/combobox'
import {
  Combobox,
  ComboboxItem,
  ComboboxPopover,
  useComboboxState,
} from 'ariakit/combobox'
import { IconX } from '@vtex/phosphor-icons'

import {
  createComponent,
  useElement,
  tag,
  useSystem,
} from '@vtex/admin-ui-react'
import { Paragraph } from '../components/Paragraph'
import { Flex } from '../components/Flex'

import * as style from './combobox.style'

const CheckboxContext = createContext<CheckboxState<string[]> | null>(null)

interface TagProps {
  value: string
  onDismiss: () => void
}

const Tag = createComponent<'div', TagProps>((props) => {
  const { value, onDismiss, ...htmlProps } = props

  return useElement('div', {
    ...htmlProps,
    baseStyle: {
      bg: '#f4f4f4',
      text: '$body',
      padding: '$narrow.s',
      borderRadius: '$default',
    },
    children: (
      <Flex justify="space-between" align="center">
        <Paragraph>{value}</Paragraph>
        <tag.button
          onClick={onDismiss}
          csx={{
            padding: 'none',
            margin: 'none',
            bg: 'transparent',
          }}
        >
          <IconX
            csx={{
              size: 10,
              color: '$secondary',
            }}
          />
        </tag.button>
      </Flex>
    ),
  })
})

export type ComboboxMultipleProps = Omit<
  ComboboxProps,
  'state' | 'onChange'
> & {
  state: any
}

type Props = {
  list?: string[]
  defaultSelected?: string[]
}

export function useComboboxMultipleState(props: Props = {}) {
  const { defaultSelected, list } = props
  const combobox = useComboboxState({
    gutter: 4,
    // VoiceOver has issues with multi-selectable comboboxes where the DOM focus
    // is on the combobox input, so we set `virtualFocus` to `false` to disable
    // this behavior and put DOM focus on the items.
    virtualFocus: false,
    list,
  })

  const checkbox = useCheckboxState({
    defaultValue: defaultSelected,
  })

  // Reset the combobox value whenever an item is checked or unchecked.
  useEffect(() => {
    combobox.setValue('')
  }, [checkbox.value, combobox.setValue])

  return {
    selected: checkbox.value,
    setSelected: checkbox.setValue,
    ...combobox,
  }
}

export const ComboboxMultiple = createComponent<'div', ComboboxMultipleProps>(
  (props) => {
    const { state, defaultValue, value, list, children, ...comboboxProps } =
      props

    return useElement('div', {
      baseStyle: {
        display: 'flex',
      },
      children: (
        <>
          {state.selected.length > 0 && (
            <tag.div
              csx={{
                display: 'flex',
              }}
            >
              {state.selected.map((itemString: string) => (
                <Tag
                  key={itemString}
                  value={itemString}
                  onDismiss={() => {
                    state?.setSelected((v: string[]) =>
                      v.filter((vv) => vv !== itemString)
                    )
                  }}
                />
              ))}
            </tag.div>
          )}
          <tag.input
            as={Combobox as any}
            csx={{
              border: 'none',
              outline: 'none',
            }}
            state={state}
            {...(comboboxProps as any)}
          />
        </>
      ),
    })
  }
)

export function ComboboxMultiplePopover({ state }: any) {
  const { cn } = useSystem()

  return (
    <ComboboxPopover
      className={cn(style.popover)}
      state={state}
      aria-multiselectable
    >
      <CheckboxContext.Provider
        value={{
          value: state.selected,
          setValue: state.setSelected,
        }}
      >
        {state.matches.length ? (
          state.matches.map((value: string) => (
            <ComboboxMultipleItem key={value} value={value} />
          ))
        ) : (
          <div>No results found</div>
        )}
      </CheckboxContext.Provider>
    </ComboboxPopover>
  )
}

export type ComboboxMultipleItemProps = ComboboxItemProps & CheckboxProps<'div'>

export const ComboboxMultipleItem = forwardRef<
  HTMLDivElement,
  ComboboxMultipleItemProps
>(({ value, ...props }, ref) => {
  const checkbox = useContext(CheckboxContext)
  const { cn } = useSystem()

  if (!checkbox) return null

  return (
    <ComboboxItem
      ref={ref}
      // All selectable items must have the `aria-selected` attribute set to
      // `true` or `false`.
      aria-selected={!!value && checkbox?.value.includes(value)}
      className={cn(style.item)}
      {...props}
    >
      {(itemProps) => (
        <Checkbox
          {...itemProps}
          // Disable `checked` and `aria-checked` attributes so they don't
          // conflict with the `aria-selected` attribute.
          aria-checked={undefined}
          checked={undefined}
          as="div"
          state={checkbox}
          value={value}
          className={cn({
            ...style.item,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          })}
        >
          {value}
          <CheckboxCheck />
        </Checkbox>
      )}
    </ComboboxItem>
  )
})
