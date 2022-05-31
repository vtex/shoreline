import React from 'react'
import { render, axe } from '../../test-utils'

import { List } from './index'

describe('List tests', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(
      <List>
        <List.Item>Item</List.Item>
      </List>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
