import React from 'react'
import { render } from '../../test-utils'
import { VisuallyHidden } from '..'

describe('VisuallyHidden tests', () => {
  it('renders', async () => {
    const { container } = render(
      <div>
        <VisuallyHidden>
          <label htmlFor="search">Hidden Label</label>
        </VisuallyHidden>
        <input id="search" type="search" placeholder="A11y Search Input" />
      </div>
    )

    expect(container).toBeInTheDocument()
  })
})
