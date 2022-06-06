import React from 'react'
import { render, axe } from '../test-utils'
import { Tag } from './tag'

const LABEL = 'Rio de Janeiro'

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
        <Tag label={LABEL} variant="cyan" />
        <Tag label={LABEL} variant="purple" />
        <Tag label={LABEL} variant="green" />
        <Tag label={LABEL} variant="red" />
        <Tag label={LABEL} variant="purple" />
        <Tag label={LABEL} variant="orange" />
        <Tag label={LABEL} variant="teal" />
        <Tag label={LABEL} variant="gray" />
        <Tag label="tag-1" />
        <Tag label="tag-1" size="large" />
        <Tag label="tag-1" size="normal" />
      </>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
