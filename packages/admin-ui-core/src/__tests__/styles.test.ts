import { cx, styles } from '../styles'

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

    it('should be able to handle splits', () => {
      const result = styles(
        {
          marginX: '$sm',
          size: 100,
        },
        {
          hspace: {
            sm: 8,
          },
        }
      )

      expect(result).toEqual({
        marginLeft: 8,
        marginRight: 8,
        height: 100,
        width: 100,
      })
    })
  })

  describe('complex rules', () => {
    it('should consume object rules', () => {
      const result = styles(
        {
          text: '$detail',
        },
        {
          text: {
            detail: {
              fontSize: 14,
              fontFamily: 'sans-serif',
            },
          },
        }
      )

      expect(result).toEqual({
        fontSize: 14,
        fontFamily: 'sans-serif',
      })
    })

    it('should accept functional rules', () => {
      const result = styles(
        {
          bg: (theme) => theme.bg.primary,
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

  describe('__EXPERIMENTAL__ responsive scales', () => {
    it('returns correct media query order', () => {
      const result = styles({
        width: ['100%', null, '50%'],
        color: ['red', 'green', 'blue'],
      })

      const keys = Object.keys(result)

      expect(keys).toEqual([
        'width',
        '@media screen and (min-width: 40em)',
        '@media screen and (min-width: 48em)',
        'color',
      ])

      expect(result).toEqual({
        width: '100%',
        '@media screen and (min-width: 40em)': {
          color: 'green',
        },
        '@media screen and (min-width: 48em)': {
          width: '50%',
          color: 'blue',
        },
        color: 'red',
      })
    })

    it('returns correct media query order 2', () => {
      const result = styles({
        flexDirection: 'column',
        justifyContent: [null, 'flex-start', 'flex-end'],
        color: 'background',
        height: '100%',
        paddingX: [2, 3, 4],
        paddingY: 4,
      })

      const keys = Object.keys(result)

      expect(keys).toEqual([
        'flexDirection',
        'justifyContent',
        '@media screen and (min-width: 40em)',
        '@media screen and (min-width: 48em)',
        'color',
        'height',
        'paddingLeft',
        'paddingRight',
        'paddingTop',
        'paddingBottom',
      ])
    })
  })

  describe('chained selectors alias', () => {
    it('returns CSS selectors correct syntax', () => {
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
