import type { ComponentPropsWithRef, ReactNode } from 'react'
import React from 'react'
import { IconX } from '@vtex/phosphor-icons'
import { IconContainer, jsx } from '@vtex/admin-ui-react'
import { palette } from '@vtex/admin-ui-core'

import { Button } from '../../button'

/**
 * Tags represent a status, or a common denominator. They make sections and entities quickly identifiable and searchable.
 *
 * @example
 * <Tag
 *   label="Here goes your label!"
 *   icon={<Icon />}
 *   handleDelete={() => ...}
 *   palette="red"
 *   size="small"
 * />
 */
export const Tag = jsx('div')(
  {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '100px',
    text: '$body',
    border: 'none',
    '> svg:nth-of-type(1)': {
      marginRight: 1,
    },
    variants: {
      palette: {
        lightBlue: palette('lightBlue'),
        green: palette('green'),
        orange: palette('orange'),
        cyan: palette('cyan'),
        purple: palette('purple'),
        teal: palette('teal'),
        red: palette('red'),
        gray: palette('gray'),
      },
      size: {
        small: {
          height: 26,
          paddingX: '2',
          svg: {
            width: 16,
            height: 16,
            minWidth: 16,
            minHeight: 16,
          },
          button: {
            height: 16,
            width: 16,
          },
        },
        regular: {
          height: 40,
          paddingX: '4',
          svg: {
            width: 20,
            minWidth: 20,
            height: 20,
            minHeight: 20,
          },
          button: {
            height: 20,
            width: 20,
          },
        },
      },
    },
  },
  {
    options: ['handleDelete', 'icon', 'label'],
    useOptions: (options: TagOptions, props) => {
      const { label, handleDelete, icon } = options

      return {
        ...props,
        children: (
          <IconContainer size="small">
            {icon}
            {label}
            {!!handleDelete && (
              <Button
                variant="neutralTertiary"
                icon={<IconX />}
                aria-label={label}
                onClick={handleDelete}
                csx={{
                  marginLeft: 1,
                }}
              />
            )}
          </IconContainer>
        ),
      }
    },
  }
)

Tag.defaultProps = {
  size: 'regular',
  palette: 'lightBlue',
}

export interface TagOptions {
  /**
   * Tag Label
   */
  label: string
  /**
   * when defined the tag is deletable
   */
  handleDelete?: () => void
  /**
   * Tag icon
   */
  icon?: ReactNode
}

export type TagProps = ComponentPropsWithRef<typeof Tag> & TagOptions
