import React from 'react'

import { render } from '../test-utils'
import { Center } from './center'

describe('Center', () => {
  it('should apply csx', () => {
    const { getByTestId } = render(
      <Center data-testid="center" csx={{ bg: 'coral' }}>
        Center
      </Center>
    )

    expect(getByTestId('center')).toHaveStyleRule('background', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(<Center>Center</Center>)

    expect(asFragment()).toMatchSnapshot()
  })
})
