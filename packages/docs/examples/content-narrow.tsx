import { Center, Container, Content, Text } from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  return (
    <Container>
      <DecorativeBox color="purple">
        <Content narrow>
          <DecorativeBox color="blue" height="10rem">
            <Center>
              <Text>Content</Text>
            </Center>
          </DecorativeBox>
        </Content>
      </DecorativeBox>
    </Container>
  )
}
