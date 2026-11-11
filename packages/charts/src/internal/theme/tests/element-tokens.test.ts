import { afterEach, describe, expect, test, vi } from 'vitest'

import { createElementTokens } from '../element-tokens'

function stubComputedStyle(
  values: Record<string, string>,
  rootFontSize = '16px'
) {
  vi.stubGlobal(
    'getComputedStyle',
    vi.fn((target: Element) => {
      const isRoot = target === document.documentElement

      return {
        fontSize: isRoot ? rootFontSize : '',
        getPropertyValue: (property: string) =>
          isRoot ? '' : (values[property] ?? ''),
      }
    })
  )
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('createElementTokens', () => {
  test('resolves tokens from the element computed style, trimmed', () => {
    stubComputedStyle({ '--sl-fg-base': '  #07080a ' })
    const tokens = createElementTokens(document.createElement('div'))

    expect(tokens.get('--sl-fg-base')).toBe('#07080a')
  })

  test('resolves missing tokens to undefined', () => {
    stubComputedStyle({})
    const tokens = createElementTokens(document.createElement('div'))

    expect(tokens.get('--sl-fg-base')).toBeUndefined()
    expect(tokens.px('--sl-font-size-1')).toBeUndefined()
  })

  test('converts rem lengths to px using the document root font size', () => {
    stubComputedStyle({ '--sl-font-size-1': '0.75rem' }, '20px')
    const tokens = createElementTokens(document.createElement('div'))

    expect(tokens.px('--sl-font-size-1')).toBe(15)
  })

  test('defaults the rem base to 16 when the root font size is unavailable', () => {
    stubComputedStyle({ '--sl-font-size-1': '0.75rem' }, '')
    const tokens = createElementTokens(document.createElement('div'))

    expect(tokens.px('--sl-font-size-1')).toBe(12)
  })

  test('passes px lengths through and rejects other units', () => {
    stubComputedStyle({
      '--sl-size-a': '12px',
      '--sl-size-b': '1.5em',
    })
    const tokens = createElementTokens(document.createElement('div'))

    expect(tokens.px('--sl-size-a')).toBe(12)
    expect(tokens.px('--sl-size-b')).toBeUndefined()
  })
})
