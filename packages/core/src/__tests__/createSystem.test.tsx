import React from 'react'

import { createSystem, useSystem } from '../createSystem'
import { render } from '@testing-library/react'

describe('context', () => {
  it('should execute the system', () => {
    const { SystemProvider } = createSystem({
      id: 'app',
      theme: {
        space: [0, 1, 2, 4, 8],
      },
    })

    function Div() {
      const { cn } = useSystem()
      return (
        <div
          className={cn({
            padding: 4,
          })}
          data-testid="div"
        />
      )
    }

    const { getByTestId } = render(
      <SystemProvider>
        <Div />
      </SystemProvider>
    )

    expect(getByTestId('div')).toHaveStyleRule('padding', '8px')
  })
})
