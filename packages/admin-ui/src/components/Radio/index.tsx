import type { RadioStateReturn } from 'reakit/Radio'
import { Radio as ReakitRadio } from 'reakit/Radio'
import { focusVisible } from '@vtex/admin-ui-core'
import { jsx } from '@vtex/admin-ui-react'
import { get } from '@vtex/admin-ui-util'
import type { ComponentPropsWithRef } from 'react'

export const Radio = jsx(ReakitRadio)(
  {
    ...focusVisible('neutral'),
    bg: 'control.neutral',
    borderColor: 'control.neutral',
    color: 'control.neutral',
    appearance: 'none',
    margin: 0,
    position: 'relative',
    cursor: 'pointer',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: 'circle',
    ':after': {
      content: '""',
      position: 'absolute',
      display: 'block',
      borderRadius: 'circle',
      bg: (theme) => get(theme, 'foreground.control.neutral', ''),
      opacity: 0,
      top: '0.3rem',
    },
    ':disabled': {
      cursor: 'not-allowed',
      bg: 'control.neutralDisabled',
      borderColor: 'control.neutralDisabled',
      color: 'control.neutralDisabled',
      ':after': {
        bg: (theme) => get(theme, 'foreground.control.neutralDisabled', ''),
      },
    },

    ':hover': {
      bg: 'control.neutralHover',
      borderColor: 'control.neutralHover',
    },

    ':active': {
      bg: 'control.neutralPressed',
      borderColor: 'control.neutralPressed',
    },

    ':checked': {
      bg: 'control.neutralChecked',
      color: 'control.neutralChecked',
      borderColor: 'control.neutralChecked',

      ':after': {
        opacity: 1,
      },

      ':hover': {
        bg: 'control.neutralCheckedHover',
        borderColor: 'control.neutralCheckedHover',
      },

      ':active': {
        bg: 'control.neutralCheckedPressed',
        borderColor: 'control.neutralCheckedPressed',
      },

      ':disabled': {
        cursor: 'not-allowed',

        bg: 'control.neutralCheckedDisabled',
        borderColor: 'control.neutralCheckedDisabled',
        color: 'control.neutralCheckedDisabled',

        ':after': {
          bg: (theme) =>
            get(theme, 'foreground.control.neutralCheckedDisabled', ''),
        },
      },
    },

    variants: {
      size: {
        regular: {
          size: '1.25rem',
          padding: '0.3rem',
          ':after': {
            size: '0.5rem',
          },
        },
        small: {
          size: '1rem',
          padding: 1,
          ':after': {
            size: '0.375rem',
          },
        },
      },
    },
  },
  {
    options: ['state'],
    useOptions: (options: RadioOptions, props) => {
      const { state } = options

      return { ...props, ...state }
    },
  }
)

Radio.defaultProps = {
  size: 'regular',
}

export interface RadioOptions {
  state: RadioStateReturn
}

export type RadioProps = ComponentPropsWithRef<typeof Radio> & RadioOptions

export { useRadioState, RadioStateReturn } from 'reakit/Radio'
