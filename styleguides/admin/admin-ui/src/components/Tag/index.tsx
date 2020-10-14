import React, { ReactNode } from 'react'
import BaseButton from '@vtex-components/button'

import { Icon } from '../../icons'
import {
  FlexTokensProps,
  LayoutTokensProps,
  SpaceTokensProps,
} from '../../system'
import { Box } from '../Box'

export function Tag(props: TagProps) {
  const {
    palette = 'primary',
    size = 'regular',
    label,
    icon,
    handleDelete,
    ...restProps
  } = props

  return (
    <Box variant={`tag.${palette}-${size}`} {...restProps}>
      {icon}
      {label}
      {!!handleDelete && (
        <ButtonDelete
          label={label}
          handleDelete={handleDelete}
          palette={palette}
        />
      )}
    </Box>
  )
}

function ButtonDelete(props: ButtonDeleteProps) {
  const { label, handleDelete, palette } = props

  return (
    <BaseButton
      aria-label={`${label}-tag-button-delete`}
      onClick={handleDelete}
      variant={`tag.${palette === 'base' ? palette : 'default'}-button`}
    >
      <IconDelete />
    </BaseButton>
  )
}

function IconDelete() {
  return (
    <Icon viewBox="0 0 20 20">
      <path
        d="M6.66669 6.66663L13.3334 13.3333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3334 6.66663L6.66669 13.3333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

type ButtonDeleteProps = Pick<TagProps, 'label' | 'handleDelete' | 'palette'>

export interface TagProps
  extends SpaceTokensProps,
    LayoutTokensProps,
    FlexTokensProps {
  /**
   *  Tag Palette
   *  @default primary
   */
  palette?: 'base' | 'success' | 'danger' | 'primary' | 'warning' | 'purple'
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
