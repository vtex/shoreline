import type { ComponentPropsWithRef } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { Role } from 'reakit'

import { Text } from '../../Text'

export const FieldDetails = createComponent<typeof Role, FieldDetailsOptions>(
  (props) => {
    const { message, tone, charLimit, value, ...restProps } = props

    return useElement(Role, {
      baseStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: '',
        paddingTop: 1,
      },
      children: (
        <>
          {message ? (
            <Text
              variant="detail"
              tone={tone === 'critical' ? 'critical' : 'secondary'}
            >
              {message}
            </Text>
          ) : (
            <div>{/** spacer element */}</div>
          )}
          {!!charLimit && (
            <Text variant="detail" tone="secondary">
              {`${value?.toString().length}/${charLimit}`}
            </Text>
          )}
        </>
      ),
      ...restProps,
    })
  }
)

export interface FieldDetailsOptions {
  message?: React.ReactNode
  charLimit?: number
  value?: string | number | readonly string[]
  tone?: 'neutral' | 'critical'
}

export type FieldDetailsProps = ComponentPropsWithRef<typeof FieldDetails>
