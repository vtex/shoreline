import { tokensToDictionary } from '../tokens-to-dictionary'
import { describe, it, expect } from 'vitest'

const tokens = {
  color: {
    red: {
      6: '#FF0000',
    },
  },
  bg: {
    '*': '$color-red-6',
  },
}

describe('tokens-to-dictionary', () => {
  it('should', () => {
    expect(
      tokensToDictionary({
        tokens,
      })
    ).toStrictEqual({
      ColorRed6: 'var(--sl-color-red-6)',
      Bg: 'var(--sl-bg)',
    })
  })
})
