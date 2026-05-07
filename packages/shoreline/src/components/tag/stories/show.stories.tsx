import { Stack } from '../../stack'
import { Tag } from '../index'

export default {
  title: 'components/tag',
}

export function Show() {
  return (
    <Stack>
      <Tag>Default</Tag>
      Primary
      <Stack horizontal>
        <Tag color="red" variant="primary">
          Red
        </Tag>
        <Tag color="yellow" variant="primary">
          Yellow
        </Tag>
        <Tag color="orange" variant="primary">
          Orange
        </Tag>
        <Tag color="pink" variant="primary">
          Pink
        </Tag>
        <Tag color="purple" variant="primary">
          Purple
        </Tag>
        <Tag color="blue" variant="primary">
          Blue
        </Tag>
        <Tag color="cyan" variant="primary">
          Cyan
        </Tag>
        <Tag color="teal" variant="primary">
          Teal
        </Tag>
        <Tag color="green" variant="primary">
          Green
        </Tag>
        <Tag color="gray" variant="primary">
          Gray
        </Tag>
      </Stack>
      Secondary
      <Stack horizontal>
        <Tag color="red" variant="secondary">
          Red
        </Tag>
        <Tag color="yellow" variant="secondary">
          Yellow
        </Tag>
        <Tag color="orange" variant="secondary">
          Orange
        </Tag>
        <Tag color="pink" variant="secondary">
          Pink
        </Tag>
        <Tag color="purple" variant="secondary">
          Purple
        </Tag>
        <Tag color="blue" variant="secondary">
          Blue
        </Tag>
        <Tag color="cyan" variant="secondary">
          Cyan
        </Tag>
        <Tag color="teal" variant="secondary">
          Teal
        </Tag>
        <Tag color="green" variant="secondary">
          Green
        </Tag>
        <Tag color="gray" variant="secondary">
          Gray
        </Tag>
      </Stack>
      <Stack>
        <Tag color="gray" variant="primary" size="normal">
          Normal badge
        </Tag>
        <Tag color="gray" variant="primary" size="large">
          Large badge
        </Tag>
      </Stack>
    </Stack>
  )
}
