import type { CheckboxProps as ReakitProps } from 'reakit'
import { Checkbox as ReakitCheckbox } from 'reakit'
import { jsx } from '@vtex/admin-ui-react'
import { get } from '@vtex/admin-ui-util'
import { focusVisible } from '@vtex/admin-ui-core'

import type { CheckboxStateReturn } from '../Checkbox'
import { useCheckboxState } from '../Checkbox'
import type { ComponentPropsWithRef } from 'react'

export const Toggle = jsx(ReakitCheckbox)(
  {
    ...focusVisible('neutral'),
    bg: (theme) => get(theme, 'borderColor.control.neutral'),
    borderColor: 'control.neutral',
    appearance: 'none',
    position: 'relative',
    cursor: 'pointer',
    margin: 0,
    borderRadius: '6.25rem',
    borderStyle: 'solid',
    borderWidth: 1,

    ':after': {
      bg: (theme) => get(theme, 'foreground.control.neutral'),
      content: '""',
      display: 'block',
      position: 'absolute',
      borderRadius: '1.25rem',
      transition: 'transform .25s ease',
    },

    ':hover': {
      bg: (theme) => get(theme, 'borderColor.control.neutralHover'),
      borderColor: 'control.neutralHover',
    },

    ':active': {
      bg: (theme) => get(theme, 'borderColor.control.neutralPressed'),
      borderColor: 'control.neutralPressed',
    },

    ':disabled': {
      bg: 'control.neutralDisabled',
      borderColor: 'control.neutralDisabled',
      color: 'control.neutralDisabled',

      ':after': {
        bg: (theme) => get(theme, 'foreground.control.neutralDisabled'),
      },
    },

    '&:checked': {
      bg: 'control.neutralChecked',
      color: 'control.neutralChecked',
      borderColor: 'control.neutralChecked',

      ':hover': {
        bg: 'control.neutralCheckedHover',
        borderColor: 'control.neutralCheckedHover',
        ':after': {
          borderColor: 'control.neutralCheckedHover',
        },
      },

      ':active': {
        bg: 'control.neutralCheckedPressed',
        borderColor: 'control.neutralCheckedPressed',

        ':after': {
          borderColor: 'control.neutralCheckedPressed',
        },
      },

      ':disabled': {
        bg: 'control.neutralCheckedDisabled',
        borderColor: 'control.neutralCheckedDisabled',
        color: 'control.neutralCheckedDisabled',

        ':after': {
          bg: (theme) =>
            get(theme, 'foreground.control.neutralCheckedDisabled'),
        },
      },
    },

    variants: {
      size: {
        regular: {
          height: 20,
          width: 36,
          '&:after': {
            width: 18,
            height: 18,
          },
          '&:checked': {
            '&:after': {
              transform: 'translateX(1rem)',
            },
          },
        },
        small: {
          height: 16,
          width: 28,
          '&:after': {
            width: 14,
            height: 14,
          },
          '&:checked': {
            '&:after': {
              transform: 'translateX(12px)',
            },
          },
        },
      },
    },
  },
  {
    options: ['state'],
    useOptions: (options: ToggleOptions, props) => {
      const { state } = options

      return { role: 'switch', ...props, ...state }
    },
  }
)

Toggle.defaultProps = {
  size: 'regular',
}

type State = Pick<ReakitProps, 'state' | 'setState'>

export interface ToggleOptions {
  state?: State
}

export type ToggleProps = ComponentPropsWithRef<typeof Toggle> & ToggleOptions

export type ToggleStateReturn = CheckboxStateReturn

export { useCheckboxState as useToggleState }
