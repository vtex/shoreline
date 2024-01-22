import React, { useState } from 'react'

import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
  TooltipPopover,
} from '../index'

export default {
  title: 'components/tooltip',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Default() {
  return (
    <Tooltip label="Tooltip text">
      <button>I</button>
    </Tooltip>
  )
}

export function Placement() {
  return (
    <Tooltip placement="right" label="Tooltip text">
      <button>I</button>
    </Tooltip>
  )
}

export function Controlled() {
  const [open, setOpen] = useState(false)

  return (
    <Tooltip open={open} setOpen={setOpen} label="Tooltip text">
      <button>{open ? 'Visible' : 'Hidden'}</button>
    </Tooltip>
  )
}

export function Composition() {
  return (
    <TooltipProvider>
      <TooltipTrigger asChild>
        <button>i</button>
      </TooltipTrigger>
      <TooltipPopover>
        <TooltipArrow />
        Tooltip text
      </TooltipPopover>
    </TooltipProvider>
  )
}
