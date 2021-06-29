import React, { ComponentPropsWithoutRef } from 'react'
import { createComponent } from '../createComponent'
import { isOndaComponent, cleanProps, pickOwnProps, isStrict } from '../util'

describe('utils', () => {
  test('isOndaComponent', () => {
    function FunctionComponent(props: ComponentPropsWithoutRef<'div'>) {
      return <div {...props} />
    }
    const OndaComponent = createComponent('div')

    expect(isOndaComponent(FunctionComponent)).toBe(false)
    expect(isOndaComponent(OndaComponent)).toBe(true)
  })

  test('isStrict', () => {
    const result = {
      empty: isStrict({}),
      withoutAs: isStrict({ prop: 'example' }),
      string: isStrict({ as: 'button' }),
      function: isStrict({ as: function () {} }),
      arrowFunction: isStrict({ as: () => {} }),
      arrowFunctionAndProps: isStrict({ as: () => {}, otherProps: {} }),
    }
    expect(result.empty).toBe(false)
    expect(result.withoutAs).toBe(false)
    expect(result.string).toBe(true)
    expect(result.function).toBe(true)
    expect(result.arrowFunction).toBe(true)
    expect(result.arrowFunctionAndProps).toBe(true)
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

  test('pickOwnProps', () => {
    const Short = createComponent('div')
    const Strict = createComponent({ as: 'div' })
    const StrictWithOwnProps = createComponent({
      as: 'div',
      ownProps: ['label', 'render'],
    })
    const ComposedShort = createComponent(StrictWithOwnProps)
    const ComposedStrict = createComponent({ as: StrictWithOwnProps })
    const InheritOwnProps = createComponent({
      as: StrictWithOwnProps,
      ownProps: ['intl', 'format'],
    })
    const SecondInheritOwnProps = createComponent({
      as: InheritOwnProps,
      ownProps: ['__internal', '__hover'],
    })

    expect(pickOwnProps(Short)).toEqual([])
    expect(pickOwnProps(Strict)).toEqual([])
    expect(pickOwnProps(StrictWithOwnProps)).toEqual(['label', 'render'])
    expect(pickOwnProps(ComposedShort)).toEqual(['label', 'render'])
    expect(pickOwnProps(ComposedStrict)).toEqual(['label', 'render'])
    expect(pickOwnProps(InheritOwnProps)).toEqual([
      'label',
      'render',
      'intl',
      'format',
    ])
    expect(pickOwnProps(SecondInheritOwnProps)).toEqual([
      'label',
      'render',
      'intl',
      'format',
      '__internal',
      '__hover',
    ])
  })
})
