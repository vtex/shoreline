import React from 'react'
import { render, axe } from '../../test-utils'
import { VisuallyHidden } from '..'

describe('Tag tests', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(
      <div>
        <VisuallyHidden>
          <label htmlFor="search">Hidden Label</label>
        </VisuallyHidden>
        <input id="search" type="search" placeholder="A11y Search Input" />
      </div>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
