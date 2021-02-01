import { cleanProps } from '../util'

describe('cleanProps tests', () => {
  it('should always return an object', () => {
    expect(cleanProps({})).toEqual({})
    expect(cleanProps(null)).toEqual({})
    expect(cleanProps(undefined)).toEqual({})
  })
  it('should allow safe props', () => {
    const validProps = {
      onClick: () => null,
      id: 'test',
      'data-testid': 'test-id',
    }

    const unsafeProps = ['size', 'variant']

    expect(cleanProps(validProps, unsafeProps)).toEqual(validProps)
  })
  it('should omit unsafe props', () => {
    const validProps = {
      onClick: () => null,
      id: 'test',
      'data-testid': 'test-id',
    }

    const withUnsafeProps = {
      ...validProps,
      size: 20,
      variant: 'filled',
    }

    const unsafeProps = ['size', 'variant']

    expect(cleanProps(withUnsafeProps, unsafeProps)).toEqual(validProps)
  })
})
