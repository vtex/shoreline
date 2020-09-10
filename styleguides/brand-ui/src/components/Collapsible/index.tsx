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
export function Collapsible(props: CollapsibleProps) {
  const { sx, children, ...disclosureProps } = props

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        border: 'solid',
        borderColor: 'muted.3',
        borderWidth: 1,
        borderRadius: 3,
        ...sx,
      }}
    >
      <CollapsibleProvider {...disclosureProps}>{children}</CollapsibleProvider>
    </Box>
  )
}

function Header({ children, label, sx }: HeaderProps) {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 13,
        paddingLeft: 12,
        ...sx,
      }}
    >
      <Disclosure>{label}</Disclosure>
      <Flex
        sx={{
          '& button:nth-of-type(n+2)': {
            marginLeft: 3,
          },
        }}
      >
        {children}
      </Flex>
    </Flex>
  )
}

function Disclosure({ children }: { children: ReactNode }) {
  const { visible, ...disclosureProps } = useCollapsibleContext()

  return (
    <ReakitDisclosure visible={visible} {...disclosureProps}>
      {(enhancedProps) => {
        return (
          <Button
            {...enhancedProps}
            sx={{ color: 'text' }}
            iconPosition="start"
            variant="tertiary"
          >
            {children}
          </Button>
        )
      }}
    </ReakitDisclosure>
  )
}

function Content({ children, sx }: ContentProps) {
  const props = useCollapsibleContext()

  return (
    <DisclosureContent {...props}>
      {(enhancedProps) => (
        <Box {...enhancedProps} sx={{ paddingX: 13, paddingBottom: 13, ...sx }}>
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
   * Disclosure Button label
   */
  label?: ReactNode
  /**
   * Actions panel
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
