import type { ComponentPropsWithRef } from 'react'
import React, { Fragment } from 'react'
import { jsx } from '@vtex/admin-ui-react'

import { Label } from '../Label'

export const Group = jsx('div')(
  {
    text: '$body',
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
      color: 'muted',
      display: 'flex',
      alignItems: 'center',
    },
    variants: {
      orientation: {
        horizontal: {
          flexDirection: 'row',
        },
        vertical: {
          flexDirection: 'column',
        },
      },
      size: {
        regular: {
          fontSize: '2',
        },
        small: {
          fontSize: '1',
        },
      },
    },
  },
  {
    sync: [
      {
        orientation: 'horizontal',
        size: 'regular',
        csx: {
          '& label:not(:last-child)': {
            marginRight: 6,
          },
        },
      },
      {
        orientation: 'horizontal',
        size: 'small',
        csx: {
          '& label:not(:last-child)': {
            marginRight: 5,
          },
        },
      },
      {
        orientation: 'vertical',
        size: 'regular',
        csx: {
          '& label:not(:last-child)': {
            marginBottom: 4,
          },
        },
      },
      {
        orientation: 'vertical',
        size: 'small',
        csx: {
          '& label:not(:last-child)': {
            marginBottom: 4,
          },
        },
      },
    ],
  }
)

Group.defaultProps = {
  orientation: 'horizontal',
  role: 'group',
}

export const CheckboxGroup = jsx(Fragment)(
  {},
  {
    options: ['id', 'label', 'size', 'orientation'],
    useOptions(options: CheckboxGroupOptions, props) {
      const {
        label,
        id,
        orientation = 'horizontal',
        size = 'regular',
      } = options

      const { csx, children, ...groupProps } = props

      return {
        children: (
          <Fragment>
            {label && <Label htmlFor={id}>{label}</Label>}
            <Group
              id={id}
              orientation={orientation}
              size={size}
              csx={csx}
              {...groupProps}
            >
              {children}
            </Group>
          </Fragment>
        ),
      }
    },
  }
)

export interface CheckboxGroupOptions {
  id?: string
  label?: string
  size?: 'regular' | 'small'
  orientation?: 'horizontal' | 'vertical'
}

export type CheckboxGroupProps = ComponentPropsWithRef<typeof CheckboxGroup> &
  CheckboxGroupOptions
