import React from 'react'

import { TabPanel } from '@vtex/admin-ui'

export interface PanelProps {
  id: string
  children: Node
}

export function Panel(props: PanelProps) {
  return (
    <TabPanel className="panel-content" id={props.id}>
      {props.children}
    </TabPanel>
  )
}
