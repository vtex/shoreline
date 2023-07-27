import React, { useState } from 'react'
import type { Meta } from '@storybook/react'
import { data as mockedData } from '../data'
import {
  Sidebar,
  SidebarSection,
  SidebarLinkGroup,
  SidebarLink,
} from '../index'
import { getShellIcon } from '../shell-icons'
import { csx } from '@vtex/admin-ui-core'
import { Divider } from '@vtex/admin-ui'
import * as styles from '../sidebar.css'

export default {
  title: 'admin-ui-review/sidebar',
} as Meta

export const Example = () => {
  function useData() {
    // fetch pro admin-grahql que te retorna um data
    const aaa = [...mockedData.top, ...mockedData.bottom]

    const optimalData = aaa.map((section) => ({
      ...section,
      groups: section.sections,
    })) // data transformado

    return optimalData
  }

  const [selectedPage, setSelectedPage] = useState()

  const data = useData()

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
        {data.map((section, index) => (
          <SidebarSection
            icon={getShellIcon(section.icon)}
            title={section.label}
          >
            {section.groups.map((group) => (
              <SidebarLinkGroup title={group.title}>
                {group.subItems.map((pageLink) => (
                  <SidebarLink
                    href={pageLink.path}
                    onClick={() => setSelectedPage(pageLink.englishLabel)}
                    active={pageLink.englishLabel === selectedPage}
                  >
                    {pageLink.label}
                  </SidebarLink>
                ))}
              </SidebarLinkGroup>
            ))}
          </SidebarSection>
        ))}
      </Sidebar>
    </div>
  )
}

export const Mobile = () => {
  function useData() {
    // fetch pro admin-grahql que te retorna um data
    const aaa = [...mockedData.top, ...mockedData.bottom]

    const optimalData = aaa.map((section) => ({
      ...section,
      groups: section.sections,
    })) // data transformado

    return optimalData
  }

  const [selectedPage, setSelectedPage] = useState()

  const data = useData()

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
        {data.map((section, index) => (
          <>
            <SidebarSection
              icon={getShellIcon(section.icon)}
              title={section.label}
            >
              {section.groups.map((group) => (
                <SidebarLinkGroup title={group.title}>
                  {group.subItems.map((pageLink) => (
                    <SidebarLink
                      href={pageLink.path}
                      onClick={() => setSelectedPage(pageLink.englishLabel)}
                      active={pageLink.englishLabel === selectedPage}
                    >
                      {pageLink.label}
                    </SidebarLink>
                  ))}
                </SidebarLinkGroup>
              ))}
            </SidebarSection>
            <Divider className={styles.sidebarSectionDivider} />
          </>
        ))}
      </Sidebar>
    </div>
  )
}
