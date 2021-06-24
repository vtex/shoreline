import { isObjectEmpty } from '../index'

describe('isObjectEmpty', () => {
  it('should return true if objects are empty', () => {
    expect(isObjectEmpty({})).toBe(true)
  })
  it('should return false if objects are not empty', () => {
    expect(isObjectEmpty({ foo: null })).toBe(false)
  })
})
