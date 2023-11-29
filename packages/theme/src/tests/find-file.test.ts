import { join, resolve } from 'path'
import { climbUp, findFile } from '../find-file'
import { describe, it, expect } from '@vtex/shoreline-test-utils'

const fixtures = join(__dirname, 'fixtures')

describe('climbUp', () => {
  it('should convert relative output into absolute', () => {
    const result = climbUp(fixtures, () => 'example.js')
    const expectation = join(fixtures, 'example.js')

    expect(result).toStrictEqual(expectation)
  })

  it('should respect absolute output', () => {
    const example = resolve('.', 'example.js')
    const result = climbUp(fixtures, () => example)

    expect(result).toStrictEqual(example)
  })
})

describe('findFile', () => {
  it('should find the file', () => {
    const result = findFile({
      cwd: fixtures,
      constraint: (file) => /example.js/.test(file),
    })

    const expectation = join(fixtures, 'example.js')

    expect(result).toStrictEqual(expectation)
  })
})
