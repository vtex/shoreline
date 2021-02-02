import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import { Box, Button } from 'reakit'

import { jsxs } from '../jsxs'

describe('createElement tests', () => {
  it('should be able to create an element', () => {
    function View(props: PropsWithChildren<unknown>) {
      return jsxs(Box, props)
    }

    const { getByTestId, getByRole } = render(
      <View data-testid="view">
        view-text
        <button>button</button>
      </View>
    )

    expect(getByTestId('view')).toBeInTheDocument()
    expect(getByTestId('view')).toHaveTextContent('view-text')
    expect(getByRole('button')).toBeInTheDocument()
  })

  it('should be able to create an element with reakit', () => {
    function View(props: PropsWithChildren<unknown>) {
      return jsxs(Button, props)
    }

    const { getByTestId } = render(
      <View data-testid="view">
        view-text
      </View>
    )

    expect(getByTestId('view')).toBeInTheDocument()
    expect(getByTestId('view')).toHaveTextContent('view-text')
  })
})
