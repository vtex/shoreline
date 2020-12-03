import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import { Box as ReakitBox, BoxHTMLProps } from 'reakit'

import { createElement } from '../createElement'

describe('createElement tests', () => {
  it('should be able to create an element', () => {
    function View(props: PropsWithChildren<unknown>) {
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
})
