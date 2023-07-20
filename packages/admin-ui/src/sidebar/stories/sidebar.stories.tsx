import React from 'react'
import type { Meta } from '@storybook/react'
import { data } from '../data'
import {
  Sidebar,
  SidebarSection,
  SidebarLinkGroup,
  SidebarLink,
} from '../index'
import { getShellIcon } from '../shell-icons'
import { csx } from '@vtex/admin-ui-core'

export default {
  title: 'admin-ui-review/sidebar',
} as Meta

export const Example = () => {
  function useData() {
    // fetch pro admin-grahql que te retorna um data
    const aaa = [...data.top, ...data.bottom]

    // transform o seu data de forma ótima para consumo
    // filter / map / reduce
    const optimalData = aaa // data transformado

    /**
  [
    { sectionName: '', sectionIcon: '', items: [


      { title: '' / undefined, items: [
        ...items de navegação
        title: '', link: '', isExternal: 'target blank da vida (masterdata catálogo se não migrarem)'

      ] }

    ] }
  ]
   */

    return optimalData
  }

  const completeData = useData()

  return (
    <div
      className={csx({
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gap: '1rem',
        height: '100vh',
      })}
    >
      <Sidebar>
        {completeData.map((item, index) => (
          <SidebarSection icon={getShellIcon(item.icon)} title={item.label}>
            <SidebarLinkGroup>
              <SidebarLink href="#overview">Overview</SidebarLink>
              <SidebarLink href="#sales-performance">
                Sales performance
              </SidebarLink>
              <SidebarLink href="#web-page-performance">
                Web page performance
              </SidebarLink>
            </SidebarLinkGroup>
          </SidebarSection>
        ))}
      </Sidebar>
    </div>
  )
}
