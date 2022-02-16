import type { ReactNode } from 'react'
import React from 'react'
import { Button as ReakitButton } from 'reakit/Button'
import type { VariantProps } from '@vtex/admin-ui-core'
import { createComponent, createHook, useElement } from '@vtex/admin-ui-react'

import { Center } from '../components/Center'
import { Spinner } from '../components/Spinner'
import * as style from './Button.style'

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
    children,
    ...props
  }) => {
    return {
      baseStyle: {
        ...style.buttonStyle,
        ...style.buttonVariants({
          variant,
          size,
        }),
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
 * Component that handles all Button variants
 *
 * @example
 * import { Button } from `@vtex/admin-ui`
 * <Button>Default Button</Button>
 */
export const Button = createComponent<typeof ReakitButton, ButtonOptions>(
  (props) => {
    const elementProps = useButton(props)

    return useElement(ReakitButton, elementProps as any)
  }
)

export type ButtonOptions = VariantProps<typeof style.buttonVariants> & {
  /**
   *  Whether is loading
   * @default false
   */
  loading?: boolean
  /**
   * Icon of the button
   */
  icon?: ReactNode
}

export type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>
