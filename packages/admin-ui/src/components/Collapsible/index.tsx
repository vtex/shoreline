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
import { Flex } from '@vtex/admin-primitives'

import {
  CollapsibleProvider,
  useCollapsibleContext,
  useRootContext,
  RootContext,
} from './context'
import { Button } from '../Button'
import type { SystemComponent, SystemComponentProps } from '../../types'
import { useGroup } from '../Group'
import { tag } from '@vtex/admin-ui-react'

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
  const isRoot = useRootContext()
  const { grouped } = useGroup()

  const { csx, children, disabled, focusable, state, ...collapsibleProps } =
    props

  const reakitProps = {
    focusable,
    disabled,
    ...state,
  }

  return (
    <AnimateSharedLayout>
      <tag.div
        as={motion.div}
        layout
        csx={{
          bg: 'light.primary',
          borderColor: 'mid.tertiary',
          borderStyle: 'solid',
          borderWidth: grouped ? 0 : 1,
          borderRadius: 'default',
          '.__admin-ui-collapsible--header': {
            padding: !isRoot ? 4 : 6,
            paddingLeft: !isRoot ? 0 : 2,
          },
          '.__admin-ui-collapsible--content': {
            paddingX: !isRoot ? 4 : 6,
            paddingBottom: !isRoot ? 4 : 6,
          },
          ...csx,
        }}
        {...collapsibleProps}
      >
        <CollapsibleProvider {...reakitProps}>
          <RootContext.Provider value={false}>{children}</RootContext.Provider>
        </CollapsibleProvider>
      </tag.div>
    </AnimateSharedLayout>
  )
}

export function Header(props: CollapsibleHeaderProps) {
  const { children, label, csx, ...headerProps } = props

  return (
    <tag.header
      as={motion.header}
      layout
      className="__admin-ui-collapsible--header"
      csx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        'div > button:nth-of-type(n+2)': {
          marginLeft: 1,
        },
        ...csx,
      }}
      {...headerProps}
    >
      <Disclosure>{label}</Disclosure>
      <Flex>{children}</Flex>
    </tag.header>
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
  const disclosureProps = useCollapsibleContext()

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
                <tag.div
                  className="__admin-ui-collapsible--content"
                  csx={{ ...csx }}
                  {...contentProps}
                >
                  {children}
                </tag.div>
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
