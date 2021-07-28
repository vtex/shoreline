import React, {
  Children,
  cloneElement,
  Fragment,
  ReactElement,
  ReactNode,
  forwardRef,
  Ref,
} from 'react'
import { Box, BoxProps } from '@vtex/admin-primitives'
import {
  SidebarCorner,
  SidebarItem,
  CompositeGroup,
  SidebarBackdrop,
  SidebarSkeleton,
} from './components'
import { SidebarState } from './hooks'
import { SidebarContext } from './context'
import { SCALES } from './consts'

const _Sidebar = forwardRef(function Sidebar(
  props: SidebarProps,
  ref: Ref<any>
) {
  const {
    children,
    loading = false,
    csx = {},
    rootProps = {},
    state,
    ...baseProps
  } = props

  return (
    <Fragment>
      <Box
        csx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: SCALES.MAX_SIDEBAR_WIDTH,
          minWidth: SCALES.FIXED_AREA_WIDTH,
          outline: 'none',
          borderRight: '1px solid',
          borderColor: 'mid.tertiary',
          bg: state.isReduced() ? 'light.primary' : 'sidebar.light',
          boxShadow:
            state.selectedItem?.expandable && state.layout.reduced
              ? '1px 0px 6px -2px rgb(0 0 0 / 30%)'
              : 'unset',
          ...rootProps.csx,
        }}
        {...rootProps}
      >
        <Box
          ref={ref}
          element="nav"
          csx={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingY: '0.625rem',
            maxWidth: '16rem',
            height: '100%',
            width: '100%',
            overflow: 'initial',
          }}
          {...state.composite}
          {...baseProps}
        >
          <SidebarContext.Provider value={state}>
            {!loading && (
              <CompositeGroup
                {...state.composite}
                aria-label={'Sidebar'}
                role="menu"
              >
                {(itemProps) =>
                  Children.map(children, (child, index) =>
                    cloneElement(child as ReactElement, {
                      ...itemProps,
                      index,
                      key: index,
                    })
                  )
                }
              </CompositeGroup>
            )}
          </SidebarContext.Provider>
          {loading && (
            <Fragment>
              <SidebarSkeleton />
              <SidebarSkeleton amount={2} />
            </Fragment>
          )}
        </Box>
      </Box>
      <Box
        csx={{
          bg: state.isReduced() ? 'light.primary' : 'sidebar.light',
          width: '3.4375rem',
          top: 0,
          bottom: 0,
          zIndex: 'sidebarOverlay',
          position: 'fixed',
          maxHeight: '100%',
        }}
      />
      <SidebarBackdrop
        state={state}
        loading={
          state.selectedItem?.expandable && loading && !state.layout.reduced
        }
      />
    </Fragment>
  )
})

/**
 * Sidebar component.
 *
 * The sidebar structure is as follows:
 * ```bash
 * └── Sidebar
 *  └── Sidebar.Top or Sidebar.Bottom
 *       └── Sidebar.Item
 *           └── Sidebar.Item.Section
 *               └── Sidebar.Item.Section.Item
 *```
 *
 * @example
 * ```jsx
 * import { Sidebar, useSidebarState } from `@vtex/admin-ui`
 *
 * const state = useSidebarState()
 *
 * <Sidebar state={state}>
 *    <Sidebar.Top>
 *      <Sidebar.Item label="Label">
 *       <Sidebar.Item.Section title="Title">
 *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/admin/page1" })}>
 *         Title
 *        </Sidebar.Item.Section.Item>
 *       </Sidebar.Item.Section>
 *      </Sidebar.Item>
 *    </Sidebar.Top>
 *    <Sidebar.Bottom>
 *      <Sidebar.Item label="Label">
 *       <Sidebar.Item.Section title="Title">
 *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/admin/page2" })}>
 *         Title
 *        </Sidebar.Item.Section.Item>
 *       </Sidebar.Item.Section>
 *      </Sidebar.Item>
 *    </Sidebar.Bottom>
 * </Sidebar>
 * ```
 */
export const Sidebar = Object.assign(_Sidebar, {
  /**
   * Sidebar.Top will stick whatever is inside
   * of it to the top of the sidebar.
   *
   * @example
   * ```jsx
   * import { Sidebar } from `@vtex/admin-ui`
   *
   * <Sidebar>
   *    <Sidebar.Top>
   *      <Sidebar.Item>
   *       <Sidebar.Item.Section title="Example">
   *        <Sidebar.Item.Section.Item>
   *          Example
   *        </Sidebar.Item.Section.Item>
   *       </Sidebar.Item.Section>
   *      </Sidebar.Item>
   *    </Sidebar.Top>
   * </Sidebar>
   * ```
   */
  Top: SidebarCorner,
  /**
   * Sidebar.Bottom will stick whatever is inside
   * of it to the bottom of the sidebar.
   *
   * @example
   * ```jsx
   * import { Sidebar } from `@vtex/admin-ui`
   *
   * <Sidebar>
   *    <Sidebar.Bottom>
   *      <Sidebar.Item>
   *       <Sidebar.Item.Section title="Example">
   *        <Sidebar.Item.Section.Item>
   *          Example
   *        </Sidebar.Item.Section.Item>
   *       </Sidebar.Item.Section>
   *      </Sidebar.Item>
   *    </Sidebar.Bottom>
   * </Sidebar>
   * ```
   */
  Bottom: SidebarCorner,
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
   *    <Sidebar.Bottom>
   *      <Sidebar.Item uniqueKey="" label="Example">
   *       <Sidebar.Item.Section title="Example">
   *        <Sidebar.Item.Section.Item>
   *          Example
   *        </Sidebar.Item.Section.Item>
   *       </Sidebar.Item.Section>
   *      </Sidebar.Item>
   *    </Sidebar.Bottom>
   * </Sidebar>
   *```
   */
  Item: SidebarItem,
})

export { useSidebarState, SidebarState } from './hooks'

export interface SidebarProps extends BoxProps<'nav'> {
  /**
   * Sidebar content element. Should follow the following
   * structure:
   *
   *```bash
   * └── Sidebar
   *    └── Sidebar.Top or Sidebar.Bottom
   *       └── Sidebar.Item
   *           └── Sidebar.Item.Section
   *               └── Sidebar.Item.Section.Item
   *```
   */
  children: ReactNode
  /**
   * Whether the sidebar is loading or not.
   * @default false
   */
  loading?: boolean
  /**
   * Sidebar's state.
   * See `useSidebarState` for more information on this.
   */
  state: SidebarState
  /**
   * Sidebar root props. This element is the root sidebar's element.
   * If you're looking to customize the `nav` element within the
   * sidebar, use shorthand props instead.
   *
   * @default {}
   */
  rootProps?: BoxProps<'div'>
}
