import '../../../dist/styles.min.css'
import '../tooltip.css'
import React, { useState } from 'react'

import {
  Tooltip,
  TooltipProvider,
  TooltipAnchor,
  TooltipArrow,
  TooltipPopover,
} from '../index'

export default {
  title: 'shoreline-components/tooltip',
}

export function Default() {
  return (
    <div
      style={{
        padding: '1rem',
      }}
    >
      <Tooltip text="Tooltip text">
        <button>I</button>
      </Tooltip>
    </div>
  )
}

export function Controlled() {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{
        padding: '1rem',
      }}
    >
      <Tooltip open={open} setOpen={setOpen} text="Tooltip text">
        <button>{open ? 'Visible' : 'Hidden'}</button>
      </Tooltip>
    </div>
  )
}

export function Composition() {
  return (
    <div
      style={{
        padding: '1rem',
      }}
    >
      <TooltipProvider>
        <TooltipAnchor asChild>
          <button>i</button>
        </TooltipAnchor>
        <TooltipPopover>
          <TooltipArrow />
          Tooltip text
        </TooltipPopover>
      </TooltipProvider>
    </div>
  )
}
