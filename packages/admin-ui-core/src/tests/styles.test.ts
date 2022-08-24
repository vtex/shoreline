import { get } from '@vtex/admin-ui-util'

import { styles } from '../styles'
import { cx } from '../helpers'
import type { Theme } from '../types'

describe('styles', () => {
  describe('edge cases', () => {
    it('should always return a object', () => {
      expect(typeof styles()).toBe('object')
      expect(typeof styles(undefined)).toBe('object')
      expect(typeof styles({})).toBe('object')
    })

    it('should not touch unkown properties', () => {
      const result = styles({
        abc: 'cba',
      })

      expect(result).toEqual({
        abc: 'cba',
      })
    })

    it('should ignore values that are not tokens', () => {
      const result = styles({
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
      const result = styles(
        {
          color: '$primary',
        },
        {
          fg: {
            primary: 'blue',
          },
        }
      )

      expect(result).toEqual({
        color: 'blue',
      })
    })

    it('goes literal if some rule does not match', () => {
      const result = styles({
        padding: 20,
        margin: 100,
      })

      expect(result).toEqual({
        padding: 20,
        margin: 100,
      })
    })

    it('should be able to handle aliases', () => {
      const result = styles({
        bg: 'blue',
      })

      expect(result).toEqual({
        background: 'blue',
      })
    })
  })

  describe('complex rules', () => {
    it('should consume object rules', () => {
      const result = styles({
        text: '$detail',
      })

      expect(result).toEqual({
        fontFamily: 'var(--admin-ui-text-detail-fontFamily)',
        fontSize: 'var(--admin-ui-text-detail-fontSize)',
        fontVariationSettings:
          'var(--admin-ui-text-detail-fontVariationSettings)',
        letterSpacing: 'var(--admin-ui-text-detail-letterSpacing)',
        lineHeight: 'var(--admin-ui-text-detail-lineHeight)',
      })
    })

    it('should accept functional rules', () => {
      const result = styles(
        {
          bg: (theme: Theme) => theme.bg.primary,
        },
        {
          bg: {
            primary: 'blue',
          },
        }
      )

      expect(result).toEqual({
        background: 'blue',
      })
    })
  })

  describe('chained selectors alias', () => {
    it('returns correct syntax for CSS selectors', () => {
      const result = styles({
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
    const result = styles({
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
