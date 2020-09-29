import React, { ReactNode, ReactElement, PropsWithChildren } from 'react'
import { SxStyleProp, Box, Flex, Text, SxProps } from 'theme-ui'
import {
  useDisclosureState,
  DisclosureContent,
  DisclosureProps,
} from 'reakit/Disclosure'
import { mergeSx } from '@vtex-components/theme'
import { Disclosure as ReakitDisclosure } from 'reakit'

import { CollapsibleProvider, useCollapsibleContext } from './context'
import { useFocusHollow } from '../../hooks'

/**
 * A Collapsible is a container that allows toggling the display of content. It can be nested as well.
 * @example
 * ```jsx
 * import { Collapsible, useCollapsible } from `@vtex/brand-ui`
 * const props = useCollapsible()
 * <Collapsible {...props}>
 *   <Collapsible.Header label="Title goes here">
 *     {children}
 *   </Collapsible.Header>
 *   <Collapsible.Content>{content}</Collapsible.Content>
 * </Collapsible>
 * ```
 */
function Collapsible({ sx = {}, children, ...props }: CollapsibleProps) {
  return (
    <Box variant="collapsible" sx={sx}>
      <CollapsibleProvider {...props}>{children}</CollapsibleProvider>
    </Box>
  )
}

function Header({
  label,
  prefix,
  suffix,
  size = 'regular',
  sx = {},
}: HeaderProps) {
  const { visible, ...disclosureProps } = useCollapsibleContext()
  const { focusStyles, focusProps } = useFocusHollow()

  const baseVariant = 'collapsible.header'
  const headerVariant = `${baseVariant}.${size}`
  const contentVariant = `${baseVariant}.content`
  const mergedSx = mergeSx<SxStyleProp>(focusStyles, sx)

  const renderIcon = (icon?: Function, variant = '') =>
    icon?.({ size: 16, sx: { variant } })

  return (
    <ReakitDisclosure visible={visible} {...disclosureProps}>
      {(enhancedProps) => (
        <Flex
          as="button"
          {...enhancedProps}
          {...focusProps}
          variant={headerVariant}
          sx={mergedSx}
        >
          <Flex sx={{ alignItems: 'center' }}>
            {renderIcon(prefix, contentVariant)}
            <Text variant={contentVariant}>{label}</Text>
            {renderIcon(suffix)}
          </Flex>
        </Flex>
      )}
    </ReakitDisclosure>
  )
}

function Content({ children, sx = {} }: ContentProps) {
  const props = useCollapsibleContext()

  const behavior =
    !!children && (children as ReactElement).type === Collapsible
      ? 'stacked'
      : 'regular'

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

type CollapsibleProps = PropsWithChildren<DisclosureProps & SxProps>

type IconProps = SxProps & { size: number }

type ContentProps = PropsWithChildren<SxProps>

interface HeaderProps extends SxProps {
  /**
   * Disclosure content
   */
  label: ReactNode
  /**
   * Prefix icon of the collapsible header
   */
  prefix?: (props: IconProps) => ReactNode
  /**
   * Sufix icon of the collapsible header
   */
  suffix?: (props: IconProps) => ReactNode
  /** Size of the collapsible header
   * @default regular
   */
  size?: 'small' | 'regular'
}

export {
  Collapsible,
  CollapsibleProps,
  HeaderProps as CollapsibleHeaderProps,
  ContentProps as CollapsibleContentProps,
  useDisclosureState as useCollapsible,
}
