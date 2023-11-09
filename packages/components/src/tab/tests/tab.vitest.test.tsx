import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { TabProvider, TabList, Tab, TabPanel } from '../index'

describe('tab', () => {
  test('renders', () => {
    const { container } = render(
      <TabProvider>
        <TabList>
          <Tab>Tab 1</Tab>
        </TabList>
        <TabPanel>Tab 1</TabPanel>
      </TabProvider>
    )

    expect(container.querySelector('[data-sl-tab-list]')).toBeInTheDocument()
    expect(container.querySelector('[data-sl-tab]')).toBeInTheDocument()
    expect(container.querySelector('[data-sl-tab-panel]')).toBeInTheDocument()
  })
})
