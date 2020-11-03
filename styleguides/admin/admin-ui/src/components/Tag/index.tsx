import React, { ReactNode, Ref } from 'react'
import { forwardRef } from '@vtex-components/utils'

import { IconRemove } from '../../icons'
import { Box } from '../Box'
import { Overridable } from '../../types'

export const Tag = forwardRef((props: TagProps, ref: Ref<HTMLDivElement>) => {
  const {
    palette = 'blue',
    size = 'regular',
    label,
    icon,
    handleDelete,
    styleOverrides,
    ...boxProps
  } = props

  return (
    <Box
      themeKey={`components.tag.${palette}-${size}`}
      styles={styleOverrides}
      ref={ref}
      {...boxProps}
    >
      {icon}
      {label}
      {!!handleDelete && (
        <Box
          element="button"
          aria-label={`${label}-tag-button-delete`}
          onClick={handleDelete}
          themeKey={`components.tag.${
            palette === 'black' ? palette : 'default'
          }-button`}
        >
          <IconRemove />
        </Box>
      )}
    </Box>
  )
})

export interface TagProps extends Overridable {
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
