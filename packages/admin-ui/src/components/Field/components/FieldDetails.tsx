import type { ComponentPropsWithRef } from 'react'
import React from 'react'
import { jsx } from '@vtex/admin-ui-react'
import { Role } from 'reakit'

import { Text } from '../../Text'

export const FieldDetails = jsx(Role)(
  {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: '',
    paddingTop: 1,
  },
  {
    options: ['message', 'charLimit', 'value', 'error'],
    useOptions(options: FieldDetailsOptions, props) {
      const { message, error, charLimit, value } = options

      return {
        ...props,
        children: (
          <>
            {message ? (
              <Text variant="small" feedback={error ? 'danger' : 'muted'}>
                {message}
              </Text>
            ) : (
              <div>{/** spacer element */}</div>
            )}
            {!!charLimit && (
              <Text variant="small" feedback="muted">
                {`${value?.toString().length}/${charLimit}`}
              </Text>
            )}
          </>
        ),
      }
    },
  }
)

export interface FieldDetailsOptions {
  message?: string
  charLimit?: number
  value?: string | number | readonly string[]
  error?: boolean
}

export type FieldDetailsProps = ComponentPropsWithRef<typeof FieldDetails>
