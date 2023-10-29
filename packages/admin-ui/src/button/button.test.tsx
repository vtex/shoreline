import React from 'react'

import { render } from '../test-utils'
import { Button } from './index'

describe('button', () => {
  it('renders', async () => {
    const { container } = render(<Button>Button</Button>)

    expect(container).toBeInTheDocument()
  })
})
