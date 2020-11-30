import React, { PropsWithoutRef, ReactNode } from 'react'
import {
  useDisclosureState,
  Disclosure as ReakitDisclosure,
  DisclosureContent,
  DisclosureProps,
  DisclosureStateReturn,
} from 'reakit/Disclosure'
import { IconCaret } from '@vtex/admin-ui-icons'
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion'
import { useClassName } from '@vtex/admin-ui-system'

import { Box } from '../Box'
import {
  CollapsibleProvider,
  useCollapsibleContext,
  TreeProvider,
  useTree,
} from './context'
import { Button } from '../Button'
import { Overridable } from '../../types'
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

  const {
    styleOverrides,
    children,
    disabled,
    focusable,
    state,
    ...collapsibleProps
  } = props

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

  const className = useClassName({
    props: {
      styles: styleOverrides,
    },
    themeKey: variant.container,
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
  const { children, label, styleOverrides, ...headerProps } = props
  const { variant } = useCollapsibleContext()
  const className = useClassName({
    props: {
      styles: styleOverrides,
    },
    themeKey: variant.header,
  })

  return (
    <motion.header layout className={className} {...headerProps}>
      <Disclosure>{label}</Disclosure>
      <Box styles={{ display: 'flex' }}>{children}</Box>
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
  const { children, styleOverrides, ...contentProps } = props
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
                style={{
                  overflow: 'auto',
                }}
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
                  styles={styleOverrides}
                  themeKey={variant.content}
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
