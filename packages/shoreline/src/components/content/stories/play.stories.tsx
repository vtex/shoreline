import './styles.css'
import type { ContentProps } from '../index'
import { Container, Content } from '../index'
import { Flex } from '../../flex'

export default {
  title: 'components/content',
  argTypes: {
    narrow: {
      control: 'boolean',
      description: 'Decrease the space token in top and bottom padding.',
    },
  },
  args: {
    narrow: false,
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
}

export function Play(args: ContentProps) {
  return (
    <Container className="decorative-box bg-purple">
      <Content {...args}>
        <Flex>Content</Flex>
      </Content>
    </Container>
  )
}
