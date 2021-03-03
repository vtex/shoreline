import React, { cloneElement, FunctionComponentElement, useState } from 'react'
import { useSystem } from '@vtex/admin-core'
import { SystemComponent } from '../../types'
import {
  SidebarCorner,
  SidebarCornerProps,
  SidebarItem,
  SidebarSubItem,
  useCompositeState,
  CompositeGroup,
} from './components'
import { SidebarProvider } from './context'
import { AnchorDirection, CurrentItem } from './utils'
import { Box } from '../Box'
import { SidebarBackdrop } from './components/Backdrop'
import { SidebarCollapseButton } from './components/CollapseButton'
import { IconCaret } from '@vtex/admin-ui-icons'

export interface SidebarProps extends SystemComponent {
  children: FunctionComponentElement<Omit<SidebarCornerProps, 'secret'>>[]
  anchor?: AnchorDirection
}

/**
 * Sidebar component.
 *
 * The sidebar structure is as follows:
 * ```bash
 * └── Sidebar
 *  └── Sidebar.Header or Sidebar.Footer
 *       └── Sidebar.Item
 *           └── Sidebar.Section
 *               └── Sidebar.SubItem
 *```
 *
 * @example
 * ```jsx
 * import { Sidebar } from `@vtex/admin-ui`
 *
 * <Sidebar>
 *    <Sidebar.Header>
 *      <Sidebar.Item
 *         selected={false}
 *         onClick={() => console.log("Hello")}
 *         sections={[
 *            title: "Example",
 *            children: [
 *              <Sidebar.SubItem
 *                onClick={() => console.log("Hi")}>
 *                Example
 *              </Sidebar.SubItem>
 *            ]
 *         ]}
 *      />
 *    </Sidebar.Header>
 * </Sidebar>
 * ```
 */
export function Sidebar(props: SidebarProps) {
  const [currentItem, setCurrentItem] = useState<CurrentItem | null>(null)
  const [currentItemIsCollapsible, setCurrentItemIsCollapsible] = useState<
    boolean | null
  >(null)
  const [collapse, setCollapse] = useState<boolean | null>(null)
  const { children, anchor = 'left', styleOverrides = {}, ...baseProps } = props
  const { cn } = useSystem()

  const state = useCompositeState({
    baseId: 'sidebar-menu-base-id--',
    orientation: 'vertical',
    wrap: 'vertical',
    loop: true,
  })

  return (
    <SidebarProvider
      value={{
        direction: anchor,
        currentItem,
        currentItemIsCollapsible,
        collapse,
        setCurrentItem,
        setCurrentItemIsCollapsible,
        setCollapse,
      }}
    >
      <Box
        className={cn({
          themeKey: 'components.sidebar.container',
          backgroundColor:
            !currentItem || (collapse && currentItem) ? 'white' : '#F8F9FA',
          boxShadow:
            collapse && currentItem
              ? '1px 0px 6px -2px rgb(0 0 0 / 30%)'
              : 'unset',
          position: 'relative',
          maxWidth: '16rem',
        })}
      >
        <Box
          themeKey={'components.sidebar'}
          aria-label={'Sidebar'}
          role="navigation"
          {...state}
          {...baseProps}
          className={cn({
            position: 'absolute',
            maxWidth: '16rem',
            overflow: 'initial',
          })}
        >
          <CompositeGroup {...state} aria-label={'Sidebar'} role="navigation">
            {(itemProps) =>
              children.map((child) =>
                cloneElement(child, {
                  // @ts-ignore
                  // This line is ignored because there is no typing for
                  // this prop available, as it's supposed to be 'hidden'
                  // from the client. Another approach to pass this state
                  // down would be to use the Context API, but since every
                  // change in any of the context attributes would make the
                  // context consuming elements re-render, we end up avoiding
                  // unecessery re-renders everytime the user navigates
                  // through the keyboard.
                  secret: { parentState: state },
                  ...itemProps,
                })
              )
            }
          </CompositeGroup>
        </Box>
        {currentItemIsCollapsible && (
          <SidebarCollapseButton
            icon={<IconCaret direction={collapse ? 'right' : 'left'} />}
            isCollapsed={!!collapse}
          />
        )}
      </Box>
      {currentItem && <SidebarBackdrop />}
    </SidebarProvider>
  )
}

