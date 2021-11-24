import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'

import { jsx } from '../jsx'
import {
  isAdminUIComponent,
  cleanProps,
  getStylesheet,
  getOptions,
} from '../util'

describe('utils', () => {
  it('isAdminUIComponent', () => {
    function FunctionComponent(props: ComponentPropsWithoutRef<'div'>) {
      return <div {...props} />
    }

    const Plain = jsx('div')()
    const Themed = jsx('div')({
      color: 'blue',
    })

    const Compound = jsx(FunctionComponent)({
      bg: 'pink',
    })

    expect(isAdminUIComponent(FunctionComponent)).toBe(false)
    expect(isAdminUIComponent(Plain)).toBe(true)
    expect(isAdminUIComponent(Themed)).toBe(true)
    expect(isAdminUIComponent(Compound)).toBe(true)
  })

  it('getStylesheet', () => {
    const stylesheet = {
      size: 10,
      variants: {
        theme: {
          primary: {
            bg: 'blue',
          },
          secondary: {
            bg: 'purple',
          },
        },
      },
    }

    const Div = jsx('div')(stylesheet)
    const Compound = jsx(Div)({
      padding: 2,
    })

    expect(getStylesheet(Div)).toEqual(stylesheet)
    expect(getStylesheet(Compound)).toEqual({
      ...stylesheet,
      padding: 2,
    })
  })

  it('getOptions', () => {
    const Div = jsx('div')({}, { options: ['a', 'b'] })
    const Compound = jsx(Div)({}, { options: ['c'] })

    expect(getOptions(Div)).toEqual(['a', 'b'])
    expect(getOptions(Compound)).toEqual(['a', 'b', 'c'])
  })

  it('cleanProps', () => {
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
