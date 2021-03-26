import React, { ReactNode, useMemo } from 'react'
import { HTMLAttributesWithRef } from 'reakit-utils/ts'
import { Box } from '@vtex/admin-primitives'
import { CompositeItem, useCompositeState } from '../Aria'
import { SystemComponent } from '../../../../types'
import { SidebarDisclosureProps, SidebarDisclosure } from './Disclosure'
import { SidebarSection } from './Section'
import { ItemProvider, ArrowKeys } from './shared'
import { useSidebarContext } from '../../context'
import { SCALES } from '../../consts'

function _SidebarItem(props: SidebarItemProps) {
  const { children, onClick, label, uniqueKey, icon, ...baseProps } = props

  const state = useSidebarContext()
  const selected = useMemo(() => state.isSelected(uniqueKey), [
    uniqueKey,
    state.isSelected,
  ])
  const compositeState = useCompositeState({
    orientation: 'vertical',
    loop: true,
  })

  const expandable = state.isExpandable(children)
  const translate = selected && !state.layout.reduced ? '3rem' : '-13.5rem'

  const handleSelection = () => {
    const currItem = {
      uniqueKey,
      expandable,
    }
    state.setSelectedItem(currItem)
  }

  const handleExpansion = () => {
    if (!expandable) return

    state.layout.expand()
  }

  const handleOnClick = (event: React.MouseEvent<any, MouseEvent>) => {
    handleSelection()
    handleExpansion()
    onClick?.(event)
  }

  const handleOnKeyDown = (
    event: React.KeyboardEvent<any>,
    itemProps: HTMLAttributesWithRef
  ) => {
    if (typeof itemProps.onKeyDown === 'function') {
      itemProps.onKeyDown(event)

      // Opens sidebar and focus on the first sidebar sub item
      if (event.key === ArrowKeys.Right) {
        handleSelection()
        handleExpansion()
        // We need a delay here in order to allow the object to mount,
        // otherwise there would be nothing to focus on
        setTimeout(() => {
          compositeState.first()
        }, 10)
      }
    }
  }

  const handleShowToggle = (event: React.MouseEvent<any, MouseEvent>) => {
    state.layout.showToggle()

    if (typeof baseProps.onMouseEnter === 'function') {
      baseProps.onMouseEnter(event)
    }
  }

  const handleHideToggle = (event: React.MouseEvent<any, MouseEvent>) => {
    state.layout.hideToggle()

    if (typeof baseProps.onMouseLeave === 'function') {
      baseProps.onMouseLeave(event)
    }
  }

  return (
    <CompositeItem
      {...state.composite}
      role="menuitem"
      aria-label={label}
      id={label}
    >
      {(itemProps) => (
        <>
          <SidebarDisclosure
            {...itemProps}
            icon={icon}
            selected={state.isSelected(uniqueKey)}
            label={label}
            onClick={handleOnClick}
            onKeyDown={(event) => handleOnKeyDown(event, itemProps)}
          />
          <Box
            element="ul"
            csx={{
              position: 'absolute',
              top: 0,
              maxWidth: SCALES.COLLAPSIBLE_AREA_WIDTH,
              height: '100%',
              width: '12.5rem',
              padding: '1.5rem 0.5rem',
              outline: 'none',
              overflow: 'auto',
              backgroundColor: 'transparent',
              transform: `translateX(${translate})`,
            }}
            data-testid={`${label}-ul`}
            {...baseProps}
            onMouseEnter={handleShowToggle}
            onMouseLeave={handleHideToggle}
          >
            <Box
              aria-label={`${label} menu`}
              element="li"
              csx={{
                listStyle: 'none',
              }}
            >
              <ItemProvider
                value={{
                  state: compositeState,
                  id: label,
                  selected,
                }}
              >
                {children}
              </ItemProvider>
            </Box>
          </Box>
        </>
      )}
    </CompositeItem>
  )
}

export const SidebarItem = Object.assign(_SidebarItem, {
  /**
   * Each `<Sidebar.Item.Section />` is responsible for
   * defining the scope of a section within a sidebar item.
   * It holds the `<Sidebar.Item.Section.Item />`, which
   * is the last node of the sidebar tree and where clients
   * will interact most to perform actions.
   *
   * @example
   * ```jsx
   * import { Sidebar } from `@vtex/admin-ui`
   *
   * <Sidebar>
   *    <Sidebar.Header>
   *      <Sidebar.Item selected={someCondition} onClick={() => navigate({ to: "/promotions" })}>
   *       <Sidebar.Item.Section title={"Promotions"}>
   *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/promotions" })}>
   *         Promotions
   *        </Sidebar.Item.Section.Item>
   *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/discounts"})} >
   *         Discounts
   *        </Sidebar.Item.Section.Item>
   *       </Sidebar.Item.Section>
   *      </Sidebar.Item>
   *    </Sidebar.Header>
   *    <Sidebar.Footer>
   *      <Sidebar.Item selected={someCondition} onClick={() => navigate({ to: "/apps" })}>
   *       <Sidebar.Item.Section title={"Apps"}>
   *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/apps" })}>
   *         Installed apps
   *        </Sidebar.Item.Section.Item>
   *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/apps-store"})} >
   *         Apps store
   *        </Sidebar.Item.Section.Item>
   *       </Sidebar.Item.Section>
   *      </Sidebar.Item>
   *    </Sidebar.Footer>
   * </Sidebar>
   * ```
   */
  Section: SidebarSection,
})

export interface SidebarItemProps
  extends SidebarDisclosureProps,
    SystemComponent {
  children?: ReactNode
  /**
   * `label` is set as the components` composite ID and
   * its value is displayed on its disclosure's tooltip.
   */
  label: string
  /**
   * key that defines your item as unique
   */
  uniqueKey: string | number
}
