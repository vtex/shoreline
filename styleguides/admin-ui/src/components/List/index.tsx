import React, { ReactNode } from 'react'
import Truncate from 'react-truncate'

import { Box, BoxProps } from '../Box'
import { Text, TextVariant } from '../Text'
import { ListProvider, useListContext } from './context'

export type Density = 'compact' | 'regular' | 'comfortable'

export interface ListProps extends BoxProps {
  density?: Density
  label?: ReactNode
}

export function List(props: ListProps) {
  const { density = 'regular', sx, children, label, ...boxProps } = props

  return (
    <Box sx={{ ...sx }} {...boxProps}>
      {label && <Text variant="subtitle">{label}</Text>}
      <ListProvider value={{ density }}>{children}</ListProvider>
    </Box>
  )
}

List.Item = function ListItem(props: BoxProps) {
  const { sx, ...boxProps } = props
  const { density } = useListContext()

  return <Box sx={{ variant: `data.list.${density}`, ...sx }} {...boxProps} />
}

interface TextGroupProps extends Omit<BoxProps, 'title'> {
  /**
   * ditto
   */
  title?: ReactNode
  /**
   * ditto
   */
  subtitle?: ReactNode
  /**
   * short description
   */
  description?: ReactNode
  /**
   * description lines
   */
  descLineCount?: number
  /**
   * Variant of the title
   */
  variant?: TextVariant
}

/**
 * Groups title, subtilte and shortDesc
 */
export function TextGroup(props: TextGroupProps) {
  const {
    title,
    subtitle,
    description,
    descLineCount = 1,
    variant,
    ...boxProps
  } = props

  const { density } = useListContext()

  const selectedVariant =
    variant ??
    ({
      compact: 'body',
      regular: 'subtitle',
      comfortable: 'headline',
    }[density] as TextVariant)

  return (
    <Box {...boxProps}>
      <Text variant={selectedVariant}>
        {title}
        {subtitle && (
          <>
            <br />
            <Text c="muted.1" variant="small">
              {subtitle}
            </Text>
          </>
        )}
      </Text>
      {description && (
        <Text el="p" w="full">
          <Truncate lines={descLineCount}>{description}</Truncate>
        </Text>
      )}
    </Box>
  )
}

List.TextGroup = TextGroup
