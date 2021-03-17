import React, {
  cloneElement,
  FunctionComponentElement,
  ReactElement,
  useState,
} from 'react'
import { useSystem } from '@vtex/admin-core'
import { SystemComponent } from '../../types'
import {
  SidebarCorner,
  SidebarCornerProps,
  SidebarItem,
  useCompositeState,
  CompositeGroup,
  _SidebarItemProps,
  SidebarSection,
  SidebarSubItem,
  SidebarItemProps,
  SidebarSectionProps,
  SidebarSubItemProps,
} from './components'
import { SidebarProvider } from './context'
import { AnchorDirection, Item } from './types'
import { Box } from '@vtex/admin-primitives'
import { SidebarBackdrop } from './components/Backdrop'
import { SidebarSkeleton } from './components/Skeleton'

export interface SidebarProps extends SystemComponent {
  children: FunctionComponentElement<SidebarCornerProps>[]
  direction?: AnchorDirection
  loading?: boolean
}

function _Sidebar(props: SidebarProps) {
  const [currentItem, setCurrentItem] = useState<Item | null>(null)
  const [selectedItemsMemory, setSelectedItemsMemory] = useState<Item[]>([])
  const [collapse, setCollapse] = useState<boolean | null>(null)
  const {
    children,
    loading = false,
    direction = 'left',
    csx = {},
    ...baseProps
  } = props
  const { cn } = useSystem()

  const rootState = useCompositeState({
    baseId: 'sidebar-menu-base-id--',
    orientation: 'vertical',
    wrap: 'vertical',
    loop: true,
  })

  return (
    <SidebarProvider
      value={{
        direction,
        currentItem,
        collapse,
        selectedItemsMemory,
        setCurrentItem,
        setCollapse,
        setSelectedItemsMemory,
        rootState,
      }}
    >
      <Box
        className={cn({
          themeKey: 'components.sidebar.container',
          backgroundColor:
            !currentItem ||
            !currentItem.isCollapsible ||
            (collapse && currentItem.isCollapsible)
              ? 'light.primary'
              : 'sidebar.light',
          boxShadow:
            collapse && currentItem
              ? '1px 0px 6px -2px rgb(0 0 0 / 30%)'
              : 'unset',
        })}
        csx={csx}
      >
        <Box
          element="nav"
          csx={{
            themeKey: 'components.sidebar.root',
          }}
          {...rootState}
          {...baseProps}
        >
          {!loading && (
            <CompositeGroup {...rootState} aria-label={'Sidebar'} role="menu">
              {(itemProps) =>
                children.map((child) =>
                  cloneElement(child as ReactElement, {
                    ...itemProps,
                  })
                )
              }
            </CompositeGroup>
          )}
          {loading && (
            <>
              <SidebarSkeleton />
              <SidebarSkeleton amount={2} />
            </>
          )}
        </Box>
      </Box>
      <SidebarBackdrop />
    </SidebarProvider>
  )
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
 *   <Sidebar.Header>
 *     <Sidebar.Item
 *        selected={someCondition}
 *        onClick={() => alert('hey from header')}
 *      >
 *        <Sidebar.Section
 *          title={section.title}
 *          index={topCornerItems.length + idx}
 *        >
 *          <Sidebar.SubItem
 *            key={label}
 *            onClick={() => alert('hi from header')}
 *          >
 *            {label}
 *          </Sidebar.SubItem>
 *        </Sidebar.Section>
 *     </Sidebar.Item>
 *   </Sidebar.Header>
 *   <Sidebar.Footer>
 *     <Sidebar.Item
 *        selected={someCondition}
 *        onClick={() => alert('hey from footer')}
 *      >
 *        <Sidebar.Section
 *          title={section.title}
 *          index={topCornerItems.length + idx}
 *        >
 *          <Sidebar.SubItem
 *            key={label}
 *            onClick={() => alert('hi from footer')}
 *          >
 *            {label}
 *          </Sidebar.SubItem>
 *        </Sidebar.Section>
 *     </Sidebar.Item>
 *   </Sidebar.Footer>
 * </Sidebar>
 * ```
 */
export const Sidebar = Object.assign(_Sidebar, {
  /**
   * Sidebar.Header will stick whatever is inside
   * of it to the top of the sidebar.
   *
   * @example
   * ```jsx
   * import { Sidebar } from `@vtex/admin-ui`
   *
   * <Sidebar>
   *   <Sidebar.Header>
   *     <Sidebar.Item
   *        selected={someCondition}
   *        onClick={() => alert('hey from header')}
   *      >
   *        <Sidebar.Section
   *          title={section.title}
   *          index={topCornerItems.length + idx}
   *        >
   *          <Sidebar.SubItem
   *            key={label}
   *            onClick={() => alert('hi from header')}
   *          >
   *            {label}
   *          </Sidebar.SubItem>
   *        </Sidebar.Section>
   *     </Sidebar.Item>
   *   </Sidebar.Header>
   * </Sidebar>
   * ```
   */
  Header: (props: SidebarCornerProps) => (
    <SidebarCorner {...props} scope={'top'} />
  ),
  /**
   * Sidebar.Footer will stick whatever is inside
   * of it to the bottom of the sidebar.
   *
   * @example
   * ```jsx
   * import { Sidebar } from `@vtex/admin-ui`
   *
   * <Sidebar>
   *   <Sidebar.Footer>
   *     <Sidebar.Item
   *        selected={someCondition}
   *        onClick={() => alert('hey from footer')}
   *      >
   *        <Sidebar.Section
   *          title={section.title}
   *          index={topCornerItems.length + idx}
   *        >
   *          <Sidebar.SubItem
   *            key={label}
   *            onClick={() => alert('hi from footer')}
   *          >
   *            {label}
   *          </Sidebar.SubItem>
   *        </Sidebar.Section>
   *     </Sidebar.Item>
   *   </Sidebar.Footer>
   * </Sidebar>
   * ```
   */
  Footer: (props: SidebarCornerProps) => (
    <SidebarCorner {...props} scope={'bottom'} />
  ),
  /**
   * Sidebar.Item corresponds to an item of the sidebar's
   * first level. It can hold multiple sections exhibited
   * when the sidebar is expanded.
   *
   * @example
   * ```jsx
   * import { Sidebar } from `@vtex/admin-ui`
   *
   * <Sidebar>
   *   <Sidebar.Header>
   *     <Sidebar.Item
   *        selected={someCondition}
   *        onClick={() => alert('hey from header')}
   *      >
   *        <Sidebar.Section
   *          title={section.title}
   *          index={topCornerItems.length + idx}
   *        >
   *          <Sidebar.SubItem
   *            key={label}
   *            onClick={() => alert('hi from header')}
   *          >
   *            {label}
   *          </Sidebar.SubItem>
   *        </Sidebar.Section>
   *     </Sidebar.Item>
   *   </Sidebar.Header>
   *   <Sidebar.Footer>
   *     <Sidebar.Item
   *        selected={someCondition}
   *        onClick={() => alert('hey from footer')}
   *      >
   *        <Sidebar.Section
   *          title={section.title}
   *          index={topCornerItems.length + idx}
   *        >
   *          <Sidebar.SubItem
   *            key={label}
   *            onClick={() => alert('hi from footer')}
   *          >
   *            {label}
   *          </Sidebar.SubItem>
   *        </Sidebar.Section>
   *     </Sidebar.Item>
   *   </Sidebar.Footer>
   * </Sidebar>
   * ```
   */
  Item: (props: SidebarItemProps) => <SidebarItem {...props} />,
  /**
   * Sidebar.Section corresponds to an item of the sidebar's
   * second level. It holds and divides sub items between
   * sections. It only appears when the sidebar is open.
   *
   * @example
   * ```jsx
   * import { Sidebar } from `@vtex/admin-ui`
   *
   * <Sidebar>
   *   <Sidebar.Header>
   *     <Sidebar.Item
   *        selected={someCondition}
   *        onClick={() => alert('hey from header')}
   *      >
   *        <Sidebar.Section
   *          title={section.title}
   *          index={topCornerItems.length + idx}
   *        >
   *          <Sidebar.SubItem
   *            key={label}
   *            onClick={() => alert('hi from header')}
   *          >
   *            {label}
   *          </Sidebar.SubItem>
   *        </Sidebar.Section>
   *     </Sidebar.Item>
   *   </Sidebar.Header>
   *   <Sidebar.Footer>
   *     <Sidebar.Item
   *        selected={someCondition}
   *        onClick={() => alert('hey from footer')}
   *      >
   *        <Sidebar.Section
   *          title={section.title}
   *          index={topCornerItems.length + idx}
   *        >
   *          <Sidebar.SubItem
   *            key={label}
   *            onClick={() => alert('hi from footer')}
   *          >
   *            {label}
   *          </Sidebar.SubItem>
   *        </Sidebar.Section>
   *     </Sidebar.Item>
   *   </Sidebar.Footer>
   * </Sidebar>
   * ```
   */
  Section: (props: SidebarSectionProps) => <SidebarSection {...props} />,
  /**
   * Sidebar.SubItem are the items which clients will interact
   * most. They are the further and final node of the Sidebar.
   *
   * @example
   * ```jsx
   * import { Sidebar } from `@vtex/admin-ui`
   *
   * <Sidebar>
   *   <Sidebar.Header>
   *     <Sidebar.Item
   *        selected={someCondition}
   *        onClick={() => alert('hey from header')}
   *      >
   *        <Sidebar.Section
   *          title={section.title}
   *          index={topCornerItems.length + idx}
   *        >
   *          <Sidebar.SubItem
   *            key={label}
   *            onClick={() => alert('hi from header')}
   *          >
   *            {label}
   *          </Sidebar.SubItem>
   *        </Sidebar.Section>
   *     </Sidebar.Item>
   *   </Sidebar.Header>
   *   <Sidebar.Footer>
   *     <Sidebar.Item
   *        selected={someCondition}
   *        onClick={() => alert('hey from footer')}
   *      >
   *        <Sidebar.Section
   *          title={section.title}
   *          index={topCornerItems.length + idx}
   *        >
   *          <Sidebar.SubItem
   *            key={label}
   *            onClick={() => alert('hi from footer')}
   *          >
   *            {label}
   *          </Sidebar.SubItem>
   *        </Sidebar.Section>
   *     </Sidebar.Item>
   *   </Sidebar.Footer>
   * </Sidebar>
   * ```
   */
  SubItem: (props: SidebarSubItemProps) => <SidebarSubItem {...props} />,
})
