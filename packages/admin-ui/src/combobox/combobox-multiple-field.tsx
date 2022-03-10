import React, { useRef } from 'react'
import type { ComboboxProps } from 'ariakit/combobox'
import { Combobox } from 'ariakit/combobox'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { Inline } from '../inline'
import { Bleed } from '../bleed'
import { ComboboxMultipleTag } from './combobox-multiple-tag'
import { Label } from '../components/Label'

export type ComboboxMultipleFieldProps = Omit<
  ComboboxProps,
  'state' | 'onChange'
> & {
  state: any
  label: string
  id: string
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
    ...comboboxProps
  } = props

  const ref = useRef<HTMLInputElement>(null)

  return useElement('div', {
    ref: divRef as any,
    baseStyle: {
      // height: '64px',
      display: 'flex',
      width: 500,
      position: 'relative',
      border: '$form.neutral',
      borderRadius: '$default',
      paddingY: '$l',
      paddingX: '$l',
      input: {
        border: 'none',
        outline: 'none',
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

      ref.current?.focus()
    },
    children: (
      <>
        <Label
          csx={{
            position: 'absolute',
            text: '$body',
            transform: 'translate(1px, 0px) scale(0.875)',

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
          <Inline hSpace="$m" vSpace="$l">
            {state.selected.length > 0 &&
              state.selected.map((itemString: string) => (
                <ComboboxMultipleTag
                  key={itemString}
                  value={itemString}
                  onDismiss={() => {
                    state?.setSelected((v: string[]) =>
                      v.filter((vv) => vv !== itemString)
                    )
                  }}
                />
              ))}
            <Combobox
              ref={ref}
              state={state}
              id={id}
              placeholder="Keep typing..."
              {...(comboboxProps as any)}
            />
          </Inline>
        </Bleed>
      </>
    ),
  })
})
