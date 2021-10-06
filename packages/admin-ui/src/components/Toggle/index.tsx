import type { CheckboxProps as ReakitProps } from 'reakit'
import { Checkbox as ReakitCheckbox } from 'reakit'
import { jsx } from '@vtex/admin-ui-react'
import { get } from '@vtex/admin-ui-util'

import type { CheckboxStateReturn } from '../Checkbox'
import { useCheckboxState } from '../Checkbox'
import type { ComponentPropsWithRef } from 'react'

function focusVisible() {
  return {
    ':focus:not([data-focus-visible-added])': {
      outline: 'none',
      boxShadow: 'none',
    },
    ':focus': {
      outline: 'none',
      boxShadow: 'focus',
    },
  }
}

export const Toggle = jsx(ReakitCheckbox)(
  {
    ...focusVisible,
    bg: (theme) => get(theme, 'borderColor.control.primary'),
    borderColor: 'control.primary',
    appearance: 'none',
    position: 'relative',
    cursor: 'pointer',
    margin: 0,
    borderRadius: '6.25rem',
    borderStyle: 'solid',
    borderWidth: 1,
    ':after': {
      bg: (theme) => get(theme, 'foreground.control.primary'),
      content: '""',
      display: 'block',
      position: 'absolute',
      borderRadius: '1.25rem',
      transition: 'transform .25s ease',
    },

    ':hover': {
      bg: (theme) => get(theme, 'borderColor.control.primaryHover'),
      borderColor: 'control.primaryHover',
    },

    ':active': {
      bg: (theme) => get(theme, 'borderColor.control.primaryPressed'),
      borderColor: 'control.primaryPressed',
    },

    '&:disabled': {
      bg: (theme) => get(theme, 'borderColor.control.disabled'),
      borderColor: 'control.disabled',
      '&:after': {
        bg: 'control.disabled',
      },
    },

    '&:checked': {
      bg: 'control.primaryChecked',
      color: 'control.primaryChecked',
      borderColor: 'control.primaryChecked',

      ':hover': {
        bg: 'control.primaryCheckedHover',
        borderColor: 'control.primaryCheckedHover',
        ':after': {
          borderColor: 'control.primaryCheckedHover',
        },
      },

      ':active': {
        bg: 'control.primaryCheckedPressed',
        borderColor: 'control.primaryCheckedPressed',

        ':after': {
          borderColor: 'control.primaryCheckedPressed',
        },
      },

      '&:disabled': {
        bg: 'control.disabled',
        borderColor: 'control.disabled',
        color: 'control.disabled',

        '&:after': {
          bg: (theme) => get(theme, 'foreground.control.disabled'),
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
