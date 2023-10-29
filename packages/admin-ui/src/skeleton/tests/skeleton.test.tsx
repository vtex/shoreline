import React from 'react'
import { render } from '../../test-utils'

import { Skeleton } from '../index'

describe('Skeleton tests', () => {
  it('renders', async () => {
    const { container } = render(<Skeleton />)

    expect(container).toBeInTheDocument()
  })
})
