import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'

import { Sidebar, SidebarProps } from './index'
import { Box } from '@vtex/admin-primitives'
import { CornerScope } from './types'
import { Paragraph } from '../Paragraph'
import { bottomCornerItems, SECTIONS, topCornerItems } from './testUtils'

export default {
  title: 'shell/Sidebar',
  component: Sidebar,
} as Meta

interface PlaygroundArgs extends SidebarProps {
  id: string
}

interface ItemCursor {
  index: number
  scope: CornerScope
}

export const Playground: Story<PlaygroundArgs> = (args) => {
  const [currentItem, setCurrentItem] = useState<ItemCursor>({
    index: 0,
    scope: 'top',
  })

  return (
    <>
      <Box
        csx={{
          height: 30,
          padding: 22,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '4px dashed black',
          margin: 1,
        }}
      >
        TOP BAR
      </Box>
      <Box
        csx={{
          display: 'flex',
          flexDirection: 'row',
          height: 'calc(100vh - 92px)',
          overflow: 'hidden',
        }}
      >
        <Sidebar {...args}>
          <Sidebar.Header>
            {topCornerItems.map((props, index) => (
              <Sidebar.Item
                {...props}
                selected={
                  currentItem.scope === 'top' && currentItem.index === index
                }
                onClick={() => setCurrentItem({ index, scope: 'top' })}
                key={index}
              >
                {SECTIONS[props.label].sections.map((section, idx) => (
                  <Sidebar.Section
                    title={section.title}
                    index={topCornerItems.length + idx}
                  >
                    {section.subItems.map((label) => (
                      <Sidebar.SubItem
                        key={label}
                        onClick={() => console.log(`hey`)}
                      >
                        {label}
                      </Sidebar.SubItem>
                    ))}
                  </Sidebar.Section>
                ))}
              </Sidebar.Item>
            ))}
          </Sidebar.Header>
          <Sidebar.Footer>
            {bottomCornerItems.map((props, index) => (
              <Sidebar.Item
                {...props}
                selected={
                  currentItem.scope === 'bottom' && currentItem.index === index
                }
                onClick={() => setCurrentItem({ index, scope: 'bottom' })}
                key={index}
              />
            ))}
          </Sidebar.Footer>
        </Sidebar>
        <Box
          csx={{
            width: '100%',
            height: 'auto',
            padding: 22,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '4px dashed black',
            margin: 1,
          }}
        >
          <Paragraph>APPS</Paragraph>
        </Box>
      </Box>
    </>
  )
}

Playground.args = {
  id: 'Sidebar',
  direction: 'left',
}
