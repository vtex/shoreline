import React, { ComponentPropsWithoutRef } from 'react'

import { jsx } from '../jsx'
import { isOndaComponent, cleanProps } from '../util'

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
