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

  // it('should be able to create an element', () => {
  //   function View(props: PropsWithChildren<unknown>) {
  //     return jsxs(
  //       ReakitBox,
  //       {},
  //       props.children
  //     )
  //   }

  //   const { getByTestId } = render(<View data-testid="view">view-text</View>)

  //   expect(getByTestId('view')).toBeInTheDocument()
  //   expect(getByTestId('view')).toHaveTextContent('view-text')
  // })

  // it('should be able to use renderProps within a created element', () => {
  //   function View(props: BoxHTMLProps) {
  //     return jsxs<BoxHTMLProps>({
  //       component: ReakitBox,
  //       props,
  //     })
  //   }

  //   const { getByRole } = render(
  //     <View onClick={() => null}>
  //       {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
  //       {(props: any) => <button {...props}>button</button>}
  //     </View>
  //   )

  //   expect(getByRole('button')).toBeInTheDocument()
  //   expect(getByRole('button')).toHaveTextContent('button')
  // })

  // it('should be able to switch the tag of a created element', () => {
  //   interface ViewProps {
  //     element?: React.ElementType
  //     children?: React.ReactNode
  //   }

  //   function View(props: ViewProps) {
  //     return jsxs({
  //       component: ReakitBox,
  //       props,
  //       element: props.element,
  //     })
  //   }

  //   const button = render(
  //     <View element="button" data-testid="view">
  //       button-text
  //     </View>
  //   )

  //   const nav = render(<View element="nav">nav-text</View>)

  //   expect(button.getByRole('button')).toBeInTheDocument()
  //   expect(button.getByRole('button')).toHaveTextContent('button-text')

  //   expect(nav.getByRole('navigation')).toBeInTheDocument()
  //   expect(nav.getByRole('navigation')).toHaveTextContent('nav-text')
  // })
})
