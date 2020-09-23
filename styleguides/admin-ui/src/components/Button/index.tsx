import React, { Ref, forwardRef } from 'react'
import { SxStyleProp } from 'theme-ui'

import { useFocusHollow } from '../../hooks'
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
      sx = {},
      icon,
      children,
      ...buttonProps
    } = props

    const { focusStyles, focusProps } = useFocusHollow()
    const { resolvedSize, containerStyles } = useMeasures({
      size,
      icon,
      iconPosition,
      children,
    })

    const renderIcon = () => {
      const iconProps = getIconProps(size)

      return icon?.(iconProps)
    }

    return (
      <StyledButton
        variant={`${variant}-${palette}-${resolvedSize}`}
        sx={{ ...focusStyles, ...sx }}
        ref={ref}
        {...buttonProps}
        {...focusProps}
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
          {renderIcon()}
          {children}
        </Box>
      </StyledButton>
    )
  }
)

function useMeasures({
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

function getIconProps(size: Size) {
  const styles = {
    size: {
      regular: 8,
      small: 7,
    },
    margin: 3,
  }

  return {
    size: styles.size[size],
    sx: {
      marginX: styles.margin,
    },
  }
}

export type Variant = 'filled' | 'outlined' | 'subtle'
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
  icon?: (props: { size: number; sx: SxStyleProp }) => JSX.Element
  /**
   * Position of the icon
   * @default start
   */
  iconPosition?: 'start' | 'end'
}
