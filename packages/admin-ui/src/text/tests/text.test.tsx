import React from 'react'
import { render, axe } from '../../test-utils'

import { Text } from '../index'

describe('Text tests', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(
      <>
        <Text variant="pageTitle">Span</Text>
        <Text variant="title1">Span</Text>
        <Text variant="title2">Span</Text>
        <Text variant="action1">Span</Text>
        <Text variant="action2">Span</Text>
        <Text variant="body">Span</Text>
        <Text variant="detail">Span</Text>

        <Text tone="primary">Span</Text>
        <Text tone="secondary">Span</Text>
        <Text tone="warning">Span</Text>
        <Text tone="critical">Span</Text>
        <Text tone="positive">Span</Text>
        <Text tone="info">Span</Text>
      </>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
