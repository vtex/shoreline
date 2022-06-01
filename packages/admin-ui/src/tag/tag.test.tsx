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
        <Tag label={LABEL} palette="cyan" />
        <Tag label={LABEL} palette="purple" />
        <Tag label={LABEL} palette="green" />
        <Tag label={LABEL} palette="red" />
        <Tag label={LABEL} palette="purple" />
        <Tag label={LABEL} palette="orange" />
        <Tag label={LABEL} palette="teal" />
        <Tag label={LABEL} palette="gray" />
        <Tag label="tag-1" />
      </>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
