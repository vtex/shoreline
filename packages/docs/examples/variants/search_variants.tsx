import { Search } from '@vtex/shoreline'

export function DefaultSearch() {
  return <Search placeholder="Search..." />
}

export function DisabledSearch() {
  return <Search disabled placeholder="Disabled search" />
}

export function LoadingSearch() {
  return <Search loading placeholder="Loading search" />
}
