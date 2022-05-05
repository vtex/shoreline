import React from 'react'

import { render } from '../../test-utils'
import { Box } from '../index'

describe('Box', () => {
  it('should accept styles styles', () => {
    const { getByTestId } = render(
      <Box data-testid="box" csx={{ bg: 'coral' }}>
        box content
      </Box>
    )

    expect(getByTestId('box')).toHaveStyleRule('background', 'coral')
  })

  it('should be polymorphic', () => {
    const { getByTestId } = render(
      <Box data-testid="box" as="a" href="https://github.com/">
        link content
      </Box>
    )

    expect(getByTestId('box')).toHaveProperty('href', 'https://github.com/')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(<Box>box content</Box>)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot using element', () => {
    const { asFragment } = render(
      <Box as="a" href="https://github.com/">
        link content
      </Box>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
