import {
  Checkbox as ReakitCheckbox,
  CheckboxProps as ReakitProps,
} from 'reakit'
import { jsx, ComponentProps } from '@vtex/onda-react'
import { useCheckboxState, CheckboxStateReturn } from '../Checkbox'

export const Toggle = jsx(ReakitCheckbox)(
  {
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
              transform: 'translateX(16px)',
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
    appearance: 'none',
    position: 'relative',
    cursor: 'pointer',
    margin: 0,
    borderRadius: '6.25rem',
    backgroundColor: 'mid.primary',
    borderStyle: 'solid',
    borderColor: 'mid.primary',
    borderWidth: 1,
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      borderRadius: '1.25rem',
      backgroundColor: 'light.primary',
      transition: 'transform .25s ease',
    },
    '&:checked': {
      backgroundColor: 'green',
      borderColor: 'green',
      '&:hover': {
        backgroundColor: 'green.hover',
        borderColor: 'green.hover',
      },
      '&:disabled': {
        backgroundColor: 'mid.primary',
        borderColor: 'mid.primary',
        '&:after': {
          backgroundColor: 'mid.secondary',
        },
      },
    },
    '&:hover': {
      backgroundColor: 'dark.secondary',
      borderColor: 'dark.secondary',
    },
    '&:disabled': {
      backgroundColor: 'mid.primary',
      borderColor: 'mid.primary',
      '&:after': {
        backgroundColor: 'mid.secondary',
      },
    },
    ':not(:checked):active': {
      backgroundColor: 'dark.secondary',
      borderColor: 'dark.secondary',
      ':after': {
        backgroundColor: 'blue.secondary',
      },
    },
    ':focus:not([data-focus-visible-added])': {
      outline: 'none',
      boxShadow: 'none',
    },
    ':focus': {
      outline: 'none',
      boxShadow: 'focus',
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

export type ToggleProps = ComponentProps<typeof Toggle>

export type ToggleStateReturn = CheckboxStateReturn

export { useCheckboxState as useToggleState }
