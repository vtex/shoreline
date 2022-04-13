import type { ReactNode } from 'react'
import React from 'react'
import { createComponent, useElement, tag } from '@vtex/admin-ui-react'
import type { VariantProps } from '@vtex/admin-ui-core'
import { RadioGroup as AriakitRadioGroup } from 'ariakit/radio'

import * as style from './radio-group.style'
import { Text } from '../components/Text'

export const RadioGroup = createComponent<
  typeof RadioContainer,
  RadioGroupOptions
>((props) => {
  const {
    label,
    helperText,
    errorMessage,
    error: initialError = false,
    children,
    ...radioContainerProps
  } = props

  const error = initialError && errorMessage
  const message = error ? errorMessage : helperText

  return useElement('div', {
    baseStyle: style.radioGroupStyles,
    children: (
      <>
        <Text as="span" variant="detail" tone="secondary">
          {label}
        </Text>
        <RadioContainer {...radioContainerProps}>{children}</RadioContainer>
        <tag.div>
          {message ? (
            <Text variant="detail" tone={error ? 'critical' : 'secondary'}>
              {message}
            </Text>
          ) : null}
        </tag.div>
      </>
    ),
  })
})

export const RadioContainer = createComponent<
  typeof AriakitRadioGroup,
  RadioContainerOptions
>((props) => {
  const { orientation = 'horizontal', ...restProps } = props

  return useElement(AriakitRadioGroup, {
    ...restProps,
    baseStyle: {
      ...style.radioContainerStyles,
      ...style.variants({ orientation }),
    },
  })
})

type RadioContainerOptions = VariantProps<typeof style.variants>

export type RadioGroupProps = React.ComponentPropsWithoutRef<typeof RadioGroup>

export interface RadioGroupOptions extends RadioContainerOptions {
  /**
   * RadioGroup label
   */
  label: ReactNode
  /**
   * RadioGroup helper text
   */
  helperText?: ReactNode
  /**
   * RadioGroup error message. It appears when error property is set to true.
   */
  errorMessage?: ReactNode
  /**
   * Whether it has an invalid input in the RadioGroup or not.
   * @default false
   */
  error?: boolean
}

export { useRadioState, RadioState } from 'ariakit/radio'
