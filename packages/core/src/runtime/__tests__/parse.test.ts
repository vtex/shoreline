import { parse } from './setup'

describe('parse', () => {
  describe('resilience', () => {
    it('returns a object', () => {
      const result = parse()
      expect(typeof result).toBe('object')
    })

    it('returns an object', () => {
      const result = parse()
      expect(typeof result).toBe('object')
    })

    it('returns unpared parse', () => {
      const result = parse({
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
    it('should be able to handle default entries', () => {
      const result = parse({
        color: 'primary',
      })

      expect(result).toEqual({
        color: 'blue',
      })
    })

    it('should be able to consume a rule', () => {
      const result = parse({
        padding: 4,
        margin: 3,
      })

      expect(result).toEqual({
        padding: 8,
        margin: 4,
      })
    })

    it('goes literal if some rule does not match', () => {
      const result = parse({
        padding: 20,
        margin: 100,
      })

      expect(result).toEqual({
        padding: 20,
        margin: 100,
      })
    })

    it('should be able to handle aliases', () => {
      const result = parse({
        bg: 'blue',
      })

      expect(result).toEqual({
        backgroundColor: 'blue',
      })
    })

    it('should be able to handle splits', () => {
      const result = parse({
        marginX: 4,
        size: 100,
      })

      expect(result).toEqual({
        marginLeft: 8,
        marginRight: 8,
        height: 100,
        width: 100,
      })
    })
  })

  describe('complex rules', () => {
    it('parses object rules', () => {
      const result = parse({
        padding: 4,
        text: 'small',
      })

      expect(result).toEqual({
        padding: 8,
        fontSize: 14,
        fontFamily: 'sans-serif',
      })
    })
  })

  describe('__EXPERIMENTAL__ responsive scales', () => {
    it('returns correct media query order', () => {
      const result = parse({
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
      const result = parse({
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
})
