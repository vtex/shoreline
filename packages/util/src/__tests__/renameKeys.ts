import { renameKeys } from '../renameKeys'

describe('renameKeys', () => {
  it('should return the same object', () => {
    const obj = {
      style: 'a',
    }

    expect(renameKeys({ style: 'style' }, obj)).toStrictEqual(obj)
    expect(renameKeys({}, obj)).toStrictEqual(obj)
  })

  it('should rename keys', () => {
    const obj = {
      style: 'a',
    }

    expect(renameKeys({ style: 'styleOverrides' }, obj)).toStrictEqual({
      styleOverrides: 'a',
    })
  })
})
