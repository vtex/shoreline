import { tokensToDictionary } from '../tokens-to-dictionary'

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
