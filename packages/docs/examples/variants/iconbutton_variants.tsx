import { IconButton, IconTrash } from '@vtex/shoreline'

export function PrimaryIconButton() {
  return (
    <IconButton label="Delete" variant="primary">
      <IconTrash />
    </IconButton>
  )
}

export function SecondaryIconButton() {
  return (
    <IconButton label="Delete" variant="secondary">
      <IconTrash />
    </IconButton>
  )
}

export function TertiaryIconButton() {
  return (
    <IconButton label="Delete" variant="tertiary">
      <IconTrash />
    </IconButton>
  )
}

export function CriticalIconButton() {
  return (
    <IconButton label="Delete" variant="critical">
      <IconTrash />
    </IconButton>
  )
}

export function CriticalTertiaryIconButton() {
  return (
    <IconButton label="Delete" variant="criticalTertiary">
      <IconTrash />
    </IconButton>
  )
}
