import React from 'react'
import { render } from '@testing-library/react'

import { getThemeConsumers } from '../createSystem/getThemeConsumers'

describe('cn test', () => {
  it('should be able to consume a theme', () => {
    const theme = {
      space: ['0px', '2px', '4px'],
    }

    const { cn } = getThemeConsumers({ theme })

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
