import { describe, it, expect } from '@vtex/shoreline-test-utils'
import { shallow } from '../shallow'

describe('shallow', () => {
  it('should return true for shallowly equal objects', () => {
    const objA = { a: 1, b: 'hello' }
    const objB = { a: 1, b: 'hello' }

    expect(shallow(objA, objB)).toBe(true)
  })

  it('should return false for objects with different values', () => {
    const objA = { a: 1, b: 'hello' }
    const objB = { a: 2, b: 'world' }

    expect(shallow(objA, objB)).toBe(false)
  })

  it('should return false for objects with different keys', () => {
    const objA = { a: 1, b: 'hello' }
    const objB = { a: 1, c: 'world' }

    expect(shallow(objA, objB as any)).toBe(false)
  })

  it('should return false for objects with different structures', () => {
    const objA = { a: 1, b: 'hello' }
    const objB = [1, 'hello']

    expect(shallow(objA, objB as any)).toBe(false)
  })

  it('should return false for one object being null', () => {
    const objA = { a: 1, b: 'hello' }
    const objB = null

    expect(shallow(objA, objB)).toBe(false)
  })

  it('should return false for one object being undefined', () => {
    const objA = { a: 1, b: 'hello' }
    const objB = undefined

    expect(shallow(objA, objB)).toBe(false)
  })

  it('should return true for two null objects', () => {
    const objA = null
    const objB = null

    expect(shallow(objA, objB)).toBe(true)
  })

  it('should return false for objects with different types', () => {
    const objA = { a: 1, b: 'hello' }
    const objB = { a: '1', b: 'hello' }

    expect(shallow(objA, objB as any)).toBe(false)
  })
})
