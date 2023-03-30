import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef, useRef } from 'react'
import { Combobox } from 'ariakit/combobox'
import { Composite, useCompositeState } from 'ariakit/composite'

import { IconXCircle } from '@vtex/phosphor-icons'

import { messages } from './messages'
import { useMessageFormatter } from '../i18n'
import { Inline } from '../inline'
import { Bleed } from '../bleed'
import { Flex } from '../flex'
import { Button } from '../button'
import { Box } from '../box'
import { ComboboxMultipleTag } from './combobox-multiple-tag'
import { Label } from '../label'

import type { ComboboxMultipleState } from '.'
import { csx, dataAttr, cx } from '@vtex/admin-ui-core'
import { fieldMultipleContainerTheme, multipleLabelTheme } from './combobox.css'

export interface ComboboxMultipleFieldProps
  extends ComponentPropsWithoutRef<'div'> {
  state: ComboboxMultipleState<any>
  label: string
  id: string
  value?: any
  list?: any
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

export const ComboboxMultipleField = forwardRef(
  (props: ComboboxMultipleFieldProps, ref: Ref<HTMLDivElement>) => {
    const {
      state,
      defaultValue,
      value,
      list,
      children,
      id,
      label,
      className = '',
      ...htmlProps
    } = props

    const {
      selectedItems,
      value: inputValue,
      unselect,
      clearSelected,
      getOptionValue,
      renderTag,
    } = state

    const composite = useCompositeState()
    const inputRef = useRef<HTMLInputElement>(null)
    const [focused, setFocused] = React.useState(false)
    const formatMessage = useMessageFormatter(messages.fieldMultiple)

    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    const isInputEmpty = inputValue.trim() !== ''
    const hasSelected = selectedItems.length > 0
    const shouldReduceLabel = focused || hasSelected || isInputEmpty
    const shouldShowPlaceholder = focused || hasSelected

    const onInputKeyDown = (e: any) => {
      const isBackSpace = e.keyCode === 8

      if (inputValue.length > 0) return
      if (!isBackSpace) return

      inputRef?.current?.blur()
      composite.move(composite.last())
    }

    const onTagKeyDown = (e: any, value: any) => {
      if (pressedNumberOrLetter(e)) {
        inputRef.current?.focus()

        return
      }

      if (!pressedBackSpace(e)) return

      // if there is only one item left
      // we must clear focus on the input
      if (selectedItems.length === 1) {
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

    return (
      <div
        ref={ref}
        className={cx(fieldMultipleContainerTheme, className)}
        data-reduce-label={shouldReduceLabel}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()

          inputRef.current?.focus()
        }}
        {...htmlProps}
      >
        <>
          <Box
            csx={{
              flex: 1,
            }}
          >
            <Label
              className={multipleLabelTheme}
              data-reduce-label={shouldReduceLabel}
              htmlFor={id}
            >
              {label}
            </Label>
            <Bleed
              left="$space-2"
              className={csx({
                paddingTop: '0.75rem',
                bg: 'transparent',
              })}
            >
              <Composite state={composite}>
                <Inline hSpace="$space-2" vSpace="$space-2">
                  {selectedItems.length > 0 &&
                    selectedItems.map((item: any) => (
                      <ComboboxMultipleTag
                        key={getOptionValue(item)}
                        value={renderTag(item)}
                        onKeyDown={(e) => onTagKeyDown(e, item)}
                        onDismiss={() => {
                          unselect(item)
                        }}
                      />
                    ))}
                  <Box
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
            className={csx({
              width: 48,
            })}
          >
            {selectedItems.length > 0 && (
              <Button
                variant="neutralTertiary"
                icon={<IconXCircle />}
                onClick={clearSelected}
                className={csx({
                  [dataAttr('variant', 'neutralTertiary')]: {
                    color: '$secondary',
                  },
                })}
              />
            )}
          </Flex>
        </>
      </div>
    )
  }
)
