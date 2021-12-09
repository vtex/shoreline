import React from 'react'
import { render, axe } from '../../test-utils'

import { List } from './index'

describe('List tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <List data-testid="list" csx={{ bg: 'azure' }}>
        <List.Item data-testid="listitem" csx={{ bg: 'coral' }}>
          Item
        </List.Item>
      </List>
    )

    expect(getByTestId('list')).toHaveStyleRule('background', 'azure')
    expect(getByTestId('listitem')).toHaveStyleRule('background', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <>
        <List>
          <List.Item>Item</List.Item>
        </List>
        <List as="ol">
          <List.Item>Item</List.Item>
        </List>
      </>
    )

    expect(asFragment()).toMatchSnapshot()
  })

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
