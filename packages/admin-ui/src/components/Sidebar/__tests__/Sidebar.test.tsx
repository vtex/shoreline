import React from 'react'
import { render, axe, jestMatchMedia, withState } from '../../../test-utils'

import {
  Sidebar,
  SidebarGroup,
  SidebarItem,
  SidebarSection,
  SidebarSectionItem,
  useSidebarState,
} from '../index'

const SidebarWithState = withState(Sidebar, () => useSidebarState())

describe('Sidebar', () => {
  beforeEach(jestMatchMedia)

  it('should not have a11y violations', async () => {
    const { container } = render(
      <SidebarWithState>
        <SidebarGroup>
          <SidebarItem label="label 1" uniqueKey="label 1" icon="Icon">
            <SidebarSection title="title 1">
              <SidebarSectionItem onClick={() => null}>Item</SidebarSectionItem>
            </SidebarSection>
          </SidebarItem>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarItem icon="icon" label="label 2" uniqueKey="label 2" />
        </SidebarGroup>
      </SidebarWithState>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
