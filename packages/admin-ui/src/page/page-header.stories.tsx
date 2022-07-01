import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { PageHeader } from './index'
import { Tabs, useTabState } from '../components/Tabs'
import type { PageHeaderProps } from './page-header'

export default {
  title: 'admin-ui-review/page/page-header',
  component: PageHeader,
} as Meta

export const Playground: Story<PageHeaderProps> = (args) => {
  const tabs = useTabState({ selectedId: '1' })

  return (
    <Tabs state={tabs}>
      <PageHeader {...args} />
    </Tabs>
  )
}
