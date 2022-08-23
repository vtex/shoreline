import type { ReactNode } from 'react'
import React from 'react'
import { Button as AriakitButton } from 'ariakit'
import type { VariantProps } from '@vtex/admin-ui-core'
import {
  createComponent,
  createHook,
  useElement,
  IconContainer,
} from '@vtex/admin-ui-react'

import { Center } from '../center'
import { Spinner } from '../components/Spinner'
import * as style from './button.style'

/**
 * Button behavior
 * @example
 * const buttonProps = useButton({})
 */
export const useButton = createHook<typeof AriakitButton, ButtonOptions>(
  ({
    icon,
    size = 'normal',
    variant = 'primary',
    iconPosition: defaultIconPosition = 'start',
    loading = false,
    disabled = false,
    bleedY = false,
    bleedX = false,
    children,
    ...props
  }) => {
    const iconOnly = icon && !children

    const iconPosition = iconOnly ? 'center' : defaultIconPosition

    const bleedYStyle = bleedY
      ? style.bleedY({
          size,
        })
      : {}

    const bleedXStyle = bleedX
      ? style.bleedX({
          size,
        })
      : {}

    return {
      baseStyle: {
        ...style.buttonStyle,
        ...style.variants({
          variant,
          size,
        }),
        ...bleedYStyle,
        ...bleedXStyle,
      },
      children: (
        <Center>
          <Center
            csx={{
              ...style.innerContainerStyle,
              ...style.innerContainerVariants({
                loading,
                iconPosition,
              }),
            }}
          >
            {icon && (
              <IconContainer
                size={iconPosition === 'end' ? 'small' : 'regular'}
              >
                {icon}
              </IconContainer>
            )}
            {children}
          </Center>
          {loading ? (
            <Center csx={style.spinnerContainerStyle}>
              <Spinner />
            </Center>
          ) : null}
        </Center>
      ),
      disabled: disabled || loading,
      ...props,
    }
  }
)

/**
 * Button component
 * @example
 * import { Button } from `@vtex/admin-ui`
 * <Button>Button text</Button>
 */
export const Button = createComponent<typeof AriakitButton, ButtonOptions>(
  (props) => {
    const elementProps = useButton(props)

    return useElement(AriakitButton, elementProps)
  }
)

export type ButtonOptions = VariantProps<typeof style.variants> & {
  /**
   *  Whether is loading
   * @default false
   */
  loading?: boolean
  /**
   * Icon of the button
   */
  icon?: ReactNode
  /**
   * Position of the icon
   * @default start
   */
  iconPosition?: 'start' | 'end'
  /**
   * Vertical bleed
   */
  bleedY?: boolean
  /**
   * Horizontal bleed
   */
  bleedX?: boolean
  /**
   * Children of the button
   */
  children?: ReactNode
}

export type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>
