import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'

import { Compose } from '../compose'

export const ClickableBubble = forwardRef<HTMLDivElement, ClickableBubbleProps>(
  function Clickable(props, ref) {
    return <Compose data-sl-clickable-bubble ref={ref} {...props} />
  }
)

export interface ClickableBubbleProps {
  children: ReactNode
}
