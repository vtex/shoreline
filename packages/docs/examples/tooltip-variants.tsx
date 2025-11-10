import {
  IconButton,
  IconInfo,
  Tooltip,
  Stack,
  Text,
  Button,
} from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">With Icon Button</Text>
      <Tooltip label="This is a tooltip">
        <IconButton label="info">
          <IconInfo />
        </IconButton>
      </Tooltip>

      <Text variant="emphasis">With Regular Button</Text>
      <Tooltip label="Click to perform action">
        <Button>Hover me</Button>
      </Tooltip>

      <Text variant="emphasis">Long Tooltip Text</Text>
      <Tooltip label="This is a longer tooltip message that provides more detailed information about the element">
        <IconButton label="info">
          <IconInfo />
        </IconButton>
      </Tooltip>

      <Text variant="emphasis">Short Label</Text>
      <Tooltip label="Help">
        <IconButton label="info">
          <IconInfo />
        </IconButton>
      </Tooltip>
    </Stack>
  )
}
