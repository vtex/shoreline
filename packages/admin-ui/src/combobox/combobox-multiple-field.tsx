import React, { useRef } from 'react'
import { Combobox } from 'ariakit/combobox'
import { Composite, CompositeItem, useCompositeState } from 'ariakit/composite'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { IconXCircle } from '@vtex/phosphor-icons'

import { Inline } from '../inline'
import { Bleed } from '../bleed'
import { Flex } from '../components/Flex'
import { Button } from '../components/Button'
import { Box } from '../components/Box'
import { ComboboxMultipleTag } from './combobox-multiple-tag'
import { Label } from '../components/Label'

export type ComboboxMultipleFieldProps = {
  state: any
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
    ref: divRef,
    id,
    label,
    ...htmlProps
  } = props

  const composite = useCompositeState()

  const inputRef = useRef<HTMLInputElement>(null)
  const compositeRef = useRef<any>(null)

  const [focused, setFocused] = React.useState(false)
  const onFocus = () => setFocused(true)
  const onBlur = () => setFocused(false)

  const isInputEmpty = state.value.trim() !== ''
  const hasSelected = state.selected.length > 0
  const shouldReduceLabel = focused || hasSelected || isInputEmpty
  const shouldShowPlaceholder = focused || hasSelected

  const onInputKeyDown = (e: any) => {
    const isBackSpace = e.keyCode === 8

    if (state.value.length > 0) return
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
    if (state.selected.length === 1) {
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
    state?.setSelected((values: string[]) =>
      values.filter((currentValue) => currentValue !== value)
    )
  }

  return useElement('div', {
    ref: divRef as any,
    ...htmlProps,
    baseStyle: {
      width: 500,
      display: 'flex',
      cursor: 'text',
      position: 'relative',
      border: '$form.neutral',
      borderRadius: '$default',
      paddingY: '$l',
      paddingX: '$l',
      input: {
        border: 'none',
        outline: 'none',
        paddingY: shouldReduceLabel ? '$m' : 0,
      },
      ':hover': {
        border: '$form.neutralHover',
      },
      ':focus-within': {
        border: '$form.neutralFocus',
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
              position: 'absolute',
              text: '$body',
              transform: shouldReduceLabel
                ? 'translate(1px, 0px) scale(0.875)'
                : 'translate(0, 9px) scale(1)',

              // top: '8px',
              zIndex: 2,
              left: 12,
              color: '$secondary',

              // transform: 'translate(0, 9px) scale(1)',
              transformOrigin: 'top left',
              transition: 'all 0.2s ease-out;',
            }}
            htmlFor={id}
          >
            {label}
          </Label>
          <Bleed
            left="$m"
            csx={{
              paddingTop: '12px',
              bg: 'transparent',
            }}
          >
            <Composite ref={compositeRef} state={composite}>
              <Inline hSpace="$m" vSpace="$l">
                {state.selected.length > 0 &&
                  state.selected.map((itemString: string) => (
                    <CompositeItem
                      onKeyDown={(e) => onTagKeyDown(e, itemString)}
                      key={itemString}
                    >
                      {(cpiProps) => (
                        <ComboboxMultipleTag
                          {...cpiProps}
                          value={itemString}
                          onDismiss={() => {
                            state?.setSelected((v: string[]) =>
                              v.filter((vv) => vv !== itemString)
                            )
                          }}
                        />
                      )}
                    </CompositeItem>
                  ))}
                <Combobox
                  ref={inputRef}
                  state={state}
                  id={id}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  placeholder={shouldShowPlaceholder ? 'Keep typing ...' : ' '}
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
          {state.selected.length > 0 && (
            <Button
              size="small"
              variant="adaptative-dark"
              icon={<IconXCircle />}
              onClick={state.clearSelected}
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
