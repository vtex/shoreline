import type { RadioStateReturn } from 'reakit/Radio'
import { Radio as ReakitRadio } from 'reakit/Radio'
import { jsx } from '@vtex/admin-ui-react'
import { get } from '@vtex/admin-ui-util'
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

export const Radio = jsx(ReakitRadio)(
  {
    ...focusVisible(),
    bg: 'control.primary',
    borderColor: 'control.primary',
    color: 'control.primary',
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
      bg: (theme) => get(theme, 'foreground.control.primary', ''),
      opacity: 0,
      top: '0.3rem',
    },
    ':disabled': {
      cursor: 'not-allowed',
      bg: 'control.disabled',
      borderColor: 'control.disabled',
      color: 'control.disabled',
      ':after': {
        bg: (theme) => get(theme, 'foreground.control.disabled', ''),
      },
    },

    ':hover': {
      bg: 'control.primaryHover',
      borderColor: 'control.primaryHover',
    },

    ':active': {
      bg: 'control.primaryPressed',
      borderColor: 'control.primaryPressed',
    },

    ':checked': {
      bg: 'control.primaryChecked',
      color: 'control.primaryChecked',
      borderColor: 'control.primaryChecked',

      ':after': {
        opacity: 1,
      },

      ':hover': {
        bg: 'control.primaryCheckedHover',
        borderColor: 'control.primaryCheckedHover',
      },

      ':active': {
        bg: 'control.primaryCheckedPressed',
        borderColor: 'control.primaryCheckedPressed',
      },

      ':disabled': {
        cursor: 'not-allowed',

        bg: 'control.disabled',
        borderColor: 'control.disabled',
        color: 'control.disabled',

        ':after': {
          bg: (theme) => get(theme, 'foreground.control.disabled', ''),
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
