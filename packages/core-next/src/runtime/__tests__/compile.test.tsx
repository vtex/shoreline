import React from 'react'
import { render } from '@testing-library/react'

import { parse, compile } from './setup'

describe('compile', () => {
  it('should compile', () => {
    const { getByTestId } = render(
      <div
        data-testid="test"
        className={compile(
          parse({
            padding: 4,
            margin: 3,
          })
        )}
      />
    )

    const node = getByTestId('test')

    expect(node).toHaveStyleRule('padding', '8px')
    expect(node).toHaveStyleRule('margin', '4px')
  })
})
