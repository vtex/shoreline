import React, { ReactNode, Ref } from 'react'
import BaseButton from '@vtex-components/button'
import { forwardRef } from '@vtex-components/utils'

import { IconRemove } from '../../icons'
import {
  FlexTokensProps,
  LayoutTokensProps,
  SpaceTokensProps,
} from '../../system'
import { Box } from '../Box'

export const Tag = forwardRef((props: TagProps, ref: Ref<HTMLDivElement>) => {
  const {
    palette = 'blue',
    size = 'regular',
    label,
    icon,
    handleDelete,
    ...restProps
  } = props

  return (
    <Box
      themeKey={`components.tag.${palette}-${size}`}
      {...restProps}
      ref={ref}
    >
      {icon}
      {label}
      {!!handleDelete && (
        <BaseButton
          aria-label={`${label}-tag-button-delete`}
          onClick={handleDelete}
          variant={`tag.${palette === 'black' ? palette : 'default'}-button`}
        >
          <IconRemove />
        </BaseButton>
      )}
    </Box>
  )
})

export interface TagProps
  extends SpaceTokensProps,
    LayoutTokensProps,
    FlexTokensProps {
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
