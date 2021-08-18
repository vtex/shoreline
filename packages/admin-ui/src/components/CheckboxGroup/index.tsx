import type { ReactNode } from 'react'
import React from 'react'
import type { StyleObject } from '@vtex/admin-core'
import { get } from '@vtex/onda-util'
import { tag } from '@vtex/onda-react'

import { Label } from '../Label'
import type { SystemComponent } from '../../types'

export function CheckboxGroup(props: CheckboxGroupProps) {
  const {
    csx,
    label,
    id,
    orientation = 'horizontal',
    size = 'regular',
    children,
    ...htmlProps
  } = props

  return (
    <>
      {label && <Label htmlFor={id}>{label}</Label>}
      <tag.div
        {...htmlProps}
        role="group"
        id={id}
        csx={{
          fontSettings: 'regular',
          lh: 'highlight',
          marginTop: 3,
          marginBottom: 6,
          display: 'flex',
          alignItems: 'flex-start',
          '& > label > input': {
            marginRight: 2,
            marginLeft: 0,
          },
          '& > label': {
            cursor: 'pointer',
            color: 'dark.secondary',
            display: 'flex',
            alignItems: 'center',
          },
          ...get<Record<string, StyleObject>, string, object>(
            {
              'horizontal-regular': {
                fontSize: '2',
                flexDirection: 'row',
                '& label:not(:last-child)': {
                  marginRight: 6,
                },
              },
              'vertical-regular': {
                fontSize: '2',
                flexDirection: 'column',
                '& label:not(:last-child)': {
                  marginBottom: 4,
                },
              },
              'horizontal-small': {
                fontSize: '1',
                flexDirection: 'row',
                '& label:not(:last-child)': {
                  marginRight: 5,
                },
              },
              'vertical-small': {
                fontSize: '1',
                flexDirection: 'column',
                '& label:not(:last-child)': {
                  marginBottom: 4,
                },
              },
            },
            `${orientation}-${size}`,
            {}
          ),
          ...csx,
        }}
      >
        {children}
      </tag.div>
    </>
  )
}

export interface CheckboxGroupProps extends SystemComponent {
  children?: ReactNode
  id?: string
  label?: string
  size?: 'regular' | 'small'
  orientation?: 'horizontal' | 'vertical'
}
