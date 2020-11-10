import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { Box as ReakitBox, BoxHTMLProps } from 'reakit/Box'

import { createSystem, SxStyleProp, useTheme } from '..'
import { get } from '../util'
import { useClassName } from '../hooks'

describe('creatSystem test', () => {
  it('should create a functional cn', () => {
    const theme = {
      space: ['0px', '2px', '4px'],
    }

    const { cn } = createSystem({ theme })

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

  it('should create a functional ThemeProvider', () => {
    const theme = {
      space: ['0px', '2px', '4px'],
      colors: {
        primary: {
          base: '#000',
        },
      },
    }

    const { ThemeProvider } = createSystem({ theme })

    const wrapper = ({ children }: PropsWithChildren<{}>) => (
      <ThemeProvider>{children}</ThemeProvider>
    )

    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(get(result.current, 'space.1')).toBe('2px')
    expect(get(result.current, 'colors.primary.base')).toBe('#000')
  })

  it('should be able to consume component keys', () => {
    const theme = {
      colors: {
        base: '#fff',
        primary: '#000',
      },
      components: {
        header: {
          backgroundColor: 'base',
          color: 'primary',
        },
      },
    }

    const { componentStyles } = createSystem({ theme })

    const { getByTestId } = render(
      <header
        data-testid="header"
        className={componentStyles('components.header')}
      >
        button
      </header>
    )

    expect(getByTestId('header')).toHaveStyleRule('background-color', '#fff')
    expect(getByTestId('header')).toHaveStyleRule('color', '#000')
  })

  it('should be able to create an element', () => {
    const { createElement } = createSystem({ theme: {} })

    function View(props: PropsWithChildren<{}>) {
      return createElement({
        component: ReakitBox,
        htmlProps: props,
      })
    }

    const { getByTestId } = render(<View data-testid="view">view-text</View>)

    expect(getByTestId('view')).toBeInTheDocument()
    expect(getByTestId('view')).toHaveTextContent('view-text')
  })

  it('should be able to use renderProps within a created element', () => {
    const { createElement } = createSystem({ theme: {} })

    function View(props: BoxHTMLProps) {
      return createElement<BoxHTMLProps>({
        component: ReakitBox,
        htmlProps: props,
      })
    }

    const { getByRole } = render(
      <View onClick={() => null}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {(props: any) => <button {...props}>button</button>}
      </View>
    )

    expect(getByRole('button')).toBeInTheDocument()
    expect(getByRole('button')).toHaveTextContent('button')
  })

  it('should be able to switch the tag of a created element', () => {
    const { createElement } = createSystem({ theme: {} })

    interface ViewProps {
      element?: React.ElementType
      children?: React.ReactNode
    }

    function View(props: ViewProps) {
      return createElement({
        component: ReakitBox,
        htmlProps: props,
        element: props.element,
      })
    }

    const button = render(
      <View element="button" data-testid="view">
        button-text
      </View>
    )

    const nav = render(<View element="nav">nav-text</View>)

    expect(button.getByRole('button')).toBeInTheDocument()
    expect(button.getByRole('button')).toHaveTextContent('button-text')

    expect(nav.getByRole('navigation')).toBeInTheDocument()
    expect(nav.getByRole('navigation')).toHaveTextContent('nav-text')
  })

  it('should be able to consume the theme within a created element className', () => {
    const { createElement, cn } = createSystem({
      theme: {
        colors: {
          base: '#fff',
          primary: '#000',
        },
      },
    })

    interface ViewProps {
      children?: React.ReactNode
      className?: string
    }

    function Nav(props: ViewProps) {
      return createElement({
        component: ReakitBox,
        htmlProps: props,
        element: 'nav',
      })
    }

    const nav = render(
      <Nav
        className={cn({
          backgroundColor: 'primary',
          color: 'base',
        })}
      >
        nav
      </Nav>
    )

    const component = nav.getByRole('navigation')

    expect(component).toBeInTheDocument()
    expect(component).toHaveTextContent('nav')
    expect(component).toHaveStyleRule('background-color', '#000')
    expect(component).toHaveStyleRule('color', '#fff')
  })

  it('should be able to consume the component key from the theme', () => {
    const { createElement, getClassName } = createSystem({
      theme: {
        colors: {
          base: '#fff',
          primary: '#000',
        },
        components: {
          navbar: {
            backgroundColor: 'primary',
            color: 'base',
          },
        },
      },
    })

    interface NavbarProps {
      children?: React.ReactNode
      className?: string
      styles?: SxStyleProp
    }

    function Nav(props: NavbarProps) {
      const className = getClassName({ props, themeKey: 'components.navbar' })

      return createElement({
        component: ReakitBox,
        htmlProps: { className, ...props },
        element: 'nav',
      })
    }

    const nav = render(<Nav>nav</Nav>)

    const component = nav.getByRole('navigation')

    expect(component).toHaveStyleRule('background-color', '#000')
    expect(component).toHaveStyleRule('color', '#fff')
  })

  it('should be able to consume the component key from the theme context', () => {
    const { createElement, ThemeProvider } = createSystem({
      theme: {
        colors: {
          base: '#fff',
          primary: '#000',
        },
        components: {
          navbar: {
            backgroundColor: 'primary',
            color: 'base',
          },
        },
      },
    })

    interface NavbarProps {
      children?: React.ReactNode
      className?: string
      styles?: SxStyleProp
    }

    function Nav(props: NavbarProps) {
      const className = useClassName({ props, themeKey: 'components.navbar' })

      return createElement({
        component: ReakitBox,
        htmlProps: { className, ...props },
        element: 'nav',
      })
    }

    const nav = render(
      <ThemeProvider>
        <Nav>nav</Nav>
      </ThemeProvider>
    )

    const component = nav.getByRole('navigation')

    expect(component).toHaveStyleRule('background-color', '#000')
    expect(component).toHaveStyleRule('color', '#fff')
  })
})
