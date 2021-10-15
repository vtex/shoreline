import React from 'react'
import { render, axe } from '../../test-utils'
import { IconAdd } from '@vtex/admin-ui-icons'

import { Tag } from './index'

describe('Tag tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Tag label="tag-1" data-testid="tag" csx={{ bg: 'coral' }} />
    )

    expect(getByTestId('tag')).toHaveStyleRule('background-color', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <>
        <Tag label="Rio de Janeiro" palette="cyan" />
        <Tag label="Rio de Janeiro" palette="purple" />
        <Tag label="Rio de Janeiro" palette="green" />
        <Tag label="Rio de Janeiro" palette="red" />
        <Tag label="Rio de Janeiro" palette="purple" />
        <Tag label="Rio de Janeiro" palette="orange" />
        <Tag label="Rio de Janeiro" palette="teal" />
        <Tag label="tag-1" />
        <Tag label="tag-2" size="regular" />
        <Tag label="tag-3" size="small" />
        <Tag label="tag-4" handleDelete={() => {}} />
        <Tag label="tag-5" icon={<IconAdd />} handleDelete={() => {}} />
      </>
    )

    expect(asFragment()).toMatchSnapshot()
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
        <Tag label="tag-1" />
        <Tag label="tag-2" size="regular" />
        <Tag label="tag-3" size="small" />
        <Tag label="tag-4" handleDelete={() => {}} />
        <Tag label="tag-5" icon={<IconAdd />} handleDelete={() => {}} />
      </>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
