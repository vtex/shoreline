import { describe, expect, it } from '@vtex/shoreline-test-utils'
import { TokenCollection, shorelineLayers } from '../token-collection'

const testTokens = {
  color: {
    white: {
      '*': 'hsl(0 0 100)',
      50: 'hsla(0 0 0 / 50%)',
    },
    base: {
      bg: '$color-white',
    },
  },
  border: {
    base: '1px solid $color-white-50',
  },
}

const testCollection = new TokenCollection(testTokens)

function removeWhiteSpace(str: string) {
  return str.replace(/\s/g, '')
}

describe('Token object', () => {
  it('should create a token object', () => {
    expect(testCollection.getObject()).toStrictEqual({
      ColorWhite50: 'var(--sl-color-white-50)',
      ColorWhite: 'var(--sl-color-white)',
      ColorBaseBg: 'var(--sl-color-base-bg)',
      BorderBase: 'var(--sl-border-base)',
    })
  })

  it('should create a resolved token object', async () => {
    expect(await testCollection.getObject(true)).toStrictEqual({
      ColorWhite: 'hsl(0 0 100)',
      ColorWhite50: 'hsla(0 0 0 / 50%)',
      ColorBaseBg: 'hsl(0 0 100)',
      BorderBase: '1px solid hsla(0 0 0 / 50%)',
    })
  })

  it('should create a ts code', async () => {
    const code = await testCollection.getTs('Test')

    expect(removeWhiteSpace(code)).toStrictEqual(
      removeWhiteSpace(
        `export const Test = {
          ColorWhite50: 'var(--sl-color-white-50)',
          ColorWhite: 'var(--sl-color-white)',
          ColorBaseBg: 'var(--sl-color-base-bg)',
          BorderBase: 'var(--sl-border-base)',
        }`
      )
    )
  })

  it('should create a resolved ts code', async () => {
    const code = await testCollection.getTs('Test', true)

    expect(removeWhiteSpace(code)).toStrictEqual(
      removeWhiteSpace(
        `export const Test = {
          ColorWhite50: 'hsla(0 0 0 / 50%)',
          ColorWhite: 'hsl(0 0 100)',
          ColorBaseBg: 'hsl(0 0 100)',
          BorderBase: '1px solid hsla(0 0 0 / 50%)',
        }`
      )
    )
  })
})

describe('css', () => {
  it('should output css', async () => {
    const code = await testCollection.getCss()

    expect(removeWhiteSpace(await testCollection.getCss())).toStrictEqual(
      removeWhiteSpace(
        `${shorelineLayers} @layer sl-tokens { :root { --sl-color-white-50: hsla(0 0 0 / 50%); --sl-color-white: hsl(0 0 100); --sl-color-base-bg: var(--sl-color-white); --sl-border-base: 1px solid var(--sl-color-white-50); } }`
      )
    )
  })
})
