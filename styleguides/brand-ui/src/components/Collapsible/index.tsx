import React, { ReactNode } from 'react'
import { SxStyleProp, Flex, Box } from 'theme-ui'
import {
  useDisclosureState,
  Disclosure as ReakitDisclosure,
  DisclosureContent,
  DisclosureProps,
} from 'reakit/Disclosure'

import { CollapsibleProvider, useCollapsibleContext } from './context'
import { Button } from '../Button'
import { IconCaret } from '../../icons'

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
export function Collapsible({ sx, children, ...props }: CollapsibleProps) {
  return (
    <Box sx={sx}>
      <CollapsibleProvider {...props}>{children}</CollapsibleProvider>
    </Box>
  )
}

function Header({ children, sx, iconPosition = 'end' }: HeaderProps) {
  const { visible, ...disclosureProps } = useCollapsibleContext()

  return (
    <ReakitDisclosure visible={visible} {...disclosureProps}>
      {(enhancedProps) => (
        <Button
          {...enhancedProps}
          sx={{ color: 'text', paddingX: 2, ...sx }}
          iconPosition={iconPosition}
          variant="tertiary"
          block
          icon={(iconProps) => (
            <IconCaret {...iconProps} direction={visible ? 'right' : 'down'} />
          )}
        >
          <Flex sx={{ justifyContent: 'start', width: '100%' }}>
            {children}
          </Flex>
        </Button>
      )}
    </ReakitDisclosure>
  )
}

function Content({ children, sx }: ContentProps) {
  const props = useCollapsibleContext()

  return (
    <DisclosureContent {...props}>
      {(enhancedProps) => (
        <Box {...enhancedProps} sx={{ p: 3, ...sx }}>
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
 * Actions Panel -> always on the right side.
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
   * Disclosure button icon position
   * @default end
   */
  iconPosition?: 'end' | 'start'
  /**
   * Disclosure content
   */
  children?: ReactNode
  /** custom styles */
  sx?: SxStyleProp
}

export interface ContentProps {
  children?: ReactNode
  /** custom styles */
  sx?: SxStyleProp
}

export { useDisclosureState as useCollapsible }