/**
 * Sidebar.Item corresponds to an item of the sidebar's
 * first level. It can hold multiple sections exhibited
 * when the sidebar is opened.
 *
 * The sidebar structure is as follows:
 * ```bash
 * └── Sidebar
 *  └── Sidebar.Header or Sidebar.Footer
 *       └── Sidebar.Item
 *           └── Sidebar.Section
 *               └── Sidebar.SubItem
 *```
 *
 * @example
 * ```jsx
 * import { Sidebar } from `@vtex/admin-ui`
 *
 * <Sidebar>
 *    <Sidebar.Header>
 *      <Sidebar.Item
 *         selected={false}
 *         onClick={() => console.log("Hello")}
 *         sections={[
 *            title: "Example",
 *            children: [
 *              <Sidebar.SubItem
 *                onClick={() => console.log("Hi")}>
 *                Example
 *              </Sidebar.SubItem>
 *            ]
 *         ]}
 *      />
 *    </Sidebar.Header>
 * </Sidebar>
 * ```
 */
Sidebar.Item = SidebarItem

/**
 * Sidebar.SubItem corresponds to an item of the sidebar's
 * second level, the top most sidebar level.
 * This is usually what users will use to navigate.
 *
 * The sidebar structure is as follows:
 * ```bash
 * └── Sidebar
 *  └── Sidebar.Header or Sidebar.Footer
 *       └── Sidebar.Item
 *           └── Sidebar.Section
 *               └── Sidebar.SubItem
 *```
 *
 * @example
 * ```jsx
 * import { Sidebar } from `@vtex/admin-ui`
 *
 * <Sidebar>
 *    <Sidebar.Header>
 *      <Sidebar.Item
 *         selected={false}
 *         onClick={() => console.log("Hello")}
 *         sections={[
 *            title: "Example",
 *            children: [
 *              <Sidebar.SubItem
 *                onClick={() => console.log("Hi")}>
 *                Example
 *              </Sidebar.SubItem>
 *            ]
 *         ]}
 *      />
 *    </Sidebar.Header>
 * </Sidebar>
 * ```
 */
Sidebar.SubItem = SidebarSubItem

/**
 * Sidebar.Header will stick whatever is inside
 * it to the top of the sidebar.
 *
 * The sidebar structure is as follows:
 * ```bash
 * └── Sidebar
 *  └── Sidebar.Header or Sidebar.Footer
 *       └── Sidebar.Item
 *           └── Sidebar.Section
 *               └── Sidebar.SubItem
 *```
 *
 * @example
 * ```jsx
 * import { Sidebar } from `@vtex/admin-ui`
 *
 * <Sidebar>
 *    <Sidebar.Header>
 *      <Sidebar.Item
 *         selected={false}
 *         onClick={() => console.log("Hello")}
 *         sections={[
 *            title: "Example",
 *            children: [
 *              <Sidebar.SubItem
 *                onClick={() => console.log("Hi")}>
 *                Example
 *              </Sidebar.SubItem>
 *            ]
 *         ]}
 *      />
 *    </Sidebar.Header>
 * </Sidebar>
 * ```
 */
Sidebar.Header = (props: Omit<SidebarCornerProps, 'scope' | 'secret'>) => (
  <SidebarCorner {...props} scope={'top'} />
)

/**
 * Sidebar.Footer will stick whatever is inside
 * it to the bottom of the sidebar.
 *
 * The sidebar structure is as follows:
 * ```bash
 * └── Sidebar
 *  └── Sidebar.Header or Sidebar.Footer
 *       └── Sidebar.Item
 *           └── Sidebar.Section
 *               └── Sidebar.SubItem
 *```
 *
 * @example
 * ```jsx
 * import { Sidebar } from `@vtex/admin-ui`
 *
 * <Sidebar>
 *    <Sidebar.Header>
 *      <Sidebar.Item
 *         selected={false}
 *         onClick={() => console.log("Hello, I'm at the top!")}
 *         sections={[
 *            title: "Example at the top",
 *            children: [
 *              <Sidebar.SubItem
 *                onClick={() => console.log("Hi, from the top!")}>
 *                I'm at the top
 *              </Sidebar.SubItem>
 *            ]
 *         ]}
 *      />
 *    </Sidebar.Header>
 *    <Sidebar.Footer>
 *      <Sidebar.Item
 *         selected={false}
 *         onClick={() => console.log("Hello, I'm at the bottom!")}
 *         sections={[
 *            title: "Example at the bottom",
 *            children: [
 *              <Sidebar.SubItem
 *                onClick={() => console.log("Hi, from the bottom!")}>
 *                I'm at the bottom
 *              </Sidebar.SubItem>
 *            ]
 *         ]}
 *      />
 *    </Sidebar.Footer>
 * </Sidebar>
 * ```
 */
Sidebar.Footer = (props: Omit<SidebarCornerProps, 'scope' | 'secret'>) => (
  <SidebarCorner {...props} scope={'bottom'} />
)
