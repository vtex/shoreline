import React, { ComponentPropsWithoutRef } from 'react'
import { render } from './setup'
import { createComponent } from '../index'

describe('createComponent', () => {
  describe('short mode', () => {
    it('should create a callable component', () => {
      const Div = createComponent('div')
      const { getByText } = render(<Div>Testing</Div>)

      expect(getByText('Testing')).toBeInTheDocument()
    })

    it('should create component that accepts data-attributes', () => {
      const Div = createComponent('div')
      const { getByTestId } = render(<Div data-testid="test">Testing</Div>)

      expect(getByTestId('test')).toBeInTheDocument()
      expect(getByTestId('test')).toHaveTextContent('Testing')
    })

    it('should create a component with overridable styles', () => {
      const Div = createComponent('div')
      const { getByTestId } = render(
        <Div
          data-testid="test"
          csx={{
            bg: 'primary',
            c: 'black',
          }}
        >
          Testing
        </Div>
      )

      expect(getByTestId('test')).toHaveStyleRule('background-color', 'blue')
      expect(getByTestId('test')).toHaveStyleRule('color', 'black')
    })

    it('should create a component with default styles', () => {
      const Div = createComponent('div', {
        bg: 'primary',
        c: 'black',
      })

      const { getByTestId } = render(<Div data-testid="test">Testing</Div>)

      expect(getByTestId('test')).toHaveStyleRule('background-color', 'blue')
      expect(getByTestId('test')).toHaveStyleRule('color', 'black')
    })

    it('should override default styles using csx', () => {
      const Div = createComponent('div', {
        bg: 'primary',
        c: 'black',
      })

      const { getByTestId } = render(
        <Div
          data-testid="test"
          csx={{
            c: 'pink',
          }}
        >
          Testing
        </Div>
      )

      expect(getByTestId('test')).toHaveStyleRule('background-color', 'blue')
      expect(getByTestId('test')).toHaveStyleRule('color', 'pink')
    })

    it('should create polymorphic components', () => {
      const Box = createComponent('div', {
        bg: 'primary',
        c: 'black',
      })
      const { getByRole } = render(<Box as="button">Testing</Box>)
      const result = getByRole('button')
      expect(result).toBeDefined()
    })

    it('should be able to compose a new component and keep its styles', () => {
      const Square = createComponent('div', {
        bg: 'pink',
      })

      const WithRedColor = createComponent(Square, {
        color: 'red',
      })

      const { getByTestId } = render(
        <WithRedColor data-testid="test">Testing</WithRedColor>
      )

      expect(getByTestId('test')).toHaveTextContent('Testing')
      expect(getByTestId('test')).toHaveStyleRule('background-color', 'pink')
      expect(getByTestId('test')).toHaveStyleRule('color', 'red')
    })

    it('should allow composed components to override styles', () => {
      const Square = createComponent('div', {
        bg: 'pink',
      })

      const WithRedColor = createComponent(Square, {
        color: 'red',
      })

      const { getByTestId } = render(
        <WithRedColor
          data-testid="test"
          csx={{
            bg: 'black',
          }}
        >
          Testing
        </WithRedColor>
      )

      expect(getByTestId('test')).toHaveTextContent('Testing')
      expect(getByTestId('test')).toHaveStyleRule('background-color', 'black')
      expect(getByTestId('test')).toHaveStyleRule('color', 'red')
    })
  })

  describe('strict mode', () => {
    it('should be able to create a component in strict mode', () => {
      const Div = createComponent({ as: 'div' }, { bg: 'primary' })
      const { getByTestId } = render(
        <Div data-testid="test" csx={{ color: 'secondary' }}>
          Testing
        </Div>
      )

      const result = getByTestId('test')

      expect(result).toBeInTheDocument()
      expect(result).toHaveTextContent('Testing')
      expect(result).toHaveStyleRule('background-color', 'blue')
      expect(result).toHaveStyleRule('color', 'green')
    })

    it('should be able to compose components in strict mode', () => {
      function Component(props: ComponentPropsWithoutRef<'div'>) {
        return <div {...props} />
      }

      const Div = createComponent({ as: Component }, { bg: 'primary' })
      const { getByTestId } = render(
        <Div data-testid="test" csx={{ color: 'secondary' }}>
          Testing
        </Div>
      )

      const result = getByTestId('test')

      expect(result).toBeInTheDocument()
      expect(result).toHaveTextContent('Testing')
      expect(result).toHaveStyleRule('background-color', 'blue')
      expect(result).toHaveStyleRule('color', 'green')
    })

    it('should forward ownProps to components', () => {
      interface OwnProps {
        text: string
      }

      function Component(props: ComponentPropsWithoutRef<'div'> & OwnProps) {
        const { text, ...divProps } = props
        return <div {...divProps}>{text}</div>
      }

      const Div = createComponent(
        { as: Component, ownProps: ['text'] },
        { bg: 'primary' }
      )
      const { getByTestId } = render(
        <Div data-testid="test" text="Test" csx={{ color: 'secondary' }} />
      )

      const result = getByTestId('test')

      expect(result).toBeInTheDocument()
      expect(result).toHaveTextContent('Test')
      expect(result).toHaveStyleRule('background-color', 'blue')
      expect(result).toHaveStyleRule('color', 'green')
    })

    it('should be able to intercept ownProps of components', () => {
      interface OwnProps {
        value: number
      }

      function Component(props: ComponentPropsWithoutRef<'div'> & OwnProps) {
        const { value, ...divProps } = props
        return <div {...divProps}>{value}</div>
      }

      const Double = createComponent(
        {
          as: Component,
          ownProps: ['value'],
          useOwnProps: (ownProps: OwnProps) => {
            return {
              value: ownProps.value * 2,
            }
          },
        },
        { bg: 'primary' }
      )
      const { getByTestId } = render(
        <Double data-testid="test" value={2} csx={{ color: 'secondary' }} />
      )

      const result = getByTestId('test')

      expect(result).toBeInTheDocument()
      expect(result).toHaveTextContent('4')
      expect(result).toHaveStyleRule('background-color', 'blue')
      expect(result).toHaveStyleRule('color', 'green')
    })
  })

  describe('variants', () => {
    it('should be able to create a variant', () => {
      const Square = createComponent('div', {
        variants: {
          size: {
            small: {
              width: 50,
              height: 50,
            },
            regular: {
              width: 100,
              height: 100,
            },
          },
        },
      })

      const { getByTestId } = render(
        <>
          <Square data-testid="small" size="small" />
          <Square data-testid="regular" size="regular" />
        </>
      )

      const small = getByTestId('small')
      const regular = getByTestId('regular')

      expect(small).toHaveStyleRule('width', '50px')
      expect(small).toHaveStyleRule('height', '50px')
      expect(regular).toHaveStyleRule('width', '100px')
      expect(regular).toHaveStyleRule('height', '100px')
    })

    it('should be able to create multiple variants', () => {
      const Square = createComponent('div', {
        variants: {
          size: {
            small: {
              width: 50,
              height: 50,
            },
            regular: {
              width: 100,
              height: 100,
            },
          },
          theme: {
            primary: {
              bg: 'primary',
              color: 'black',
            },
            secondary: {
              bg: 'secondary',
              color: 'white',
            },
          },
        },
      })

      const { getByTestId } = render(
        <>
          <Square data-testid="small" size="small" theme="primary" />
          <Square data-testid="regular" size="regular" theme="secondary" />
        </>
      )

      const small = getByTestId('small')
      const regular = getByTestId('regular')

      expect(small).toHaveStyleRule('width', '50px')
      expect(small).toHaveStyleRule('height', '50px')
      expect(small).toHaveStyleRule('color', 'black')
      expect(small).toHaveStyleRule('background-color', 'blue')
      expect(regular).toHaveStyleRule('width', '100px')
      expect(regular).toHaveStyleRule('height', '100px')
      expect(regular).toHaveStyleRule('color', 'white')
      expect(regular).toHaveStyleRule('background-color', 'green')
    })

    it('accepts default values for variants', () => {
      const Square = createComponent('div', {
        variants: {
          size: {
            small: {
              width: 50,
              height: 50,
            },
            regular: {
              width: 100,
              height: 100,
            },
          },
          theme: {
            primary: {
              bg: 'primary',
              color: 'black',
            },
            secondary: {
              bg: 'secondary',
              color: 'white',
            },
          },
        },
      })

      Square.defaultProps = {
        size: 'regular',
        theme: 'primary',
      }

      const { getByTestId } = render(
        <>
          <Square data-testid="small" size="small" />
          <Square data-testid="regular" theme="secondary" />
        </>
      )

      const small = getByTestId('small')
      const regular = getByTestId('regular')

      expect(small).toHaveStyleRule('width', '50px')
      expect(small).toHaveStyleRule('height', '50px')
      expect(small).toHaveStyleRule('color', 'black')
      expect(small).toHaveStyleRule('background-color', 'blue')
      expect(regular).toHaveStyleRule('width', '100px')
      expect(regular).toHaveStyleRule('height', '100px')
      expect(regular).toHaveStyleRule('color', 'white')
      expect(regular).toHaveStyleRule('background-color', 'green')
    })

    it('should be able to sync variants', () => {
      const Square = createComponent(
        'div',
        {
          variants: {
            size: {
              small: {
                width: 50,
                height: 50,
              },
              regular: {
                width: 100,
                height: 100,
              },
            },
            theme: {
              primary: {
                bg: 'primary',
                color: 'black',
              },
              secondary: {
                bg: 'secondary',
                color: 'white',
              },
            },
            fill: {
              solid: {
                border: 'none',
              },
              outline: {
                borderWidth: 1,
                borderStyle: 'solid',
              },
            },
          },
        },
        [
          {
            theme: 'primary',
            fill: 'outline',
            csx: {
              bc: 'primary',
              bg: 'transparent',
            },
          },
          {
            theme: 'secondary',
            fill: 'outline',
            csx: {
              bc: 'secondary',
              bg: 'transparent',
            },
          },
        ]
      )

      Square.defaultProps = {
        size: 'regular',
        theme: 'primary',
      }

      const { getByTestId } = render(
        <>
          <Square
            data-testid="test"
            size="small"
            theme="secondary"
            fill="outline"
          />
        </>
      )

      const result = getByTestId('test')

      expect(result).toHaveStyleRule('width', '50px')
      expect(result).toHaveStyleRule('height', '50px')
      expect(result).toHaveStyleRule('color', 'white')
      expect(result).toHaveStyleRule('background-color', 'transparent')
      expect(result).toHaveStyleRule('border-color', 'green')
      expect(result).toHaveStyleRule('border-width', '1px')
      expect(result).toHaveStyleRule('border-style', 'solid')
    })
  })
})
