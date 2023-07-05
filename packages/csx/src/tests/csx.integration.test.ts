import { csx, alias } from '../index'

test('chained selectors csx implementation', () => {
  function convertChainedSelectors(key: string) {
    const selector = '&'
    const space = ' '

    const selectorKey = key.charAt(0)

    const converted = {
      '[': `${selector}${key}`,
      ':': `${selector}${key}`,
      '.': `${selector}${space}${key}`,
      '+': `${selector}${space}${key}`,
    }[selectorKey]

    return converted ?? key
  }

  function customAlias(prop: string) {
    const converted = convertChainedSelectors(prop)

    return alias(converted)
  }

  const flat = csx(
    {
      ':hover': { color: 'blue' },
      '::before': { color: 'blue' },
      '[data]': { color: 'blue' },
      '+ button': { color: 'blue' },
      '.class-test': { color: 'blue' },
    },
    { aliasFn: customAlias }
  )

  const deep = csx(
    {
      button: {
        ':hover': { color: 'blue' },
        '::before': { color: 'blue' },
        '[data]': { color: 'blue' },
        '+ button': { color: 'blue' },
        '.class-test': { color: 'blue' },
      },
    },
    { aliasFn: customAlias }
  )

  expect(Object.keys(flat)).toEqual([
    '&:hover',
    '&::before',
    '&[data]',
    '& + button',
    '& .class-test',
  ])

  expect(flat).toEqual({
    '&:hover': { color: 'blue' },
    '&::before': { color: 'blue' },
    '&[data]': { color: 'blue' },
    '& + button': { color: 'blue' },
    '& .class-test': { color: 'blue' },
  })

  expect(Object.keys(deep.button)).toEqual([
    '&:hover',
    '&::before',
    '&[data]',
    '& + button',
    '& .class-test',
  ])

  expect(deep).toEqual({
    button: {
      '&:hover': { color: 'blue' },
      '&::before': { color: 'blue' },
      '&[data]': { color: 'blue' },
      '& + button': { color: 'blue' },
      '& .class-test': { color: 'blue' },
    },
  })
})
