import React, { ReactNode, Ref } from 'react'
import { forwardRef } from '@vtex/admin-core'
import { IconClose, IconContainer } from '@vtex/admin-ui-icons'

import { Box } from '@vtex/admin-primitives'
import { SystemComponent } from '../../types'
import { Button } from '../Button'

export const Tag = forwardRef((props: TagProps, ref: Ref<HTMLDivElement>) => {
  const {
    palette = 'blue',
    size = 'regular',
    label,
    icon,
    handleDelete,
    csx,
    ...boxProps
  } = props

  return (
    <Box
      csx={{ themeKey: `components.tag.${palette}-${size}`, ...csx }}
      ref={ref}
      {...boxProps}
    >
      <IconContainer space="small">
        {icon}
        {label}
        {!!handleDelete && (
          <Button
            icon={<IconClose />}
            aria-label={`${label}-tag-button-delete`}
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
    </Box>
  )
})

export interface TagProps extends SystemComponent {
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
