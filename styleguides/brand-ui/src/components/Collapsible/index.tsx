import React, { ReactNode, ReactElement } from 'react'
import { SxStyleProp, Box, Flex } from 'theme-ui'
import {
  useDisclosureState,
  DisclosureContent,
  DisclosureProps,
} from 'reakit/Disclosure'
import { mergeSx } from '@vtex-components/theme'
import { Disclosure as ReakitDisclosure } from 'reakit'

import { CollapsibleProvider, useCollapsibleContext } from './context'
import { IconCaret } from '../../icons'
import { useFocusHollow } from '../utils'

/**
 * A Collapsible is a container that allows toggling the display of content. It can be nested as well.
 * @example
 * ```jsx
 * import { Collapsible, useCollapsible } from `@vtex/admin-ui`
 * const props = useCollapsible()
 * <Collapsible {...props}>
 *   <Collapsible.Header label="Title goes here">
 *     {children}
 *   </Collapsible.Header>
 *   <Collapsible.Content>{content}</Collapsible.Content>
 * </Collapsible>
 * ```
 */
export function Collapsible({ sx = {}, children, ...props }: CollapsibleProps) {
  return (
    <Box variant="collapsible" sx={sx}>
      <CollapsibleProvider {...props}>{children}</CollapsibleProvider>
    </Box>
  )
}

function Header({ children, size = 'regular', sx = {} }: HeaderProps) {
  const { visible, ...disclosureProps } = useCollapsibleContext()
  const { focusStyles, focusProps } = useFocusHollow()

  const variant = `collapsible.header.${size}`
  const mergedSx = mergeSx<SxStyleProp>(focusStyles, sx)

  return (
    <ReakitDisclosure visible={visible} {...disclosureProps}>
      {(enhancedProps) => (
        <Flex
          as="button"
          {...enhancedProps}
          {...focusProps}
          variant={variant}
          sx={mergedSx}
        >
          {children}
          <IconCaret duration={0.3} direction={visible ? 'up' : 'down'} />
        </Flex>
      )}
    </ReakitDisclosure>
  )
}

function Content({ children, sx = {} }: ContentProps) {
  const props = useCollapsibleContext()

  const behavior =
    (children as ReactElement).type === Collapsible ? 'stacked' : 'regular'

  const variant = `collapsible.content.${behavior}`

  return (
    <DisclosureContent {...props}>
      {(enhancedProps) => (
        <Box {...enhancedProps} variant={variant} sx={sx}>
          {children}
        </Box>
      )}
    </DisclosureContent>
  )
}

/**
 * ```
 * Collapsible.Header is always visible.
 * Disclosure Button -> always on the left side, and is responsible for controlling the content visibility.
 * ```
 */
Collapsible.Header = Header
/**
 * ```
 * Collapsible content.
 * Can be visible or hidden.
 * ```
 */
Collapsible.Content = Content

export interface CollapsibleProps extends DisclosureProps {
  children?: ReactNode
  sx?: SxStyleProp
}

export interface HeaderProps {
  /**
   * Disclosure content
   */
  children?: ReactNode
  /** custom styles */
  sx?: SxStyleProp
  /** Size of the collapsible header
   * @default regular
   */
  size?: 'small' | 'regular'
}

export interface ContentProps {
  children?: ReactNode
  /** custom styles */
  sx?: SxStyleProp
}

export { useDisclosureState as useCollapsible }
