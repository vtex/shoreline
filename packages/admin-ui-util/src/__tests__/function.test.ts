import { callAllHandlers, isFunction } from '../function'

describe('callAllHandlers', () => {
  it('should call all passed functions on event triggered', () => {
    let val1 = 0
    let val2 = 0

    const mockEvent = {
      target: {
        value: 0,
      },
    }

    const func1 = (event: typeof mockEvent) => {
      val1 = event.target.value + 1
    }

    const func2 = (event: typeof mockEvent) => {
      val2 = event.target.value + 2
    }

    callAllHandlers(func1, func2)(mockEvent)
    expect(val1).toStrictEqual(1)
    expect(val2).toStrictEqual(2)
  })
})

describe('isFunction', () => {
  it('should be true if is function', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(() => () => {})).toBe(true)
    expect(isFunction(function () {})).toBe(true)
    expect(
      isFunction(function () {
        return null
      })
    ).toBe(true)
    expect(
      isFunction(function () {
        return () => {}
      })
    ).toBe(true)
    expect(
      isFunction(function (a: number) {
        return a
      })
    ).toBe(true)
  })
  it('should be false if is not a function', () => {
    expect(isFunction(null)).toBe(false)
    expect(isFunction(undefined)).toBe(false)
    expect(isFunction(1)).toBe(false)
    expect(isFunction({})).toBe(false)
    expect(isFunction([])).toBe(false)
    expect(isFunction([() => {}])).toBe(false)
    expect(isFunction({ dog: 'woof' })).toBe(false)
  })
})
