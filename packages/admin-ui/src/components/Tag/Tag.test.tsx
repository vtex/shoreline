import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { ThemeProvider } from '@vtex/admin-core'
import { IconAdd } from '@vtex/admin-ui-icons'

import { Tag } from './index'

describe('Tag tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Tag label="tag-1" data-testid="tag" csx={{ bg: 'coral' }} />
      </ThemeProvider>
    )

    expect(getByTestId('tag')).toHaveStyleRule('background-color', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
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
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
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
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
