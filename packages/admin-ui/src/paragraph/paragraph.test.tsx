import React from 'react'
import { render } from '../test-utils'

import { Paragraph } from './index'

describe('Paragraph', () => {
  it('renders', async () => {
    const { container } = render(<Paragraph>test paragraph</Paragraph>)

    expect(container).toBeInTheDocument()
  })
})
