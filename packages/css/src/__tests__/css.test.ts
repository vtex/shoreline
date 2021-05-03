import { css } from '../css'

describe('resilience', () => {
  it('returns a function', () => {
    const result = css()
    expect(typeof result).toBe('function')
  })

  it('returns an object', () => {
    const result = css()()
    expect(typeof result).toBe('object')
  })

  it('returns unpared css', () => {
    const result = css({
      fontSize: 32,
      color: 'blue',
      borderRadius: 4,
    })()

    expect(result).toEqual({
      fontSize: 32,
      color: 'blue',
      borderRadius: 4,
    })
  })
})

describe('basic rules', () => {
  const theme = {
    space: [0, 1, 2, 4, 8],
  }

  it('should be able to consume a rule', () => {
    const result = css({
      padding: 4,
      margin: 3,
    })(theme)

    expect(result).toEqual({
      padding: 8,
      margin: 4,
    })
  })

  it('goes literal if some rule does not match', () => {
    const result = css({
      padding: 20,
      margin: 100,
    })(theme)

    expect(result).toEqual({
      padding: 20,
      margin: 100,
    })
  })

  it('should be able to handle aliases', () => {
    const result = css({
      bg: 'blue',
    })(theme)

    expect(result).toEqual({
      backgroundColor: 'blue',
    })
  })

  it('should be able to handle splits', () => {
    const result = css({
      marginX: 4,
      size: 100,
    })(theme)

    expect(result).toEqual({
      marginLeft: 8,
      marginRight: 8,
      height: 100,
      width: 100,
    })
  })
})

describe('complex rules', () => {
  const theme = {
    space: [0, 1, 2, 4, 8],
    text: {
      small: {
        fontSize: 1,
        fontFamily: 'sans-serif',
      },
    },
  }

  it('should be able to consume object rules', () => {
    const result = css({
      padding: 4,
      text: 'small',
    })(theme)

    expect(result).toEqual({
      padding: 8,
      fontSize: 1,
      fontFamily: 'sans-serif',
    })
  })
})
