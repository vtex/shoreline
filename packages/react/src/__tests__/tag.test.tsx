import React from 'react'

import { render } from './setup'
import { tag, jsx } from '../index'

describe('onda elements', () => {
  it('should create a callable element', () => {
    const Div = tag('div')
    const { getByText } = render(<Div>Testing</Div>)

    expect(getByText('Testing')).toBeInTheDocument()
  })

  it('should create an element that accept data-attributes', () => {
    const Div = tag('div')
    const { getByTestId } = render(<Div data-testid="test">Testing</Div>)

    expect(getByTestId('test')).toBeInTheDocument()
    expect(getByTestId('test')).toHaveTextContent('Testing')
  })

  it('should create an element that accepts styles', () => {
    const Div = tag('div')
    const { getByTestId } = render(
      <Div
        data-testid="test"
        csx={{
          bg: '#000',
          color: '#fff',
        }}
      >
        Testing
      </Div>
    )

    expect(getByTestId('test')).toHaveStyleRule('background-color', '#000')
    expect(getByTestId('test')).toHaveStyleRule('color', '#fff')
  })

  it('should create polymorphic elements', () => {
    const Box = tag('div')

    const { getByRole } = render(
      <Box
        as="button"
        csx={{
          bg: '#000',
          color: '#fff',
        }}
      >
        Testing
      </Box>
    )

    const result = getByRole('button')

    expect(result).toHaveStyleRule('background-color', '#000')
    expect(result).toHaveStyleRule('color', '#fff')
  })

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
    const Button = jsx('button')({
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
