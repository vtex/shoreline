import { describe, it, expect } from '@vtex/shoreline-test-utils'
import { chain } from '../chain'

describe('chain', () => {
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

    chain(func1, func2)(mockEvent)
    expect(val1).toStrictEqual(1)
    expect(val2).toStrictEqual(2)
  })
})
