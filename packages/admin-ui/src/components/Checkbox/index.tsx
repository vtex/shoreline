import type { CheckboxProps as ReakitProps } from 'reakit/Checkbox'
import {
  Checkbox as ReakitCheckbox,
  CheckboxStateReturn,
  useCheckboxState,
} from 'reakit/Checkbox'
import { jsx } from '@vtex/admin-ui-react'
import { get } from '@vtex/admin-ui-util'

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

export const Checkbox = jsx(ReakitCheckbox)(
  {
    ...focusVisible(),

    bg: 'control.primary',
    borderColor: 'control.primary',
    color: 'control.primary',

    appearance: 'none',
    borderStyle: 'solid',
    borderWidth: '0.063rem',
    borderRadius: '0.188rem',
    cursor: 'pointer',
    display: 'flex',
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',

    '&:disabled': {
      bg: 'control.disabled',
      borderColor: 'control.disabled',
      color: 'control.disabled',
    },

    '&:hover': {
      bg: 'control.primaryHover',
      borderColor: 'control.primaryHover',
    },

    '&:active': {
      bg: 'control.primaryPressed',
      borderColor: 'control.primaryPressed',
    },

    '&:checked': {
      bg: 'control.primaryChecked',
      color: 'control.primaryChecked',
      borderColor: 'control.primaryChecked',

      '&:after': {
        content: (theme) =>
          `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8' width='10' height='8' fill='none'><path d='M9 1L4 7L1 4' stroke='${String(
            get(theme, 'foreground.control.primaryChecked', '')
          ).replace(
            /#/i,
            '%23'
          )}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path></svg>")`,
      },

      '&[disabled]:after': {
        content: (theme) =>
          `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8' width='10' height='8' fill='none'><path d='M9 1L4 7L1 4' stroke='${String(
            get(theme, 'foreground.control.disabled', '')
          ).replace(
            /#/i,
            '%23'
          )}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path></svg>")`,
      },

      '&:hover': {
        bg: 'control.primaryCheckedHover',
        borderColor: 'control.primaryCheckedHover',
      },

      '&:active': {
        bg: 'control.primaryCheckedPressed',
        borderColor: 'control.primaryCheckedPressed',
      },

      '&:disabled': {
        bg: 'control.disabled',
        borderColor: 'control.disabled',
        color: 'control.disabled',
      },
    },

    '&:indeterminate': {
      bg: 'control.primaryIndeterminate',
      borderColor: 'control.primaryIndeterminate',
      color: 'control.primaryIndeterminate',

      '&:after': {
        content: '""',
        width: '0.5rem',
        height: 0,
        borderWidth: '0.063rem',
        borderStyle: 'solid',
        borderLeft: 0,
        borderRight: 0,
        borderRadius: '0.188rem',
        borderColor: 'currentColor',
      },

      '&:hover': {
        borderColor: 'control.primaryIndeterminateHover',
        bg: 'control.primaryIndeterminateHover',
      },

      '&:active': {
        borderColor: 'control.primaryIndeterminatePressed',
        bg: 'control.primaryIndeterminatePressed',
      },

      '&:disabled': {
        bg: 'control.disabled',
        borderColor: 'control.disabled',
        color: 'control.disabled',
      },
    },
    variants: {
      size: {
        regular: {
          size: '1.25rem',
          minWidth: '1.25rem',
          minHeight: '1.25rem',
        },
        small: {
          size: '1rem',
          minWidth: '1rem',
          minHeight: '1rem',
        },
      },
    },
  },
  {
    options: ['state'],
    useOptions: (options: CheckboxOptions, props) => {
      const { state } = options

      return { ...props, ...state }
    },
  }
)

Checkbox.defaultProps = {
  size: 'regular',
}

type State = Pick<ReakitProps, 'state' | 'setState'>

export interface CheckboxOptions {
  state?: State
}

export type CheckboxProps = React.ComponentPropsWithRef<typeof Checkbox> &
  CheckboxOptions

export { useCheckboxState }
export { CheckboxStateReturn }
