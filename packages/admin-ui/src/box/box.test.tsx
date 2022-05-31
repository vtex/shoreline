import React from 'react'

import { render } from '../test-utils'
import { Box } from '../index'

describe('Box', () => {
  it('should be polymorphic', () => {
    const { getByTestId } = render(
      <Box data-testid="box" as="a" href="https://github.com/">
        link content
      </Box>
    )

    expect(getByTestId('box')).toHaveProperty('href', 'https://github.com/')
  })
})
