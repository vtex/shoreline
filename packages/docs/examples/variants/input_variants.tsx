import { Input } from '@vtex/shoreline'

export function DefaultInput() {
  return <Input placeholder="Default input" />
}

export function InputWithPrefix() {
  return <Input prefix="$" placeholder="Price" />
}

export function InputWithSuffix() {
  return <Input suffix="kg" placeholder="Weight" />
}

export function InputWithPrefixAndSuffix() {
  return <Input prefix="$" suffix="USD" placeholder="Amount" />
}

export function DisabledInput() {
  return <Input disabled placeholder="Disabled input" />
}

export function ErrorInput() {
  return <Input error placeholder="Error input" />
}
