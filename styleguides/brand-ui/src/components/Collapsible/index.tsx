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
import { IconCaret } from '../../icons'
import { useFocusHollow } from '../../hooks'
import { css } from '@emotion/core'
import { DisclosureStateReturn } from 'reakit/ts'

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
  arrowPosition = 'right',
  arrowAlign = 'center',
  sx = {},
}: HeaderProps) {
  const { visible, ...disclosureProps } = useCollapsibleContext()
  const { focusStyles, focusProps } = useFocusHollow()

  const baseVariant = 'collapsible.header'
  const headerVariant = `${baseVariant}.${size}-${arrowPosition}`
  const contentVariant = `${baseVariant}.content`
  const arrowVariant = `${baseVariant}.arrow.${arrowAlign}`
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
          <IconCaret
            duration={0.3}
            direction={visible ? 'up' : 'down'}
            sx={{ variant: arrowVariant, mr: arrowPosition === 'left' ? 2 : 0 }}
          />
        </Flex>
      )}
    </ReakitDisclosure>
  )
}

const contentAnimation = css`
    transition: opacity 250ms ease-in-out, transform 250ms ease-in-out;
    opacity: 0;
    transform: translate3d(0, -10%, 0);
 &[data-enter] {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  &data-leave] {
    // Uncomment below to have a different leave animation
    // transform: translate3d(0, 100%, 0);
  }
`;

function Content({ children, sx = {}, state }: ContentProps) {
  const behavior =
    !!children && (children as ReactElement).type === Collapsible
      ? 'stacked'
      : 'regular'

  const variant = `collapsible.content.${behavior}`

  return (
    <DisclosureContent {...state} css={state.animated && contentAnimation}>
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

type ContentProps = PropsWithChildren<SxProps> & { state: DisclosureStateReturn }

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
  /**
   * Caret icon position
   * @default right
   */
  arrowPosition?: 'left' | 'right'
  /**
   * Caret icon alignment
   * @default start
   */
  arrowAlign?: 'start' | 'center' | 'end'
}

export {
  Collapsible,
  CollapsibleProps,
  HeaderProps as CollapsibleHeaderProps,
  ContentProps as CollapsibleContentProps,
  useDisclosureState as useCollapsible,
}
