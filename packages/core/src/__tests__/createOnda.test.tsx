import React from 'react'
import { render } from '@testing-library/react'

import { createSystem, useSystem } from '../createSystem'

describe('context', () => {
  it('should execute the system', () => {
    const [Provider] = createSystem({
      key: 'onda-design-system-tst',
    })

    function Div() {
      const { cn } = useSystem()

      return (
        <div
          className={cn({
            padding: 2,
          })}
          data-testid="div"
        />
      )
    }

    const { getByTestId } = render(
      <Provider>
        <Div />
      </Provider>
    )

    expect(getByTestId('div')).toHaveStyleRule('padding', '0.5rem')
  })
})
