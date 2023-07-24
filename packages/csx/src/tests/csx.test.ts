import { csx } from '../index'

test('csx must return an object', () => {
  expect(csx()).toStrictEqual({})
  expect(csx(null as any)).toStrictEqual({})
  expect(csx(undefined)).toStrictEqual({})
  expect(csx({})).toStrictEqual({})
})

test('csx must leave non-aliased properties intact', () => {
  expect(
    csx({
      width: '100px',
    })
  ).toStrictEqual({
    width: '100px',
  })
})

test('csx must parse aliases', () => {
  expect(
    csx({
      fg: 'black',
      bg: 'coral',
    })
  ).toStrictEqual({
    color: 'black',
    background: 'coral',
  })
})

test('csx parses tokens and leave hardcoded values untouched', () => {
  expect(
    csx({
      background: 'blue',
      color: '#000',
    })
  ).toStrictEqual({
    background: 'blue',
    color: '#000',
  })

  expect(
    csx({
      background: '$bg-blue',
      color: '$fg-black',
    })
  ).toStrictEqual({
    background: 'var(--sl-bg-blue)',
    color: 'var(--sl-fg-black)',
  })
})

test('csx must parse aliases and tokens combined', () => {
  expect(
    csx({
      fg: '$fg-black',
      bg: '$bg-coral',
    })
  ).toStrictEqual({
    color: 'var(--sl-fg-black)',
    background: 'var(--sl-bg-coral)',
  })
})

test('csx should parse compound token strings', () => {
  expect(csx({ padding: '$space-2 $space-1' })).toStrictEqual({
    padding: 'var(--sl-space-2) var(--sl-space-1)',
  })

  expect(csx({ padding: '1rem $space-1' })).toStrictEqual({
    padding: '1rem var(--sl-space-1)',
  })
})

test('csx should accept mixins', () => {
  expect(csx({ size: 100 })).toStrictEqual({
    width: 100,
    height: 100,
  })
})

test('supports nesting', () => {
  expect(
    csx({
      bg: 'black',
      fg: 'white',
      '> button': {
        bg: 'pink',
        fg: 'black',
        ':hover': {
          fg: 'gray',
        },
      },
    })
  ).toStrictEqual({
    background: 'black',
    color: 'white',
    '> button': {
      background: 'pink',
      color: 'black',
      ':hover': {
        color: 'gray',
      },
    },
  })
})

test('@media', () => {
  expect(
    csx({
      '@media': {
        tablet: {
          size: 100,
        },
        desktop: {
          size: 200,
        },
      },
    })
  ).toStrictEqual({
    '@media': {
      '(min-width: var(--sl-bp-tablet))': {
        width: 100,
        height: 100,
      },
      '(min-width: var(--sl-bp-desktop))': {
        width: 200,
        height: 200,
      },
    },
  })
})

test('@layer', () => {
  expect(
    csx({
      '@layer': {
        reset: {
          '*': {
            boxSizing: 'border-box',
          },
        },
      },
    })
  ).toStrictEqual({
    '@layer': {
      'sl-reset': {
        '*': {
          boxSizing: 'border-box',
        },
      },
    },
  })
})
