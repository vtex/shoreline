import React, { Ref, forwardRef } from 'react'
import { SxStyleProp, Flex } from 'theme-ui'
import merge from 'deepmerge'
import { useFocusRing } from '@react-aria/focus'
import {
  Button as BaseButton,
  ButtonProps as BaseProps,
} from '@vtex-components/button'

import { useTheme, FeedbackPalette, FeedbackPalettes } from '../../theme'

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
      ...restProps
    } = props

    const { theme } = useTheme()
    const { isFocusVisible, focusProps } = useFocusRing()
    const chosenPalette = theme.colors[palette]
    const { background, focus } = theme.colors
    const iconStart = !!icon && iconPosition === 'start'
    const iconEnd = !!icon && iconPosition === 'end'
    const iconOnly = !!icon && !children

    const focusVisibleStyle = isFocusVisible
      ? {
          boxShadow: `0px 0px 0px 2px ${background}, 0px 0px 0 3px ${focus}`,
        }
      : {}

    const mergedSx = merge<SxStyleProp>(
      {
        borderWidth: 1,
        borderRadius: 3,
        cursor: 'pointer',
        position: 'relative',
        borderStyle: 'solid',
        '&:focus': {
          outline: 'none',
        },
        ...focusVisibleStyle,
        ...getMeasures({ size, iconStart, iconEnd, iconOnly }),
        ...getVariant(variant, chosenPalette),
      },
      sx
    )

    const renderIcon = () => {
      const iconProps = getIconProps(size)

      return icon?.(iconProps)
    }

    return (
      <BaseButton sx={mergedSx} ref={ref} {...restProps} {...focusProps}>
        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: iconEnd ? 'row-reverse' : 'row',
            margin: 'auto',
            width: '100%',
            height: '100%',
          }}
        >
          {renderIcon()}
          {children}
        </Flex>
      </BaseButton>
    )
  }
)

function getIconProps(size: Size) {
  const styles = {
    size: {
      regular: 24,
      small: 20,
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

interface GetMeasuresParams {
  size: Size
  iconStart: boolean
  iconEnd: boolean
  iconOnly: boolean
}

function getMeasures({
  size = 'regular',
  iconStart,
  iconEnd,
  iconOnly,
}: GetMeasuresParams): SxStyleProp {
  switch (size) {
    case 'regular':
      return {
        paddingY: 5,
        fontSize: 1,
        height: 40,
        width: iconOnly ? 40 : 'auto',
        paddingLeft: iconOnly ? 3 : iconStart ? 5 : 9,
        paddingRight: iconOnly ? 3 : iconEnd ? 5 : 9,
      }

    case 'small':
      return {
        paddingY: 4,
        fontSize: 0,
        height: 32,
        width: iconOnly ? 32 : 'auto',
        paddingLeft: iconOnly ? 2 : iconStart ? 5 : 7,
        paddingRight: iconOnly ? 2 : iconEnd ? 5 : 7,
      }

    default:
      return {}
  }
}

function getVariant(variant: Variant, color: FeedbackPalette): SxStyleProp {
  switch (variant) {
    case 'subtle':
      return {
        borderColor: 'transparent',
        textTransform: 'capitalize',
        backgroundColor: 'transparent',
        color: color.base,
        fontWeight: 'regular',
        '&:hover': {
          color: color.hover,
          backgroundColor: color.washed,
        },
        '&:active': {
          backgroundColor: color.washed,
          color: color.active,
        },
        '&:disabled': {
          color: 'muted.1',
        },
      }

    case 'outlined':
      return {
        textTransform: 'uppercase',
        backgroundColor: 'transparent',
        borderColor: 'muted.2',
        color: color.base,
        fontWeight: 'medium',
        '&:hover': {
          backgroundColor: color.washed,
          color: color.hover,
        },
        '&:active': {
          color: color.active,
        },
        '&:disabled': {
          color: 'muted.1',
          backgroundColor: 'muted.4',
        },
      }

    case 'filled':
      return {
        textTransform: 'uppercase',
        color: color.contrast,
        backgroundColor: color.base,
        fontWeight: 'medium',
        '&:hover': {
          backgroundColor: color.hover,
        },
        '&:active': {
          backgroundColor: color.active,
        },
        '&:disabled': {
          color: 'text',
          backgroundColor: 'muted.2',
        },
      }

    default:
      return {}
  }
}

export type Variant = 'filled' | 'outlined' | 'subtle'
export type Size = 'small' | 'regular'
export type Palette = FeedbackPalettes
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
