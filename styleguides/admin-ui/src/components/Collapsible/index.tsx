import React, { ReactNode } from 'react'
import { SxStyleProp, Flex } from 'theme-ui'
import {
  useDisclosureState,
  Disclosure as ReakitDisclosure,
  DisclosureContent,
  DisclosureProps,
} from 'reakit/Disclosure'

import { Box } from '../Box'
import { CollapsibleProvider, useCollapsibleContext } from './context'
import { IconCaretMock } from './CaretIconMock'
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
        backgroundColor: 'background',
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
        ...sx,
      }}
    >
      <Disclosure>{label}</Disclosure>
      <Flex>{children}</Flex>
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
            iconPosition="start"
            icon={() => (
              <IconCaretMock
                size={24}
                sx={{
                  transform: visible ? 'rotate(90deg)' : '',
                }}
              />
            )}
            variant="subtle"
            sx={{
              color: 'text',
              '&:hover': { backgroundColor: 'none', color: 'text' },
              '&:active': { backgroundColor: 'none', color: 'text' },
            }}
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
        <Box
          role="region"
          {...enhancedProps}
          sx={{ paddingX: 13, paddingBottom: 13, ...sx }}
        >
          {children}
        </Box>
      )}
    </DisclosureContent>
  )
}

Collapsible.Header = Header
Collapsible.Content = Content

export interface CollapsibleProps extends DisclosureProps {
  children?: ReactNode
  sx?: SxStyleProp
}

export interface HeaderProps {
  label?: ReactNode
  children?: ReactNode
  sx?: SxStyleProp
}

export interface ContentProps {
  children?: ReactNode
  sx?: SxStyleProp
}

export { useDisclosureState as useCollapsible }
