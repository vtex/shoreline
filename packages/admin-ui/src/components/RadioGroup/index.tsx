import type { ReactNode } from 'react'
import React, { Fragment } from 'react'
import type { RadioGroupProps as ReakitRadioGroupProps } from 'reakit/Radio'
import { RadioGroup as ReakitRadioGroup } from 'reakit/Radio'
import type { StyleObject } from '@vtex/admin-core'
import { tag } from '@vtex/onda-react'
import { get } from '@vtex/onda-util'

import type { SystemComponent } from '../../types'
import { Label } from '../Label'

export function RadioGroup(props: RadioGroupProps) {
  const {
    label,
    orientation = 'horizontal',
    size = 'regular',
    csx,
    id,
    state,
    children,
    ...htmlProps
  } = props

  return (
    <Fragment>
      {label && <Label htmlFor={id}>{label}</Label>}
      <tag.div
        as={ReakitRadioGroup}
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
        orientation={orientation}
        id={id}
        {...state}
        {...htmlProps}
      >
        {children}
      </tag.div>
    </Fragment>
  )
}

export interface RadioGroupProps extends SystemComponent {
  label?: string
  size?: 'regular' | 'small'
  orientation?: 'horizontal' | 'vertical'
  state: ReakitRadioGroupProps
  children?: ReactNode
  id?: string
}
