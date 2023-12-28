import './styles.css'

import React from 'react'
import { Container, Content } from '../index'
import { Flex } from '../../flex'

export default {
  title: 'layouts/content',
}

export function Default() {
  return (
    <>
      <Container className="decorative-box bg-purple">
        <Content>
          <Flex>Content</Flex>
        </Content>
      </Container>
      <Container className="decorative-box bg-green">
        <Content narrow>
          <Flex>Narrow Content</Flex>
        </Content>
      </Container>
    </>
  )
}
