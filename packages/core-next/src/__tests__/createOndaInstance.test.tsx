import React from 'react'
import { render } from '@testing-library/react'

import { createOndaInstance, useSystem } from '../createOnda'

describe('admin ui design system provider', () => {
  it('should execute the onda instance', () => {
    const OndaProvider = createOndaInstance({
      name: 'onda-design-system-tst',
      options: { disableCSSVariables: true },
    })

    function Div() {
      const { cn } = useSystem()

      return (
        <div
          className={cn({
            padding: 2,
            color: 'blue',
          })}
          data-testid="div"
        />
      )
    }

    const { getByTestId } = render(
      <OndaProvider>
        <Div />
      </OndaProvider>
    )

    expect(getByTestId('div')).toHaveStyleRule('padding', '0.5rem')
    expect(getByTestId('div')).toHaveStyleRule('color', '#2953B2')
  })
})
