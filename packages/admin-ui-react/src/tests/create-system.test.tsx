import React from 'react'
import { merge } from '@vtex/admin-ui-util'
import { render } from '@testing-library/react'
import { theme } from '@vtex/admin-ui-core'

import { ThemeProvider as Provider, useSystem } from '../system'

describe.skip('createSystem', () => {
  it('should execute the system', () => {
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
      <Provider
        experimentalTheme={{
          experimentalTheme: {
            space: {
              xxl: '200px',
            },
          },
        }}
      >
        <Div />
      </Provider>
    )

    expect(getByTestId('div')).toHaveStyleRule('padding', '200px')
  })

  it('should be able to create a custom theme using theme as base', () => {
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
      <Provider
        experimentalTheme={{
          experimentalTheme: merge(theme, {
            space: {
              xxl: '200px',
            },
          }),
        }}
      >
        <Div />
      </Provider>
    )

    expect(getByTestId('div')).toHaveStyleRule('margin', '0.5rem')
    expect(getByTestId('div')).toHaveStyleRule('padding', '200px')
  })
})
