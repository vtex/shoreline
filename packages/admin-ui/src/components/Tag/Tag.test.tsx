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
        <Tag label="tag-1" palette="green" />
        <Tag label="tag-2" palette="yellow" />
        <Tag label="tag-3" palette="red" />
        <Tag label="tag-4" palette="black" />
        <Tag label="tag-5" palette="purple" />
        <Tag label="tag-6" />
        <Tag label="tag-7" size="regular" />
        <Tag label="tag-8" size="small" />
        <Tag label="tag-9" handleDelete={() => {}} />
        <Tag label="tag-10" icon={<IconAdd />} handleDelete={() => {}} />
      </>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <>
        <Tag label="tag-1" palette="green" />
        <Tag label="tag-2" palette="yellow" />
        <Tag label="tag-3" palette="red" />
        <Tag label="tag-4" palette="black" />
        <Tag label="tag-5" palette="purple" />
        <Tag label="tag-6" />
        <Tag label="tag-7" size="regular" />
        <Tag label="tag-8" size="small" />
        <Tag label="tag-9" handleDelete={() => {}} />
        <Tag label="tag-10" icon={<IconAdd />} handleDelete={() => {}} />
      </>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
