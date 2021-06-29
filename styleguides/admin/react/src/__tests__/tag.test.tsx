import React from 'react'
import { render } from './setup'
import { tag, createComponent } from '../index'

describe('onda elements', () => {
  it('should create an element', () => {
    const { getByText } = render(<tag.div>Testing</tag.div>)
    const result = getByText('Testing')

    expect(result).toBeInTheDocument()
    expect(result).toContainHTML('<div class="vtex-admin-ui-0">Testing</div>')
  })

  it('should accept data-attributes', () => {
    const { getByTestId } = render(
      <tag.div data-testid="test">Testing</tag.div>
    )
    const result = getByTestId('test')

    expect(result).toBeInTheDocument()
    expect(result).toHaveTextContent('Testing')
  })

  it('should accept styles', () => {
    const { getByTestId } = render(
      <tag.div
        data-testid="test"
        csx={{
          bg: '#000',
          color: '#fff',
        }}
      >
        Testing
      </tag.div>
    )
    const result = getByTestId('test')

    expect(result).toHaveStyleRule('background-color', '#000')
    expect(result).toHaveStyleRule('color', '#fff')
  })

  it('should be polymorphic', () => {
    const Button = createComponent('button', {
      bg: '#000',
      color: '#fff',
    })

    const { getByRole } = render(
      <tag.div
        as={Button}
        csx={{
          color: '#2fa',
        }}
      >
        Testing
      </tag.div>
    )

    const result = getByRole('button')

    expect(result).toHaveStyleRule('background-color', '#000')
    expect(result).toHaveStyleRule('color', '#2fa')
  })
})
