import { get } from '@vtex/admin-ui-util'

import { stylesCss } from '../styles'
import { cx, resolveTokenValue } from '../helpers'

describe('styles', () => {
  describe('edge cases', () => {
    it('should always return a object', () => {
      expect(typeof stylesCss()).toBe('object')
      expect(typeof stylesCss(undefined)).toBe('object')
      expect(typeof stylesCss({})).toBe('object')
    })

    it('should not touch unkown properties', () => {
      const result = stylesCss({
        abc: 'cba',
      })

      expect(result).toEqual({
        abc: 'cba',
      })
    })

    it('should ignore values that are not tokens', () => {
      const result = stylesCss({
        fontSize: 32,
        color: 'blue',
        borderRadius: 4,
      })

      expect(result).toEqual({
        fontSize: 32,
        color: 'blue',
        borderRadius: 4,
      })
    })
  })

  describe('basic rules', () => {
    it('should be able to consume rules', () => {
      const result = stylesCss({
        color: '$primary',
      })

      expect(result).toEqual({
        color: 'var(--admin-ui-fg-primary)',
      })
    })

    it('goes literal if some rule does not match', () => {
      const result = stylesCss({
        padding: 20,
        margin: 100,
      })

      expect(result).toEqual({
        padding: 20,
        margin: 100,
      })
    })

    it('should be able to handle aliases', () => {
      const result = stylesCss({
        bg: 'blue',
      })

      expect(result).toEqual({
        background: 'blue',
      })
    })

    it('should be able to handle splits', () => {
      const result = stylesCss({
        marginX: '$sm',
        size: 100,
      })

      expect(result).toEqual({
        marginLeft: 'var(--admin-ui-hspace-sm)',
        marginRight: 'var(--admin-ui-hspace-sm)',
        height: 100,
        width: 100,
      })
    })
  })

  describe('complex rules', () => {
    it('should consume object rules', () => {
      const result = stylesCss({
        text: '$detail',
      })

      expect(result).toEqual({
        fontFamily: 'var(--admin-ui-fonts-detail)',
        fontSize: 'var(--admin-ui-fontSizes-detail)',
        fontVariationSettings: 'var(--admin-ui-fontWeights-detail)',
        letterSpacing: 'var(--admin-ui-letterSpacings-detail)',
        lineHeight: 'var(--admin-ui-lineHeights-detail)',
      })
    })

    it('should be able to use tokens values of other rules (edge cases)', () => {
      const result = stylesCss({
        bg: resolveTokenValue('fg.primary'),
      })

      expect(result).toEqual({
        background: 'var(--admin-ui-fg-primary)',
      })
    })
  })

  describe('chained selectors alias', () => {
    it('returns correct syntax for CSS selectors', () => {
      const result = stylesCss({
        ':hover': { color: 'blue' },
        '::before': { color: 'blue' },
        '[data]': { color: 'blue' },
        '+ button': { color: 'blue' },
        '.class-test': { color: 'blue' },
      })

      const keys = Object.keys(result)

      expect(keys).toEqual([
        '&:hover',
        '&::before',
        '&[data]',
        '& + button',
        '& .class-test',
      ])

      expect(result).toEqual({
        '&:hover': { color: 'blue' },
        '&::before': { color: 'blue' },
        '&[data]': { color: 'blue' },
        '& + button': { color: 'blue' },
        '& .class-test': { color: 'blue' },
      })
    })
  })

  it('returns correct syntax for deep CSS selectors', () => {
    const result = stylesCss({
      button: {
        ':hover': { color: 'blue' },
        '::before': { color: 'blue' },
        '[data]': { color: 'blue' },
        '+ button': { color: 'blue' },
        '.class-test': { color: 'blue' },
      },
    })

    const keys = Object.keys(get(result, 'button', result))

    expect(keys).toEqual([
      '&:hover',
      '&::before',
      '&[data]',
      '& + button',
      '& .class-test',
    ])

    expect(result).toEqual({
      button: {
        '&:hover': { color: 'blue' },
        '&::before': { color: 'blue' },
        '&[data]': { color: 'blue' },
        '& + button': { color: 'blue' },
        '& .class-test': { color: 'blue' },
      },
    })
  })

  describe('cx function', () => {
    it('joins two or more classnames with a blank space separating', () => {
      const result = cx('cls-1', 'cls-2', 'cls-3')

      expect(result).toEqual('cls-1 cls-2 cls-3')
    })

    it('joins two strings created using cx', () => {
      const cls1 = cx('cls-1', 'cls-2')
      const cls2 = cx('cls-3', 'cls-4')

      const result = cx(cls1, cls2)

      expect(result).toEqual('cls-1 cls-2 cls-3 cls-4')
    })
  })
})
