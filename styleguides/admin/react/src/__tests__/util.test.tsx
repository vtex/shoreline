import React, { ComponentPropsWithoutRef } from 'react'

import { jsx } from '../jsx'
import { isOndaComponent, cleanProps, getStylesheet, getOptions } from '../util'

describe('utils', () => {
  test('isOndaComponent', () => {
    function FunctionComponent(props: ComponentPropsWithoutRef<'div'>) {
      return <div {...props} />
    }
    
    const Plain = jsx('div')()
    const Aliased = jsx.div()
    const Themed = jsx('div')({
      color: 'blue'
    })
    const Compound = jsx(FunctionComponent)({
      bg: 'pink'
    })

    expect(isOndaComponent(FunctionComponent)).toBe(false)
    expect(isOndaComponent(Plain)).toBe(true)
    expect(isOndaComponent(Aliased)).toBe(true)
    expect(isOndaComponent(Themed)).toBe(true)
    expect(isOndaComponent(Compound)).toBe(true)
  })

  test('getStylesheet', () => {
    const stylesheet = {
      size: 10,
      variants: {
        theme: {
          primary: {
            bg: 'blue'
          },
          secondary: {
            bg: 'purple'
          }
        }
      }
    }

    const Div = jsx.div(stylesheet)
    const Compound = jsx(Div)({
      padding: 2
    })


    expect(getStylesheet(Div)).toEqual(stylesheet)
    expect(getStylesheet(Compound)).toEqual({
      ...stylesheet,
      padding: 2,
    })
  })

  test('getOptions', () => {
    const Div = jsx.div({}, { options: ['a', 'b'] })
    const Compound = jsx(Div)({}, { options: ['c'] })

    expect(getOptions(Div)).toEqual(['a', 'b'])
    expect(getOptions(Compound)).toEqual(['a', 'b', 'c'])
  })


  test('cleanProps', () => {
    expect(cleanProps({})).toEqual({})
    expect(
      cleanProps({
        name: 'name',
        id: 'id',
      })
    ).toEqual({
      name: 'name',
      id: 'id',
    })
    expect(
      cleanProps({
        id: 'id',
        xpto: 'should clean',
      })
    ).toEqual({
      id: 'id',
    })
  })
})
