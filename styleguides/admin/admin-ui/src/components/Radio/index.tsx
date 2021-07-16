import { Radio as ReakitRadio, RadioStateReturn } from 'reakit/Radio'
import { jsx, ComponentProps } from '@vtex/onda-react'

export const Radio = jsx(ReakitRadio)(
  {
    appearance: 'none',
    margin: 0,
    position: 'relative',
    cursor: 'pointer',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'mid.secondary',
    backgroundColor: 'transparent',
    borderRadius: 'circle',
    ':after': {
      content: '""',
      display: 'block',
      borderRadius: 'circle',
      backgroundColor: 'light.primary',
      opacity: 0,
    },
    ':checked': {
      backgroundColor: 'blue',
      borderColor: 'blue',
      ':after': {
        opacity: 1,
      },
      ':hover': {
        backgroundColor: 'blue.hover',
        borderColor: 'blue.hover',
      },
      ':active': {
        borderColor: 'blue.pressed',
        backgroundColor: 'blue.pressed',
      },
    },
    ':disabled': {
      cursor: 'not-allowed',
      backgroundColor: 'mid.tertiary',
      borderColor: 'mid.primary',
      ':after': {
        backgroundColor: 'mid.primary',
      },
    },
    ':hover': {
      borderColor: 'dark.primary',
    },
    ':active': {
      borderColor: 'dark.secondary',
      backgroundColor: 'blue.secondary',
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

interface RadioOptions {
  state: RadioStateReturn
}

export type RadioProps = ComponentProps<typeof Radio>

export { useRadioState, RadioStateReturn } from 'reakit/Radio'
