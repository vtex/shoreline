import type { ReactNode } from 'react'
import React from 'react'
import { Button as ReakitButton } from 'reakit/Button'
import type { VariantProps } from '@vtex/admin-ui-core'
import { createComponent, createHook, useElement } from '@vtex/admin-ui-react'

import { Center } from '../components/Center'
import { Spinner } from '../components/Spinner'
import * as style from './button.style'

/**
 * Button behavior
 * @example
 * const buttonProps = useButton({})
 */
export const useButton = createHook<typeof ReakitButton, ButtonOptions>(
  ({
    icon,
    size = 'normal',
    variant = 'primary',
    iconPosition = 'start',
    loading = false,
    bleedY = false,
    bleedX = false,

    children,
    ...props
  }) => {
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
            {icon} {children}
          </Center>
          {loading ? (
            <Center csx={style.spinnerContainerStyle}>
              <Spinner />
            </Center>
          ) : null}
        </Center>
      ),
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
export const Button = createComponent<typeof ReakitButton, ButtonOptions>(
  (props) => {
    const elementProps = useButton(props)

    return useElement(ReakitButton, elementProps as any)
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
   * Vertical bleed
   */
  bleedY?: boolean
  /**
   * Horizontal bleed
   */
  bleedX?: boolean
}

export type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>
