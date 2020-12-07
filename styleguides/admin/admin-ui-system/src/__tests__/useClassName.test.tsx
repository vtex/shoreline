import React from 'react'
import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import { useClassName } from '../hooks'
import { createThemeProvider } from '../createSystem'

describe('cn test', () => {
  const theme = {
    space: ['0px', '2px', '4px'],
    sizes: {
      half: '50%',
      full: '100%',
    },
    components: {
      alert: {
        bg: 'red',
        color: 'white',
        padding: 2,
        width: 'full',
      },
    },
  }

  it('should be able to consume themeKeys', () => {
    const {
      result: { current: className },
    } = renderHook(() => useClassName({ themeKey: 'components.alert' }), {
      wrapper: createThemeProvider(theme),
    })

    const { getByTestId } = render(
      <div data-testid="alert" className={className}>
        alert
      </div>
    )

    expect(getByTestId('alert')).toHaveStyleRule('padding', '4px')
    expect(getByTestId('alert')).toHaveStyleRule('background-color', 'red')
    expect(getByTestId('alert')).toHaveStyleRule('color', 'white')
    expect(getByTestId('alert')).toHaveStyleRule('width', '100%')
  })

  it('should be able to styleElements', () => {
    const {
      result: { current: className },
    } = renderHook(
      () =>
        useClassName({
          bg: 'blue',
          width: '20px',
        }),
      { wrapper: createThemeProvider(theme) }
    )

    const { getByTestId } = render(
      <div data-testid="box" className={className}>
        alert
      </div>
    )

    expect(getByTestId('box')).toHaveStyleRule('background-color', 'blue')
    expect(getByTestId('box')).toHaveStyleRule('width', '20px')
  })
})
