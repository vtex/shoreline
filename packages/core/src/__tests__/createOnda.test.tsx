import React from 'react'
import { merge } from '@vtex/admin-ui-util'
import { render } from '@testing-library/react'

import { createSystem, useSystem } from '../createSystem'
import { unstableCreateAdminUI, theme } from '../theme'

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

  it('should be able to create a custom theme', () => {
    const unstableSystem = unstableCreateAdminUI({
      space: {
        xxl: '200px',
      },
    })

    const [Provider] = createSystem({
      key: 'onda-design-system-tst',
      unstableSystem,
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
    const unstableSystem = unstableCreateAdminUI(
      merge(theme, {
        space: {
          xxl: '200px',
        },
      })
    )

    const [Provider] = createSystem({
      key: 'onda-design-system-tst',
      unstableSystem,
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
