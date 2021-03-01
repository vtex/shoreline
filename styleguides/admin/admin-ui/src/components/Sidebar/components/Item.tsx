import React, { cloneElement } from 'react'
import { SidebarDisclosure, SidebarDisclosureProps } from './Disclosure'
import { ReakitMenuItem, useMenuState } from './AriaSidebar'
import { SystemComponent } from '../../../types'
import { SidebarSectionProps } from './Section'
import { Sidebar } from '..'

export interface SidebarItemProps
  extends SidebarDisclosureProps,
    SystemComponent {
  collapsed?: boolean
  sections?: Omit<SidebarSectionProps, 'secret'>[]
}

/**
 * SidebarItem corresponds to an item of the sidebar's
 * first level. It must used along with the Sidebar.Header
 * or Sidebar.Footer, both inside the Sidebar. That is because
 * they share the same context, and to enforce the proper
 * usage of this component.
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
export function SidebarItem(props: Omit<SidebarItemProps, 'secret'>) {
  const { collapsed, sections, ...baseProps } = props

  const {
    // @ts-ignore
    secret: { state: parentState },
  } = props

  const state = useMenuState({
    orientation: 'vertical',
    loop: true,
  })

  return (
    <ReakitMenuItem {...parentState}>
      {(itemProps) => (
        <>
          <SidebarDisclosure
            {...props}
            {...itemProps}
            secret={{
              state,
            }}
          />
          {sections?.map(
            ({ title, children }, index) =>
              children.length > 0 && (
                <ReakitMenuItem {...state} key={index}>
                  {(itemProps) =>
                    cloneElement(
                      <Sidebar.Section title={title} {...baseProps}>
                        {children}
                      </Sidebar.Section>,
                      { ...itemProps, secret: { state } }
                    )
                  }
                </ReakitMenuItem>
              )
          )}
        </>
      )}
    </ReakitMenuItem>
  )
}
