import type { CheckboxProps as ReakitProps } from 'reakit/Checkbox'
import {
  Checkbox as ReakitCheckbox,
  CheckboxStateReturn,
  useCheckboxState,
} from 'reakit/Checkbox'
import { jsx } from '@vtex/admin-ui-react'

export const Checkbox = jsx(ReakitCheckbox)(
  {
    appearance: 'none',
    borderStyle: 'solid',
    borderWidth: '0.063rem',
    borderColor: 'mid.primary',
    borderRadius: '0.188rem',
    cursor: 'pointer',
    display: 'flex',
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    '&:checked': {
      backgroundColor: 'blue',
      borderColor: 'blue',
      '&:after': {
        content: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8' width='10' height='8' fill='none'><path d='M9 1L4 7L1 4' stroke='%23FFFFFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path></svg>")`,
      },
      '&[disabled]:after': {
        content: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8' width='10' height='8' fill='none'><path d='M9 1L4 7L1 4' stroke='%23898F9E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path></svg>")`,
      },
      '&:hover': {
        backgroundColor: 'blue.hover',
        borderColor: 'blue.hover',
      },
      '&:active': {
        backgroundColor: 'blue.pressed',
        borderColor: 'blue.pressed',
      },
    },
    '&:indeterminate': {
      backgroundColor: 'blue.secondary',
      borderColor: 'blue',
      color: 'blue',
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
      '&:disabled': {
        backgroundColor: 'mid.secondary',
        borderColor: 'mid.primary',
        color: 'mid.primary',
      },
      '&:hover': {
        borderColor: 'blue.hover',
        color: 'blue.hover',
        bg: 'blue.secondary.hover',
      },
      '&:active': {
        borderColor: 'blue.pressed',
        color: 'blue.pressed',
      },
    },
    '&:disabled': {
      backgroundColor: 'mid.secondary',
      borderColor: 'mid.primary',
      color: 'mid.primary',
    },
    '&:hover': {
      borderColor: 'dark.primary',
    },
    '&:active': {
      backgroundColor: 'blue.secondary',
      borderColor: 'dark.secondary',
    },
    ':focus:not([data-focus-visible-added])': {
      outline: 'none',
      boxShadow: 'none',
    },
    ':focus': {
      outline: 'none',
      boxShadow: 'focus',
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
