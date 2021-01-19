import React from 'react'
import { render } from '@testing-library/react'

import { createEmotionInstance, createThemeConsumers } from '../createSystem'

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

  it('should be able to consume a themeKey', () => {
    const emotionInstance = createEmotionInstance('admin-ui-system')
    const { cn } = createThemeConsumers(theme, emotionInstance)

    const { getByTestId } = render(
      <div
        data-testid="alert"
        className={cn({
          themeKey: 'components.alert',
        })}
      >
        alert
      </div>
    )

    expect(getByTestId('alert')).toHaveStyleRule('padding', '4px')
    expect(getByTestId('alert')).toHaveStyleRule('background-color', 'red')
    expect(getByTestId('alert')).toHaveStyleRule('color', 'white')
    expect(getByTestId('alert')).toHaveStyleRule('width', '100%')
  })

  it('should be able to consume a theme', () => {
    const emotionInstance = createEmotionInstance('admin-ui-system')
    const { cn } = createThemeConsumers(theme, emotionInstance)

    const { getByRole } = render(
      <button
        className={cn({
          padding: 1,
          margin: 2,
        })}
      >
        button
      </button>
    )

    expect(getByRole('button')).toHaveStyleRule('padding', '2px')
    expect(getByRole('button')).toHaveStyleRule('margin', '4px')
  })
})
