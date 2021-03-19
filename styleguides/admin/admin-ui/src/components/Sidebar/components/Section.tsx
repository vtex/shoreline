import React, {
  Children,
  cloneElement,
  forwardRef,
  ReactNode,
  Ref,
} from 'react'
import { isElement } from 'react-is'
import { useComposite } from './Aria'
import { SidebarSecretProps } from '../types'
import { Set } from '../../Set'
import { Text } from '../../Text'
import { SystemComponent } from '../../../types'
import { SidebarSectionItem } from './SectionItem'

const _SidebarSection = forwardRef(function SidebarSection(
  props: SidebarSectionProps,
  ref: Ref<HTMLButtonElement>
) {
  const { title, children, state, parentId } = props
  const compositeProps = useComposite(state)

  return (
    <Set
      ref={ref}
      spacing={0.5}
      orientation="vertical"
      csx={{
        themeKey: 'components.sidebar.section',
      }}
      {...compositeProps}
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
      {Children.map(
        children,
        (child, index) =>
          isElement(child) &&
          cloneElement(child, {
            parentId,
            state,
            key: index,
          })
      )}
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

export interface SidebarSectionProps
  extends SystemComponent,
    SidebarSecretProps {
  /**
   * `title` of a section. This is what separates each item's section.
   */
  title: string
  /**
   * `chilren` should be multiple `<Sidebar.SubItem {...props} />` components.
   * Those are the items over which clients will interact in order to
   * navigate between different pages.
   */
  children: ReactNode
}
