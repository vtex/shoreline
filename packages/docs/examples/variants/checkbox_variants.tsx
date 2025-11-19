import { Checkbox } from '@vtex/shoreline'

export function DefaultCheckbox() {
  return <Checkbox>Default Checkbox</Checkbox>
}

export function CheckedCheckbox() {
  return <Checkbox defaultChecked>Checked Checkbox</Checkbox>
}

export function DisabledCheckbox() {
  return <Checkbox disabled>Disabled Checkbox</Checkbox>
}

export function IndeterminateCheckbox() {
  return <Checkbox indeterminate>Indeterminate Checkbox</Checkbox>
}

export function CheckedDisabledCheckbox() {
  return (
    <Checkbox defaultChecked disabled>
      Checked and Disabled Checkbox
    </Checkbox>
  )
}

export function IndeterminateDisabledCheckbox() {
  return (
    <Checkbox indeterminate disabled>
      Indeterminate and Disabled Checkbox
    </Checkbox>
  )
}
