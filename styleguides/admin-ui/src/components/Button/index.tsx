import React, { Ref, forwardRef, ReactNode } from 'react'
import { SxStyleProp } from 'theme-ui'

import { Box } from '../Box'
import { StyledButton, StyledButtonProps } from './styled'

/**
 * Component that handles all Button variants of the DS.
 * It renders a button jsx element by default
 * @example
 * import { Button, ButtonProps } from 'admin-ui'
 * <Button>Default Button</Button>
 */
export const Button = forwardRef(
  (props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
    const {
      size = 'regular',
      variant = 'filled',
      palette = 'primary',
      iconPosition = 'start',
      icon,
      children,
      ...buttonProps
    } = props

    const { resolvedSize, containerStyles } = getSizeVariant({
      size,
      icon,
      iconPosition,
      children,
    })

    return (
      <StyledButton
        variant={`buttons.${variant}-${palette}-${resolvedSize}`}
        ref={ref}
        {...buttonProps}
      >
        <Box
          display="flex"
          h="full"
          w="full"
          m="auto"
          items="center"
          justify="center"
          sx={containerStyles}
        >
          {icon}
          {children}
        </Box>
      </StyledButton>
    )
  }
)

function getSizeVariant({
  size,
  icon,
  iconPosition,
  children,
}: Pick<ButtonProps, 'size' | 'icon' | 'iconPosition' | 'children'>) {
  const iconStart = !!icon && iconPosition === 'start'
  const iconEnd = !!icon && iconPosition === 'end'
  const iconOnly = !!icon && !children

  const containerStyles: SxStyleProp = {
    flexDirection: iconEnd ? 'row-reverse' : 'row',
  }

  const resolvedSize = `${size}${
    iconOnly ? `-icon` : iconStart || iconEnd ? `-icon-${iconPosition}` : ''
  }`

  return {
    resolvedSize,
    containerStyles,
  }
}

export type Variant = 'filled' | 'subtle' | 'text'
export type Size = 'small' | 'regular'
export type Palette = 'primary' | 'danger'
export interface ButtonProps
  extends Omit<StyledButtonProps, 'ref' | 'size' | 'variant'> {
  /** Size of the button
   * @default regular
   * */
  size?: Size
  /** Button variant
   * @default filled
   * */
  variant?: Variant
  /**
   * Button palette
   * @default primary
   */
  palette?: Palette
  /**
   * Icon of the button
   */
  icon?: ReactNode
  /**
   * Position of the icon
   * @default start
   */
  iconPosition?: 'start' | 'end'
}
