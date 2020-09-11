/** @jsx jsx */
import { jsx, Label, SxStyleProp } from 'theme-ui'
import { ReactNode } from 'react'
import {
  Radio as ReakitRadio,
  RadioStateReturn,
  RadioGroup as ReakitRadioGroup,
  RadioGroupProps as ReakitRadioGroupProps,
} from 'reakit/Radio'
import { get } from '@vtex-components/theme'

export interface RadioProps {
  label: ReactNode
  value: string
  state: RadioStateReturn
  disabled?: boolean
}

export function Radio(props: RadioProps) {
  const { label, state, ...baseProps } = props

  return (
    <Label sx={{ cursor: baseProps.disabled ? 'not-allowed' : 'pointer' }}>
      <ReakitRadio
        sx={{
          appearance: 'none',
          height: 7,
          width: 7,
          outline: 'none',
          display: 'inline-block',
          verticalAlign: 'top',
          position: 'relative',
          margin: (theme) => (label ? `0 ${get(theme, 'space.3')}` : 0),
          cursor: 'pointer',
          border: (theme) =>
            `${get(theme, 'sizes.1')} solid ${get(theme, 'colors.muted.2')}`,
          background: 'transparent',
          transition: 'background .3s, border-color .3s, box-shadow .2s',
          borderRadius: '50%',
          padding: '5px',
          ':after': {
            content: '""',
            display: 'block',
            width: 'full',
            height: 'full',
            borderRadius: '50%',
            background: 'white',
            opacity: 0,
          },
          ':checked': {
            background: (theme) => get(theme, 'colors.primary.base'),
            border: (theme) =>
              `${get(theme, 'sizes.1')} solid ${get(
                theme,
                'colors.primary.base'
              )}`,
          },
          ':checked::after': {
            opacity: 1,
          },
          ':disabled': {
            cursor: 'not-allowed',
            background: (theme) => get(theme, 'colors.muted.3'),
            border: (theme) =>
              `${get(theme, 'sizes.1')} solid ${get(theme, 'colors.muted.2')}`,
          },
          ':disabled::after': {
            background: (theme) => get(theme, 'colors.muted.2'),
          },
          ':focus': {
            boxShadow: (theme) =>
              `0px 0px 0px ${get(theme, 'space.2')} ${get(
                theme,
                'colors.focus'
              )}`,
          },
        }}
        {...state}
        {...baseProps}
      />{' '}
      {label}
    </Label>
  )
}

export interface RadioGroupProps
  extends Omit<ReakitRadioGroupProps, 'aria-label'> {
  label: string
  sx?: SxStyleProp
}

export function RadioGroup(props: RadioGroupProps) {
  const { label, sx = {}, ...baseProps } = props

  return <ReakitRadioGroup {...baseProps} sx={sx} aria-label={label} />
}

export { useRadioState } from 'reakit/Radio'
