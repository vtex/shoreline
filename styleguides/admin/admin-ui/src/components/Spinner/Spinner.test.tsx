import React from 'react'
import { render } from '../../test-utils'
import { axe } from 'jest-axe'

import { Spinner } from './index'

describe('Spinner tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Spinner
        data-testid="spinner"
        csx={{
          bg: 'azure',
        }}
      />
    )

    expect(getByTestId('spinner')).toHaveStyleRule('background-color', 'azure')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(<Spinner />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(<Spinner />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
