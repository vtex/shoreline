/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'
import { ReactNode } from 'react'
import {
  Checkbox as ReakitCheckbox,
  CheckboxProps as ReakitProps,
  useCheckboxState,
} from 'reakit'
import { useFocusRing } from '@react-aria/focus'

import { Theme } from '../../theme'

export function Checkbox({ sx, label, ...reakitProps }: CheckboxProps) {
  const { focusStyles, focusProps } = useFocusHollow()

  return (
    <ReakitCheckbox
      {...focusProps}
      {...reakitProps}
      sx={{
        appearance: 'none',
        border: (theme) => `${theme.sizes[1]} solid ${theme.colors.muted[1]}`,
        borderRadius: 4,
        outline: 'none',
        cursor: 'pointer',
        width: 7,
        height: 7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'primary.contrast',
        '&:checked': {
          backgroundColor: 'primary.base',
          border: (theme) =>
            `${theme.sizes[1]} solid ${theme.colors.primary.base}`,
          ':after': {
            content: '"\u2713"',
            fontVariationSettings: "'wght' 600",
          },
          ':focus': {
            borderColor: 'primary.base',
          },
          '&:hover': {
            backgroundColor: 'primary.hover',
            borderColor: 'primary.hover',
          },
          '&:active': {
            backgroundColor: 'primary.active',
            borderColor: 'primary.active',
          },
        },
        '&:disabled': {
          backgroundColor: 'muted.3',
          borderColor: 'muted.1',
          color: 'muted.1',
        },
        '&:hover': {
          borderColor: 'text',
        },
        '&:active': {
          backgroundColor: 'primary.washed',
          borderColor: 'text',
        },
        '&:focus': {
          borderColor: 'text',
          ...focusStyles,
        },
      }}
    />
  )
}

function useFocusHollow() {
  const { isFocusVisible, focusProps } = useFocusRing()
  const focusStyles = isFocusVisible
    ? {
        boxShadow: (theme: Theme) =>
          `0rem 0rem 0rem ${theme.sizes[2]} ${theme.colors.focus}`,
      }
    : {}

  return { focusStyles, focusProps }
}

export interface CheckboxProps
  extends Pick<
    ReakitProps,
    | 'checked'
    | 'required'
    | 'disabled'
    | 'value'
    | 'name'
    | 'onChange'
    | 'state'
    | 'setState'
    | 'onClick'
  > {
  /** ThemeUI style prop */
  sx?: SxStyleProp
  /** Checkbox label */
  label?: ReactNode
}

export { useCheckboxState as useCheckbox }
