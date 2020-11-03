import React, { ReactNode } from 'react'
import { SxStyleProp } from '@vtex/admin-ui-system'
import {
  useDisclosureState,
  Disclosure as ReakitDisclosure,
  DisclosureContent,
  DisclosureProps,
  DisclosureStateReturn,
} from 'reakit/Disclosure'

import {
  BorderTokensProps,
  ColorTokensProps,
  FlexTokensProps,
  LayoutTokensProps,
  SpaceTokensProps,
} from '../../system'
import { IconCaret } from '../../icons'
import { Box } from '../Box'
import { CollapsibleProvider, useCollapsibleContext } from './context'
import { Button } from '../Button'

/**
 * A Collapsible is a container that allows toggling the display of content. It can be nested as well.
 * @example
 * ```jsx
 * import { Collapsible, useCollapsible } from `@vtex/admin-ui`
 * const state = useCollapsible()
 * <Collapsible state={state}>
 *   <Collapsible.Header label="Title goes here">
 *     {children}
 *   </Collapsible.Header>
 *   <Collapsible.Content>{content}</Collapsible.Content>
 * </Collapsible>
 * ```
 */
export function Collapsible(props: CollapsibleProps) {
  const { styles, children, disabled, focusable, state, ...tokensProps } = props

  const reakitProps = {
    focusable,
    disabled,
    ...state,
  }

  return (
    <Box
      themeKey="components.collapsible.container"
      styles={styles}
      {...tokensProps}
    >
      <CollapsibleProvider {...reakitProps}>{children}</CollapsibleProvider>
    </Box>
  )
}

export function Header(props: CollapsibleHeaderProps) {
  const { children, label, styles, ...tokens } = props

  return (
    <Box
      element="header"
      themeKey="components.collapsible.header"
      styles={styles}
      {...tokens}
    >
      <Disclosure>{label}</Disclosure>
      <Box styles={{ display: 'flex' }}>{children}</Box>
    </Box>
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
            icon={<IconCaret direction={visible ? 'down' : 'right'} />}
            variant="text"
            styleOverrides={{
              color: 'text',
              '&:hover': { backgroundColor: 'transparent' },
              '&:active': { backgroundColor: 'transparent' },
            }}
          >
            {children}
          </Button>
        )
      }}
    </ReakitDisclosure>
  )
}

export function Content(props: CollapsibleContentProps) {
  const { children, styles, ...tokens } = props
  const disclosureProps = useCollapsibleContext()

  return (
    <DisclosureContent {...disclosureProps}>
      {(enhancedProps) => (
        <Box
          element="section"
          themeKey="components.collapsible.section"
          styles={styles}
          {...enhancedProps}
          {...tokens}
        >
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

export interface CollapsibleProps
  extends Pick<DisclosureProps, 'focusable' | 'disabled' | 'children'>,
    BorderTokensProps,
    LayoutTokensProps,
    SpaceTokensProps,
    Pick<ColorTokensProps, 'bg' | 'bc' | 'btc' | 'bbc' | 'blc' | 'brc'> {
  /** ThemeUI style prop */
  styles?: SxStyleProp
  /** useCollapsible hook return */
  state: DisclosureStateReturn
}

export interface CollapsibleHeaderProps
  extends SpaceTokensProps,
    Pick<ColorTokensProps, 'bg' | 'bc' | 'btc' | 'bbc' | 'blc' | 'brc' | 'c'> {
  /**
   * Disclosure Button label
   */
  label?: ReactNode
  /**
   * Actions panel
   */
  children?: ReactNode
  /** ThemeUI style prop */
  styles?: SxStyleProp
}

export interface CollapsibleContentProps
  extends Pick<LayoutTokensProps, 'display'>,
    FlexTokensProps,
    SpaceTokensProps,
    Pick<ColorTokensProps, 'bg' | 'bc' | 'btc' | 'bbc' | 'blc' | 'brc' | 'c'> {
  children?: ReactNode
  /** ThemeUI style prop */
  styles?: SxStyleProp
}

export { useDisclosureState as useCollapsible }
export { DisclosureStateReturn }
