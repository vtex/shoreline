import React from 'react'

import { render } from '../../../test-utils'
import { Page } from '../index'

describe('Page', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Page csx={{ bg: 'coral' }} data-testid="page" />
    )

    expect(getByTestId('page')).toHaveStyleRule('background', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(<Page />)

    expect(asFragment()).toMatchSnapshot()
  })
})
