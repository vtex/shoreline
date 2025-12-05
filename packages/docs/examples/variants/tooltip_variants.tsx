import { Button, IconButton, IconInfo, Tooltip } from '@vtex/shoreline'

export function DefaultTooltip() {
  return (
    <Tooltip label="This is a tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  )
}

export function TooltipWithIconButton() {
  return (
    <Tooltip label="Information tooltip">
      <IconButton label="info">
        <IconInfo />
      </IconButton>
    </Tooltip>
  )
}

export function TooltipTop() {
  return (
    <Tooltip label="Tooltip on top" placement="top">
      <Button>Top</Button>
    </Tooltip>
  )
}

export function TooltipBottom() {
  return (
    <Tooltip label="Tooltip on bottom" placement="bottom">
      <Button>Bottom</Button>
    </Tooltip>
  )
}

export function TooltipLeft() {
  return (
    <Tooltip label="Tooltip on left" placement="left">
      <Button>Left</Button>
    </Tooltip>
  )
}

export function TooltipRight() {
  return (
    <Tooltip label="Tooltip on right" placement="right">
      <Button>Right</Button>
    </Tooltip>
  )
}
