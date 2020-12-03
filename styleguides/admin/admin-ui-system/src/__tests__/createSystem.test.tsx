import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { Box as ReakitBox } from 'reakit/Box'

import { createSystem, useTheme } from '..'
import { get } from '../util'
import { useClassName } from '../hooks'
import { StyleProp } from '../styles'
import { createElement } from '../createElement'

describe('createSystem test', () => {
  it('should create a functional cn', () => {
    const { cn } = createSystem({
      space: ['0px', '2px', '4px'],
    })

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
    const { ThemeProvider } = createSystem({
      space: ['0px', '2px', '4px'],
      colors: {
        primary: {
          base: '#000',
        },
      },
    })

    const wrapper = ({ children }: PropsWithChildren<unknown>) => (
      <ThemeProvider>{children}</ThemeProvider>
    )

    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(get(result.current, 'space.1')).toBe('2px')
    expect(get(result.current, 'colors.primary.base')).toBe('#000')
  })

  it('should be able to consume component keys', () => {
    const { cn } = createSystem({
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
    })

    const { getByTestId } = render(
      <header
        data-testid="header"
        className={cn({ themeKey: 'components.header' })}
      >
        button
      </header>
    )

    expect(getByTestId('header')).toHaveStyleRule('background-color', '#fff')
    expect(getByTestId('header')).toHaveStyleRule('color', '#000')
  })

  it('should be able to consume the theme within a created element className', () => {
    const { cn } = createSystem({
      colors: {
        base: '#fff',
        primary: '#000',
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
    const { cn } = createSystem({
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
    })

    interface NavbarProps {
      children?: React.ReactNode
      className?: string
      styles?: StyleProp
    }

    function Nav(props: NavbarProps) {
      const className = cn({ themeKey: 'components.navbar' })

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
    const { ThemeProvider } = createSystem({
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
    })

    interface NavbarProps {
      children?: React.ReactNode
      className?: string
      styles?: StyleProp
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
