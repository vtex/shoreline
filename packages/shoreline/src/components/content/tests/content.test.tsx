import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { Container, Content } from '../index'

describe('content', () => {
  test('renders', () => {
    const { container } = render(
      <Container>
        <Content>Content</Content>
      </Container>
    )

    expect(container.querySelector('[data-sl-container]')).toBeInTheDocument()
    expect(container.querySelector('[data-sl-content]')).toBeInTheDocument()
  })
})
