import React from 'react'

import { render } from '../test-utils'
import { Avatar } from './index'

describe('Avatar', () => {
  it('should render the first letter', () => {
    const { getByText } = render(<Avatar label="Test" />)

    expect(getByText('T')).toBeTruthy()
  })
})
