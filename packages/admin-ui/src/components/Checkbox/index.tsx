import type { CheckboxProps as ReakitProps } from 'reakit/Checkbox'
import {
  Checkbox as ReakitCheckbox,
  CheckboxStateReturn,
  useCheckboxState,
} from 'reakit/Checkbox'
import type { StyleObject } from '@vtex/admin-ui-core'
import { focusVisible } from '@vtex/admin-ui-core'
import { jsx } from '@vtex/admin-ui-react'
import { get } from '@vtex/admin-ui-util'

const checkmark: StyleObject = {
  content: '""',
  display: 'block',
  boxSizing: 'border-box',
  position: 'absolute',
  left: '3px',
  top: '-1px',
  width: '6px',
  height: '10px',
  borderWidth: '0 2px 2px 0',
  borderStyle: 'solid',
  transformOrigin: 'bottom left',
  transform: 'rotate(45deg)',
}

export const Checkbox = jsx(ReakitCheckbox)(
  {
    ...focusVisible('neutral'),

    bg: 'control.neutral',
    borderColor: 'control.neutral',
    color: 'control.neutral',

    appearance: 'none',
    borderStyle: 'solid',
    borderWidth: '0.063rem',
    borderRadius: '0.188rem',
    cursor: 'pointer',
    display: 'flex',
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',

    ':disabled': {
      bg: 'control.neutralDisabled',
      borderColor: 'control.neutralDisabled',
      color: 'control.neutralDisabled',
    },

    ':hover': {
      bg: 'control.neutralHover',
      borderColor: 'control.neutralHover',
    },

    ':active': {
      bg: 'control.neutralPressed',
      borderColor: 'control.neutralPressed',
    },

    '> .haha': {
      stroke: 'azure',
      height: '200px',
    },

    ':checked': {
      bg: 'control.neutralChecked',
      color: 'control.neutralChecked',
      position: 'relative',

      '&:after': {
        ...checkmark,
        borderColor: (theme) => get(theme, 'foreground.control.neutralChecked'),
      },

      '&[disabled]:after': {
        ...checkmark,
        borderColor: (theme) =>
          get(theme, 'foreground.control.neutralCheckedDisabled'),
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
        bg: 'control.neutralCheckedDisabled',
        borderColor: 'control.neutralCheckedDisabled',
        color: 'control.neutralCheckedDisabled',
      },
    },

    ':indeterminate': {
      bg: 'control.neutralIndeterminate',
      borderColor: 'control.neutralIndeterminate',
      color: 'control.neutralIndeterminate',

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

      ':hover': {
        borderColor: 'control.neutralIndeterminateHover',
        bg: 'control.neutralIndeterminateHover',
      },

      ':active': {
        borderColor: 'control.neutralIndeterminatePressed',
        bg: 'control.neutralIndeterminatePressed',
      },

      ':disabled': {
        bg: 'control.neutralIndeterminateDisabled',
        borderColor: 'control.neutralIndeterminateDisabled',
        color: 'control.neutralIndeterminateDisabled',
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
