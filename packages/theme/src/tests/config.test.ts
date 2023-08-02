import { join } from 'path'
import { defineConfig, isShorelineConfig, loadConfig } from '../config'

describe('defineConfig', () => {
  it('should allow empty configs', () => {
    const result = defineConfig({})
    const expectation = {}

    expect(result).toStrictEqual(expectation)
  })

  it('should allow filled configs', () => {
    const result = defineConfig({
      prefix: 'sl',
      tokens: {
        radii: '8px',
      },
    })

    const expectation = {
      prefix: 'sl',
      tokens: {
        radii: '8px',
      },
    }

    expect(result).toStrictEqual(expectation)
  })
})

describe('isShorelineConfig', () => {
  it('should reject', () => {
    expect(isShorelineConfig('')).toBeFalsy()
    expect(isShorelineConfig('shoreline.config')).toBeFalsy()
    expect(isShorelineConfig('shoreline.config.txt')).toBeFalsy()
    expect(isShorelineConfig('shoreline.js')).toBeFalsy()
    expect(isShorelineConfig('config.js')).toBeFalsy()
  })

  it('accepts js', () => {
    expect(isShorelineConfig('shoreline.config.js')).toBeTruthy()
  })

  it('accepts ts', () => {
    expect(isShorelineConfig('shoreline.config.ts')).toBeTruthy()
  })
})

describe('loadConfig', () => {
  it('should load a js config', () => {
    const result = loadConfig({
      cwd: join(__dirname, 'fixtures/js-config'),
    })

    expect(result.prefix).toBe('js')
  })

  it('should load a ts config', () => {
    const result = loadConfig({
      cwd: join(__dirname, 'fixtures/ts-config'),
    })

    expect(result.prefix).toBe('ts')
  })
})
