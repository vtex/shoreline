import { test, expect } from '@vtex/shoreline-test-utils'
import { transformTokens } from '../transform-tokens'

test('transforms rgb colors', () => {
  const [, js] = transformTokens({
    code: Buffer.from(`
    @theme example {
      :root {
        --color-white: hsl(0, 100%, 100%);
        --color-white-2: rgb(255, 255, 255);
        --color-white-3: #fff;
      }
    }
  `),
  })

  expect(js).toStrictEqual({
    colorWhite: '#ffffff',
    colorWhite2: '#ffffff',
    colorWhite3: '#ffffff',
  })
})

test('transforms aliases', () => {
  const [, js] = transformTokens({
    code: Buffer.from(`
    @theme example {
      :root {
        --color-white: #fff;
        --color-primary: var(--color-white);
      }
    }
  `),
  })

  expect(js).toStrictEqual({
    colorWhite: '#ffffff',
    colorPrimary: 'var(--sl-color-white)',
  })
})

test('transforms compositions', () => {
  const [, js] = transformTokens({
    code: Buffer.from(`
    @theme example {
      :root {
        --color-white: #fff;
        --border-primary: 1px solid var(--color-white);
        --font-family-sans: "Inter", -apple-system, system-ui, -apple-system,
          Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif,
          BlinkMacSystemFont, sans-serif;
      }
    }
  `),
  })

  expect(js).toStrictEqual({
    colorWhite: '#ffffff',
    borderPrimary: '1px solid var(--sl-color-white)',
    fontFamilySans:
      'Inter,-apple-system,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,sans-serif',
  })
})

test('transforms functions', () => {
  const [, js] = transformTokens({
    code: Buffer.from(`
    @theme example {
      :root {
        --bg-primary: color-mix(
          in srgb,
          var(--color-gray-12) 5%,
          transparent
        );
      }
    }
  `),
  })

  expect(js).toStrictEqual({
    bgPrimary: 'color-mix(in srgb,var(--sl-color-gray-12)5%,transparent)',
  })
})
