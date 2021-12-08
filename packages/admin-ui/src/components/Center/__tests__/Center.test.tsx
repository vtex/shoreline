import React from 'react'

import { render } from '../../../test-utils'
import { Center } from '../index'

describe('Center', () => {
  it('should apply csx', () => {
    const { getByTestId } = render(
      <Center data-testid="flex" csx={{ bg: 'coral' }}>
        Center
      </Center>
    )

    expect(getByTestId('flex')).toHaveStyleRule('background', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(<Center>Center</Center>)

    expect(asFragment()).toMatchSnapshot()
  })
})
