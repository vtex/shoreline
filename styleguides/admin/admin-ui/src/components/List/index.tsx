import React, { ReactNode } from 'react'
import Truncate from 'react-truncate'

import { Box, BoxProps } from '../Box'
import { Text, TextVariant } from '../Text'
import { ListProvider, useListContext } from './context'

/**
 * Used to display items with same kind of data.
 * @example
 * ```jsx
 * import { List } from `@vtex/admin-ui`
 *
 * <List>
 *   <List.Item>
 *     <List.TextGroup>
 *   </List.Item>
 * </List>
 * ```
 */
export function List(props: ListProps) {
  const { density = 'regular', sx, children, label, ...boxProps } = props

  return (
    <Box sx={{ ...sx }} {...boxProps}>
      {label && <Text variant="subtitle">{label}</Text>}
      <ListProvider value={{ density }}>{children}</ListProvider>
    </Box>
  )
}

/**
 * Item of the list
 * @example
 * ```jsx
 * import { List } from `@vtex/admin-ui`
 *
 * <List>
 *   <List.Item />
 * </List>
 * ```
 */
List.Item = function ListItem(props: BoxProps) {
  const { sx, ...boxProps } = props
  const { density } = useListContext()

  return <Box sx={{ variant: `data.list.${density}`, ...sx }} {...boxProps} />
}

/**
 * Groups title, subtitle and description
 * @example
 * ```jsx
 * import { List } from `@vtex/admin-ui`
 *
 * <List>
 *   <List.TextGroup title="" subtitle="" description="" />
 * </List>
 * ```
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
      comfortable: 'subtitle',
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

export type ListDensity = 'compact' | 'regular' | 'comfortable'

export interface ListProps extends BoxProps {
  /**
   * Density of the list
   * @default regular
   */
  density?: ListDensity
  /**
   * Label of the list
   */
  label?: ReactNode
}

export interface TextGroupProps extends Omit<BoxProps, 'title'> {
  /**
   * TextGroup Title
   */
  title?: ReactNode
  /**
   * TextGroup Subtitle
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
