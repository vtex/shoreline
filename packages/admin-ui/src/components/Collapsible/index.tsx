import type { PropsWithoutRef, ReactNode } from 'react'
import React from 'react'
import type { DisclosureProps } from 'reakit/Disclosure'
import {
  useDisclosureState,
  Disclosure as ReakitDisclosure,
  DisclosureContent,
  DisclosureStateReturn,
} from 'reakit/Disclosure'
import { IconCaret } from '@vtex/admin-ui-icons'
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion'
import { Box, Flex } from '@vtex/admin-primitives'
import { useSystem } from '@vtex/admin-core'

import {
  CollapsibleProvider,
  useCollapsibleContext,
  TreeProvider,
  useTree,
} from './context'
import { Button } from '../Button'
import type { SystemComponent, SystemComponentProps } from '../../types'
import { useGroup } from '../Group'

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
  const { grouped } = useGroup()

  const { csx, children, disabled, focusable, state, ...collapsibleProps } =
    props

  const { cn } = useSystem()

  const reakitProps = {
    focusable,
    disabled,
    ...state,
  }

  const variant = {
    container: `components.collapsible.container${grouped ? '-grouped' : ''}`,
    header: `components.collapsible.header${!isRoot ? '-nested' : ''}`,
    content: `components.collapsible.section${!isRoot ? '-nested' : ''}`,
  }

  const className = cn({
    themeKey: variant.container,
    ...csx,
  })

  return (
    <AnimateSharedLayout>
      <motion.div layout className={className} {...collapsibleProps}>
        <CollapsibleProvider variant={variant} {...reakitProps}>
          <TreeProvider isRoot={false}>{children}</TreeProvider>
        </CollapsibleProvider>
      </motion.div>
    </AnimateSharedLayout>
  )
}

export function Header(props: CollapsibleHeaderProps) {
  const { children, label, csx, ...headerProps } = props
  const { variant } = useCollapsibleContext()
  const { cn } = useSystem()

  const className = cn({
    ...csx,
    themeKey: variant.header,
  })

  return (
    <motion.header layout className={className} {...headerProps}>
      <Disclosure>{label}</Disclosure>
      <Flex>{children}</Flex>
    </motion.header>
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
            icon={
              <IconCaret
                csx={{
                  transition: 'transform 150ms ease',
                  transform: `rotate(${visible ? 180 : 90}deg)`,
                }}
              />
            }
            variant="tertiary"
            csx={{
              color: 'dark.primary',
              textTransform: 'none',
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
  const { children, csx, ...contentProps } = props
  const { variant, ...disclosureProps } = useCollapsibleContext()

  return (
    <DisclosureContent {...disclosureProps}>
      {({ style, ...enhancedProps }) => {
        return (
          <AnimatePresence>
            {disclosureProps.visible && (
              <motion.section
                layout
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: {
                    transition: {
                      duration: 0.15,
                    },
                    height: 'auto',
                    opacity: 1,
                  },
                  hidden: {
                    transition: {
                      duration: 0.15,
                    },
                    height: 0,
                    opacity: 0,
                  },
                }}
                {...(enhancedProps as PropsWithoutRef<'section'>)}
              >
                <Box
                  csx={{ themeKey: variant.content, ...csx }}
                  {...contentProps}
                >
                  {children}
                </Box>
              </motion.section>
            )}
          </AnimatePresence>
        )
      }}
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
  extends SystemComponentProps<
    Pick<DisclosureProps, 'focusable' | 'disabled' | 'children'>
  > {
  /** useCollapsible hook return */
  state: DisclosureStateReturn
}

export interface CollapsibleHeaderProps extends SystemComponent {
  /**
   * Disclosure Button label
   */
  label?: ReactNode
  /**
   * Actions panel
   */
  children?: ReactNode
}

export interface CollapsibleContentProps extends SystemComponent {
  children?: ReactNode
}

export { useDisclosureState as useCollapsible }
export { DisclosureStateReturn }
