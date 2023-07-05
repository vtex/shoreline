import { csx } from '../index'

test('csx must return an object', () => {
  expect(csx()).toStrictEqual({})
  expect(csx(null)).toStrictEqual({})
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
      background: '$blue',
      color: '$black',
    })
  ).toStrictEqual({
    background: 'var(--bf-bg-blue)',
    color: 'var(--bf-fg-black)',
  })
})

test('csx must parse aliases and tokens combined', () => {
  expect(
    csx({
      fg: '$black',
      bg: '$coral',
    })
  ).toStrictEqual({
    color: 'var(--bf-fg-black)',
    background: 'var(--bf-bg-coral)',
  })
})

test('csx must accept a custom aliasFn', () => {
  function customAliasFn(value: string) {
    if (value === 't') {
      return 'test'
    }

    return value
  }

  const customConfig = {
    aliasFn: customAliasFn,
  }

  expect(
    csx(
      {
        t: 'value',
      },
      customConfig
    )
  ).toStrictEqual({
    test: 'value',
  })
})

test('csx should parse compound token strings', () => {
  expect(csx({ padding: '$space-2 $space-1' })).toStrictEqual({
    padding: 'var(--bf-space-space-2) var(--bf-space-space-1)',
  })

  expect(csx({ padding: '1rem $space-1' })).toStrictEqual({
    padding: '1rem var(--bf-space-space-1)',
  })
})

test('csx should accept mixins', () => {
  expect(csx({ size: 100 })).toStrictEqual({
    width: 100,
    height: 100,
  })

  expect(csx({ text: '$title1' })).toStrictEqual({
    fontFamily: 'var(--bf-ff-title1)',
    fontWeight: 'var(--bf-fw-title1)',
    fontSize: 'var(--bf-fs-title1)',
    lineHeight: 'var(--bf-lh-title1)',
    letterSpacing: 'var(--bf-ls-title1)',
  })
})
