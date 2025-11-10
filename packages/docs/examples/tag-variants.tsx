import { Tag, Stack, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">Primary Variants</Text>
      <Stack horizontal>
        <Tag variant="primary" color="gray">
          Gray
        </Tag>
        <Tag variant="primary" color="red">
          Red
        </Tag>
        <Tag variant="primary" color="teal">
          Teal
        </Tag>
        <Tag variant="primary" color="purple">
          Purple
        </Tag>
        <Tag variant="primary" color="pink">
          Pink
        </Tag>
        <Tag variant="primary" color="green">
          Green
        </Tag>
        <Tag variant="primary" color="cyan">
          Cyan
        </Tag>
        <Tag variant="primary" color="blue">
          Blue
        </Tag>
        <Tag variant="primary" color="orange">
          Orange
        </Tag>
        <Tag variant="primary" color="yellow">
          Yellow
        </Tag>
      </Stack>

      <Text variant="emphasis">Secondary Variants</Text>
      <Stack horizontal>
        <Tag variant="secondary" color="gray">
          Gray
        </Tag>
        <Tag variant="secondary" color="red">
          Red
        </Tag>
        <Tag variant="secondary" color="teal">
          Teal
        </Tag>
        <Tag variant="secondary" color="purple">
          Purple
        </Tag>
        <Tag variant="secondary" color="pink">
          Pink
        </Tag>
        <Tag variant="secondary" color="green">
          Green
        </Tag>
        <Tag variant="secondary" color="cyan">
          Cyan
        </Tag>
        <Tag variant="secondary" color="blue">
          Blue
        </Tag>
        <Tag variant="secondary" color="orange">
          Orange
        </Tag>
        <Tag variant="secondary" color="yellow">
          Yellow
        </Tag>
      </Stack>

      <Text variant="emphasis">Sizes</Text>
      <Stack horizontal>
        <Tag size="normal">Normal</Tag>
        <Tag size="large">Large</Tag>
      </Stack>
    </Stack>
  )
}
