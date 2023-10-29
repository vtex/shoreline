import React from 'react'

import { render } from '../test-utils'
import { Spinner } from './index'

describe('Spinner tests', () => {
  it('renders', async () => {
    const { container } = render(<Spinner />)

    expect(container).toBeInTheDocument()
  })
})
