import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'

import { Sidebar, SidebarProps } from './index'
import { Box } from '../Box'
import { CornerScope } from './types'
import { Paragraph } from '../Paragraph'
import { bottomCornerItems, topCornerItems } from './testUtils'

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
        styles={{
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
        styles={{
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
              />
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
          styles={{
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
  anchor: 'left',
}
