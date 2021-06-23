import React from 'react'
import { render } from './setup'
import { onda, createComponent } from '../index'

describe('onda elements', () => {
  it('should create an element', () => {
    const { getByText } = render(<onda.div>Testing</onda.div>)
    const result = getByText('Testing')

    expect(result).toBeInTheDocument()
    expect(result).toContainHTML('<div class="styleguide-test-0">Testing</div>')
  })

  it('should accept data-attributes', () => {
    const { getByTestId } = render(
      <onda.div data-testid="test">Testing</onda.div>
    )
    const result = getByTestId('test')

    expect(result).toBeInTheDocument()
    expect(result).toHaveTextContent('Testing')
  })

  it('should accept styles', () => {
    const { getByTestId } = render(
      <onda.div
        data-testid="test"
        csx={{
          bg: 'primary',
          c: 'black',
        }}
      >
        Testing
      </onda.div>
    )
    const result = getByTestId('test')

    expect(result).toHaveStyleRule('background-color', 'blue')
    expect(result).toHaveStyleRule('color', 'black')
  })

  it('should be polymorphic', () => {
    const Button = createComponent('button', {
      bg: 'primary',
      c: 'black',
    })

    const { getByRole } = render(
      <onda.div
        as={Button}
        csx={{
          c: 'pink',
        }}
      >
        Testing
      </onda.div>
    )

    const result = getByRole('button')

    expect(result).toHaveStyleRule('background-color', 'blue')
    expect(result).toHaveStyleRule('color', 'pink')
  })
})
