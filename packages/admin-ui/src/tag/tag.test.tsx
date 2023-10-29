import React from 'react'
import { render } from '../test-utils'
import { Tag } from './tag'

const LABEL = 'Rio de Janeiro'

describe('Tag tests', () => {
  it('renders', async () => {
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

    expect(container).toBeInTheDocument()
  })
})
