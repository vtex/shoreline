import React, { useRef } from 'react'
import { Combobox } from 'ariakit/combobox'
import { Composite, useCompositeState } from 'ariakit/composite'
import { createComponent, useElement, tag } from '@vtex/admin-ui-react'
import { IconXCircle } from '@vtex/phosphor-icons'

import { messages } from './combobox.i18n'
import { useMessageFormatter } from '../i18n'
import { Inline } from '../inline'
import { Bleed } from '../bleed'
import { Flex } from '../components/Flex'
import { Button } from '../button'
import { Box } from '../components/Box'
import { ComboboxMultipleTag } from './combobox-multiple-tag'
import { Label } from '../components/Label'

import * as style from './combobox.style'
import type { ComboboxMultipleState } from '.'

export type ComboboxMultipleFieldProps = {
  state: ComboboxMultipleState<any>
  label: string
  id: string
}

function pressedBackSpace<E extends { keyCode?: number }>(e: E) {
  return e.keyCode === 8
}

function pressedNumberOrLetter<E extends { keyCode: number }>(e: E) {
  const { keyCode } = e

  const isNumber = keyCode >= 48 && keyCode <= 57
  const isLetterUpperCase = keyCode >= 65 && keyCode <= 90
  const isLetterLowerCase = keyCode >= 97 && keyCode <= 122

  return isNumber || isLetterUpperCase || isLetterLowerCase
}

export const ComboboxMultipleField = createComponent<
  'div',
  ComboboxMultipleFieldProps
>((props) => {
  const {
    state,
    defaultValue,
    value,
    list,
    children,
    id,
    label,
    ...htmlProps
  } = props

  const {
    checkboxState,
    value: inputValue,
    selectedItems,
    unselect,
    clearSelected,
    getOptionValue,
    renderTag,
  } = state

  const { value: selectedValues } = checkboxState

  const composite = useCompositeState()
  const inputRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = React.useState(false)
  const formatMessage = useMessageFormatter(messages.fieldMultiple)

  const onFocus = () => setFocused(true)
  const onBlur = () => setFocused(false)

  const isInputEmpty = inputValue.trim() !== ''
  const hasSelected = selectedValues.length > 0
  const shouldReduceLabel = focused || hasSelected || isInputEmpty
  const shouldShowPlaceholder = focused || hasSelected

  const onInputKeyDown = (e: any) => {
    const isBackSpace = e.keyCode === 8

    if (inputValue.length > 0) return
    if (!isBackSpace) return

    inputRef?.current?.blur()
    composite.move(composite.last())
  }

  const onTagKeyDown = (e: any, value: string) => {
    if (pressedNumberOrLetter(e)) {
      inputRef.current?.focus()

      return
    }

    if (!pressedBackSpace(e)) return

    // if there is only one item left
    // we must clear focus on the input
    if (selectedValues.length === 1) {
      inputRef.current?.focus()
    } else {
      // focus on next: if the activeItem is the first
      // focus on previous: any other case
      composite.move(
        composite.activeId === composite.first()
          ? composite.next()
          : composite.previous()
      )
    }

    // remove the item from the selected[]
    unselect(value)
  }

  return useElement('div', {
    ...htmlProps,
    baseStyle: {
      ...style.fieldMultipleContainer,
      input: {
        border: 'none',
        outline: 'none',
        paddingY: shouldReduceLabel ? '$m' : 0,
      },
    },
    onClick: (e) => {
      e.preventDefault()
      e.stopPropagation()

      inputRef.current?.focus()
    },
    children: (
      <>
        <Box
          csx={{
            flex: 1,
          }}
        >
          <Label
            csx={{
              ...style.label,
              ...style.labelTransition({
                reduced: shouldReduceLabel,
              }),
            }}
            htmlFor={id}
          >
            {label}
          </Label>
          <Bleed
            left="$m"
            csx={{
              paddingTop: '0.75rem',
              bg: 'transparent',
            }}
          >
            <Composite state={composite}>
              <Inline hSpace="$m" vSpace="$l">
                {selectedItems.length > 0 &&
                  selectedItems.map((item: any) => (
                    <ComboboxMultipleTag
                      key={getOptionValue(item)}
                      value={renderTag(item)}
                      onKeyDown={(e) => onTagKeyDown(e, getOptionValue(item))}
                      onDismiss={() => {
                        unselect(getOptionValue(item))
                      }}
                    />
                  ))}
                <tag.input
                  as={Combobox as any}
                  ref={inputRef}
                  state={state}
                  id={id}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  placeholder={
                    shouldShowPlaceholder ? formatMessage('placeholder') : ' '
                  }
                  onKeyDown={onInputKeyDown}
                />
              </Inline>
            </Composite>
          </Bleed>
        </Box>
        <Flex
          align="flex-start"
          justify="flex-end"
          csx={{
            width: 48,
          }}
        >
          {selectedValues.length > 0 && (
            <Button
              variant="neutralTertiary"
              icon={<IconXCircle />}
              onClick={clearSelected}
              csx={{
                color: '$secondary',
              }}
            />
          )}
        </Flex>
      </>
    ),
  })
})
