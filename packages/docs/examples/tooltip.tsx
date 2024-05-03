import { IconButton, IconInfo, Tooltip } from '@vtex/shoreline'

export default function Example() {
  return (
    <Tooltip label="Tooltip text">
      <IconButton label="info">
        <IconInfo />
      </IconButton>
    </Tooltip>
  )
}
