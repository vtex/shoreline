import React from 'react'
import { merge } from '@vtex/admin-ui-util'
import { render } from '@testing-library/react'
import { theme } from '@vtex/admin-ui-core'

import { createSystem, useSystem } from '../system'

describe('createSystem', () => {
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

  it('should be able to create a custom theme', () => {
    const [Provider] = createSystem({
      key: 'onda-design-system-tst',
      experimentalTheme: {
        space: {
          xxl: '200px',
        },
      },
    })

    function Div() {
      const { cn } = useSystem()

      return (
        <div
          className={cn({
            padding: 'xxl',
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

    expect(getByTestId('div')).toHaveStyleRule('padding', '200px')
  })

  it('should be able to create a custom theme using theme as base', () => {
    const [Provider] = createSystem({
      key: 'onda-design-system-tst',
      experimentalTheme: merge(theme, {
        space: {
          xxl: '200px',
        },
      }),
    })

    function Div() {
      const { cn } = useSystem()

      return (
        <div
          className={cn({
            margin: 2,
            padding: 'xxl',
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

    expect(getByTestId('div')).toHaveStyleRule('margin', '0.5rem')
    expect(getByTestId('div')).toHaveStyleRule('padding', '200px')
  })
})
