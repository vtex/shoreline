import { callAllHandlers } from '../index'

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
