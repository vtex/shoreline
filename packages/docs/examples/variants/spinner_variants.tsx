import { Spinner } from '@vtex/shoreline'

export function DefaultSpinner() {
  return <Spinner description="loading" />
}

export function SpinnerWithCustomDescription() {
  return <Spinner description="Processing your request..." />
}
