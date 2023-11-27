import { tokensToCssVariables } from '../tokens-to-css-variables'
import { test, expect } from 'vitest'

function removeSpaces(str: string) {
  return str.replace(/\s/g, '')
}

test('should render css variables', () => {
  const result = removeSpaces(
    tokensToCssVariables({
      '--sl-color-blue-100': 'blue',
    })
  )

  const expected = removeSpaces(`
    @layer sl-tokens {
      :root {
        --sl-color-blue-100: blue;
      }
    }
  `)

  expect(result).toStrictEqual(expected)
})

test('should separate variables into media queries', () => {
  const result = removeSpaces(
    tokensToCssVariables({
      '--sl-space-gap': '10',
      '--sl-space-gap-@media-small': '100',
      '--sl-space-gap-@media-medium': '1000',
      '--sl-space-gap-@media-large': '10000',
    })
  )

  const expected = removeSpaces(`
    @layer sl-tokens {
      :root {
        --sl-space-gap: 10;
      }

      @media (min-width: 48rem) {
        :root {
          --sl-space-gap: 100;
        }
      }

      @media (min-width: 64rem) {
        :root {
          --sl-space-gap: 1000;
        }
      }

      @media (min-width: 90rem) {
        :root {
          --sl-space-gap: 10000;
        }
      }
    }
  `)

  expect(result).toStrictEqual(expected)
})

test('handles media queries with nested values', () => {
  const result = removeSpaces(
    tokensToCssVariables({
      '--sl-color-main-100': 'blue',
      '--sl-color-main-200': 'lightblue',
      '--sl-color-main-@media-large-100': 'yellow',
      '--sl-color-main-@media-large-200': 'lightyellow',
    })
  )

  const expected = removeSpaces(`
    @layer sl-tokens {
      :root {
        --sl-color-main-100: blue;
        --sl-color-main-200: lightblue;
      }

      @media (min-width: 90rem) {
        :root {
          --sl-color-main-100: yellow;
          --sl-color-main-200: lightyellow;
        }
      }
    }
  `)

  expect(result).toStrictEqual(expected)
})
