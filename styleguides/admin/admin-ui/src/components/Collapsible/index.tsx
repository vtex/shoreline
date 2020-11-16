import React, { ReactNode } from 'react'
import {
  useDisclosureState,
  Disclosure as ReakitDisclosure,
  DisclosureContent,
  DisclosureProps,
  DisclosureStateReturn,
} from 'reakit/Disclosure'

import { IconCaret } from '../../icons'
import { Box } from '../Box'
import {
  CollapsibleProvider,
  useCollapsibleContext,
  TreeProvider,
  useTree,
} from './context'
import { Button } from '../Button'
import { Overridable } from '../../types'

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
  const { isRoot } = useTree()

  const {
    styleOverrides,
    children,
    disabled,
    focusable,
    state,
    ...boxProps
  } = props

  const reakitProps = {
    focusable,
    disabled,
    ...state,
  }

  const variant = {
    container: 'components.collapsible.container',
    header: `components.collapsible.header${!isRoot ? '-nested' : ''}`,
    content: `components.collapsible.section${!isRoot ? '-nested' : ''}`,
  }

  return (
    <Box themeKey={variant.container} styles={styleOverrides} {...boxProps}>
      <CollapsibleProvider variant={variant} {...reakitProps}>
        <TreeProvider isRoot={false}>{children}</TreeProvider>
      </CollapsibleProvider>
    </Box>
  )
}

export function Header(props: CollapsibleHeaderProps) {
  const { children, label, styleOverrides, ...boxProps } = props
  const { variant } = useCollapsibleContext()

  return (
    <Box
      element="header"
      themeKey={variant.header}
      styles={styleOverrides}
      {...boxProps}
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
            variant="tertiary"
            styleOverrides={{
              color: 'text.primary',
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
  const { children, styleOverrides, ...tokens } = props
  const { variant, ...disclosureProps } = useCollapsibleContext()

  return (
    <DisclosureContent {...disclosureProps}>
      {(enhancedProps) => (
        <Box
          element="section"
          themeKey={variant.content}
          styles={styleOverrides}
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
    Overridable {
  /** useCollapsible hook return */
  state: DisclosureStateReturn
}

export interface CollapsibleHeaderProps extends Overridable {
  /**
   * Disclosure Button label
   */
  label?: ReactNode
  /**
   * Actions panel
   */
  children?: ReactNode
}

export interface CollapsibleContentProps extends Overridable {
  children?: ReactNode
}

export { useDisclosureState as useCollapsible }
export { DisclosureStateReturn }
