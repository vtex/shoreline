import React from 'react'

import { render } from '../test-utils'
import { Center } from './center'

describe('Center', () => {
  it('renders', async () => {
    const { container } = render(<Center>Center</Center>)

    expect(container).toBeInTheDocument()
  })
})

describe('Abbr', () => {})
