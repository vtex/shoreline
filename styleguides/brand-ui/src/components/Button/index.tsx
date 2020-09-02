import React, { Ref } from 'react'
import { SxStyleProp, Flex } from 'theme-ui'
import BaseButton, { ButtonProps as BaseProps } from '@vtex-components/button'
import { useFocusRing } from '@react-aria/focus'
import { forwardRef } from '@vtex-components/utils'
import { get, mergeSx, useTheme } from '@vtex-components/theme'

function useFocusHollow() {
  const theme = useTheme()
  const { isFocusVisible, focusProps } = useFocusRing()
  const focusStyles = isFocusVisible
    ? {
        boxShadow: `0px 0px 0px ${get(theme, 'space.2')}px ${get(
          theme,
          'colors.focus'
        )}`,
      }
    : {}

  return { focusStyles, focusProps }
}

function useMeasures({
  size,
  icon,
  iconPosition,
  children,
}: Pick<ButtonProps, 'size' | 'icon' | 'iconPosition' | 'children'>) {
  const iconEnd = !!icon && iconPosition === 'end'
  const containerStyles: SxStyleProp = {
    flexDirection: iconEnd ? 'row-reverse' : 'row',
  }

  const resolvedSize = !!icon && !children ? 'icon' : size

  return {
    resolvedSize,
    containerStyles,
  }
}

function getIconProps({
  size: buttonSize,
  iconPosition,
  children,
}: Pick<ButtonProps, 'size' | 'iconPosition' | 'children'>) {
  const sx = children
    ? iconPosition === 'start'
      ? { marginRight: 4 }
      : { marginLeft: 4 }
    : {}

  const size = buttonSize === 'small' ? 20 : 24

  return { sx, size }
}

/**
 * Component that handles all Button variants of the DS.
 * It renders a button jsx element by default
 * @example
 * import { Button, ButtonProps } from 'brand-ui'
 * <Button>Default Button</Button>
 */
export const Button = forwardRef(
  (props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
    const {
      size = 'regular',
      variant = 'primary',
      sx = {},
      iconPosition = 'start',
      icon,
      children,
      ...restProps
    } = props

    const { focusStyles, focusProps } = useFocusHollow()
    const { containerStyles, resolvedSize } = useMeasures({
      children,
      icon,
      iconPosition,
      size,
    })

    const renderIcon = () => {
      const iconProps = getIconProps({
        children,
        size,
        iconPosition,
      })

      return icon?.(iconProps)
    }

    const mergedSx = mergeSx<SxStyleProp>(focusStyles, sx)

    return (
      <BaseButton
        variant={variant}
        size={resolvedSize}
        sx={mergedSx}
        ref={ref}
        {...restProps}
        {...focusProps}
      >
        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            margin: 'auto',
            width: '100%',
            height: '100%',
            ...containerStyles,
          }}
        >
          {renderIcon()}
          {children}
        </Flex>
      </BaseButton>
    )
  }
)

export type Variant = 'primary' | 'secondary' | 'tertiary'
export type Size = 'small' | 'regular' | 'block'
export interface ButtonProps
  extends Pick<
    BaseProps,
    | 'sx'
    | 'disabled'
    | 'focusable'
    | 'children'
    | 'id'
    | 'type'
    | 'name'
    | 'onClick'
    | 'onMouseEnter'
    | 'onMouseLeave'
    | 'onMouseDown'
    | 'onMouseUp'
    | 'onFocus'
    | 'onMouseOver'
    | 'value'
  > {
  /** Size of the button
   * @default regular
   * */
  size?: Size
  /** Button variant
   * @default primary
   * */
  variant?: Variant
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
