import React, { forwardRef, ReactNode, Ref } from 'react'
import { useComposite } from '../Aria'
import { Set, SetProps } from '../../../Set'
import { Text } from '../../../Text'
import { SidebarSectionItem } from './SectionItem'
import { useItemContext } from './shared'
import { SCALES } from '../../consts'

const _SidebarSection = forwardRef(function SidebarSection(
  props: SidebarSectionProps,
  ref: Ref<HTMLButtonElement>
) {
  const { title, children, ...baseProps } = props
  const { state } = useItemContext()
  const compositeProps = useComposite({ ...state, baseId: 'section--' })

  return (
    <Set
      spacing={0.5}
      orientation="vertical"
      csx={{
        width: SCALES.SIDEBAR_SECTION_WIDTH,
        paddingBottom: 8,
        zIndex: 'sidebarUl',
      }}
      {...compositeProps}
      {...baseProps}
      ref={ref}
    >
      <Text
        variant="action"
        csx={{
          color: 'dark.primary',
          fontSize: '0.6875rem',
          paddingBottom: '0.8125rem',
          paddingX: '0.75rem',
          fontSettings: 'medium',
        }}
      >
        {title}
      </Text>
      {children}
    </Set>
  )
})

export const SidebarSection = Object.assign(_SidebarSection, {
  /**
   * The last node of the sidebar tree. This is where clients
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
  Item: SidebarSectionItem,
})

export interface SidebarSectionProps extends SetProps {
  /**
   * `title` of a section. This is what separates each item's section.
   */
  title: string
  /**
   * `chilren` should be multiple `<Sidebar.SubItem {...props} />` components.
   * Those are the items over which clients will interact in order to
   * navigate between different pages.
   */
  children?: ReactNode
}
