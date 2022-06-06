import React from 'react'
import { render, axe } from '../test-utils'
import { Tag } from './tag'

describe('Tag tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Tag label="tag-1" data-testid="tag" csx={{ bg: 'coral' }} />
    )

    expect(getByTestId('tag')).toHaveStyleRule('background', 'coral')
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <>
        <Tag label="Rio de Janeiro" palette="cyan" />
        <Tag label="Rio de Janeiro" palette="purple" />
        <Tag label="Rio de Janeiro" palette="green" />
        <Tag label="Rio de Janeiro" palette="red" />
        <Tag label="Rio de Janeiro" palette="purple" />
        <Tag label="Rio de Janeiro" palette="orange" />
        <Tag label="Rio de Janeiro" palette="teal" />
        <Tag label="Rio de Janeiro" palette="gray" />
        <Tag label="tag-1" />
      </>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
