import allProps from '../__props__'

export function getComponentProps(name: string): ComponentProps | undefined {
  const reference = allProps[name]

  return reference
}

interface Example {
  description: string
  language: string
  code: string
}

interface PropsRecord {
  name: string
  type: string
  description: string
  optional: boolean
  defaultValue: string | null
  deprecated: boolean
  status: string
  examples: Example[]
}

interface ComponentProps {
  filename: string
  name: string
  description: string
  deprecated: boolean
  status: string
  examples: Example[]
  props: PropsRecord[]
}
