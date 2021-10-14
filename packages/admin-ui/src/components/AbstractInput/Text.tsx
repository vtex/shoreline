import type { ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import type { InputProps as ReakitInputProps } from 'reakit'
import { Input as ReakitInput } from 'reakit'
import { IconCancel, IconContainer } from '@vtex/admin-ui-icons'
import { useSystem } from '@vtex/admin-ui-core'
import { Box } from '../Box'

import { ButtonGhost } from '../ButtonGhost'
import type { SystemComponentProps } from '../../types'

export const AbstractInput = forwardRef(function AbstractInput(
  props: AbstractInputProps,
  ref: Ref<HTMLInputElement>
) {
  const {
    value,
    csx = {},
    tone = 'neutral',
    icon,
    suffix,
    onClear,
    labelElement,
    buttonElements,
    ...inputProps
  } = props

  const { cn } = useSystem()

  const showClear = !!onClear && String(value).toString().length > 0
  const showButtons = !!suffix || !!buttonElements || onClear
  const critical = tone === 'critical'

  const inputClassName = cn({
    fontFamily: 'sans',
    fontSettings: 'regular',
    width: 'full',
    height: 48,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingLeft: 3,
    paddingRight: 4,
    bg: critical ? 'field.critical' : 'field.neutral',
    borderColor: critical ? 'field.critical' : 'field.neutral',
    borderRadius: 'default',
    marginY: 1,
    fontSize: 1,
    color: 'base',
    outline: 0,
    transition: 'snap',
    ':hover': {
      bg: critical ? 'field.criticalHover' : 'field.neutralHover',
      borderColor: critical ? 'field.criticalHover' : 'field.neutralHover',
    },
    ':focus': {
      bg: critical ? 'field.criticalFocus' : 'field.neutralFocus',
      borderColor: critical ? 'field.criticalFocus' : 'field.neutralFocus',
      boxShadow: critical ? 'ring.critical' : 'ring.neutral',
    },
    ':disabled': {
      bg: critical ? 'field.criticalDisabled' : 'field.neutralDisabled',
      color: critical ? 'field.criticalDisabled' : 'field.neutralDisabled',
    },
    ...spacing({
      icon: !!icon,
      suffix: !!suffix,
      clear: !!onClear,
    }),

    ...csx,
  })

  return (
    <Box
      csx={{
        position: 'relative',
        ...(icon
          ? {
              label: {
                left: '44px',
              },
            }
          : {}),
      }}
    >
      {icon && (
        <IconContainer
          space="regular"
          csx={{
            color: 'muted',
            top: 1,
            left: 0,
            marginX: 3,
            marginTop: '14px',
            position: 'absolute',
            height: 20,
            width: 20,
            minWidth: 20,
            minHeight: 20,
          }}
        >
          {icon}
        </IconContainer>
      )}
      <ReakitInput
        value={value}
        ref={ref}
        className={inputClassName}
        {...inputProps}
      />
      {labelElement}
      {showButtons && (
        <Box
          csx={{
            right: 0,
            top: 1,
            height: 46,
            paddingRight: 3,
            position: 'absolute',
            display: 'flex',
            color: 'base',
          }}
        >
          {showClear && (
            <ButtonGhost
              icon={<IconCancel />}
              aria-label={`clear ${inputProps.id} text`}
              onClick={onClear}
              size="small"
              csx={{
                marginTop: 2,
                marginRight: 1,
              }}
            />
          )}
          {buttonElements}
          {suffix && (
            <Box
              as="span"
              csx={{
                color: 'field.neutral',
                borderLeftStyle: 'solid',
                borderLeftWidth: '1px',
                borderLeftColor: 'field.neutral',
                paddingTop: '14px',
                marginTop: 'px',
                width: '32px',
                paddingLeft: 3,
                lineHeight: 'body',
                fontSettings: 'regular',
                fontSize: 1,
              }}
            >
              {suffix}
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
})

function spacing(options: spacingOptions) {
  const { icon, suffix, clear } = options

  // only icon
  if (icon && !suffix && !clear) {
    return {
      paddingLeft: '44px',
    }
  }

  // only suffix
  if (!icon && suffix && !clear) {
    return {
      paddingRight: '64px',
    }
  }

  // only clear
  if (!icon && !suffix && clear) {
    return {
      paddingRight: '44px',
    }
  }

  // icon and clear
  if (icon && !suffix && clear) {
    return {
      paddingLeft: '44px',
      paddingRight: '44px',
    }
  }

  // icon and suffix
  if (icon && suffix && !clear) {
    return {
      paddingLeft: '44px',
      paddingRight: '64px',
    }
  }

  // suffix and clear
  if (!icon && suffix && clear) {
    return {
      paddingRight: '75px',
    }
  }

  // all of them
  if (icon && suffix && clear) {
    return {
      paddingLeft: '44px',
      paddingRight: '75px',
    }
  }

  return {}
}

interface spacingOptions {
  icon: boolean
  suffix: boolean
  clear: boolean
}

export type AbstractInputOwnProps = Omit<
  ReakitInputProps,
  'ref' | 'as' | 'onChange'
>

export interface AbstractInputProps
  extends SystemComponentProps<AbstractInputOwnProps> {
  /** Input Icon */
  icon?: ReactNode
  /** Input Suffix */
  suffix?: string
  /** onClear input */
  onClear?: () => void
  /** Render an optional label */
  labelElement?: ReactNode
  /** Button elements */
  buttonElements?: ReactNode
  /** onChange event */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  /** Tone of voice @default neutral */
  tone?: 'neutral' | 'critical'
}
