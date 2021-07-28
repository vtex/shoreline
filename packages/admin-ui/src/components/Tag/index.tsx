import type { ReactNode } from 'react'
import React from 'react'
import { IconClose, IconContainer } from '@vtex/admin-ui-icons'
import type { PropsWithAs } from '@vtex/onda-react'
import { jsx } from '@vtex/onda-react'

import { Button } from '../Button'

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
export const Tag = jsx.div(
  {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '100px',
    color: 'dark.primary',
    border: 'none',
    '> svg:nth-of-type(1)': {
      marginRight: 1,
    },
    variants: {
      palette: {
        blue: {
          bg: 'blue.secondary',
        },
        green: {
          bg: 'green.secondary',
        },
        red: {
          bg: 'red.secondary',
        },
        black: {
          bg: 'dark.primary',
          color: 'light.primary',
        },
        yellow: {
          bg: 'yellow.secondary',
        },
        purple: {
          bg: '#E4E0F0',
        },
      },
      size: {
        small: {
          height: 26,
          paddingX: '2',
          lineHeight: 'small',
          fontSettings: "'wght' 80",
          fontSize: 0,
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
          lineHeight: 'subtitle',
          fontSettings: 'regular',
          fontSize: 2,
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
      const { palette } = props

      return {
        ...props,
        children: (
          <IconContainer space="small">
            {icon}
            {label}
            {!!handleDelete && (
              <Button
                icon={<IconClose />}
                aria-label={label}
                onClick={handleDelete}
                variant={
                  palette === 'black' ? 'adaptative-light' : 'adaptative-dark'
                }
                size="small"
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
  palette: 'blue',
}

interface TagOptions {
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

interface TagVariants {
  /**
   *  Tag Palette
   *  @default blue
   */
  palette?: 'black' | 'green' | 'red' | 'blue' | 'yellow' | 'purple'
  /**
   *  Tag Size
   *  @default regular
   * */
  size?: 'regular' | 'small'
}

export type TagProps = PropsWithAs<TagOptions & TagVariants, 'div'>
