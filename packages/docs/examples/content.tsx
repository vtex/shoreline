import React from 'react'
import { Container, Content, Text, Center } from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  return (
    <Container>
      <DecorativeBox color="purple">
        <Content>
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
