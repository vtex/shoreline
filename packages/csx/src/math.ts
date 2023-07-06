import { COMMA, SPACE } from './constants'

const MATH_SEPARATOR = `${COMMA}${SPACE}`

/**
 * Sets the smallest (most negative) value from a list of comma-separated expressions as the value of a CSS property value
 * @link https://developer.mozilla.org/en-US/docs/Web/CSS/min
 * @example
 * minx('20rem', '100%') // returns min(20rem, 100%)
 */
export function min(...values: Array<string | number>): string {
  const joinedString = values.join(MATH_SEPARATOR)

  return `min(${joinedString})`
}

/**
 * Sets the largest (most positive) value from a list of comma-separated expressions as the value of a CSS property value
 * @link https://developer.mozilla.org/en-US/docs/Web/CSS/max
 * @example
 * max('20rem', '100%') // returns max(20rem, 100%)
 */
export function max(...values: Array<string | number>): string {
  const joinedString = values.join(MATH_SEPARATOR)

  return `max(${joinedString})`
}

/**
 * Clamps a middle value within a range of values between a defined minimum bound and a maximum bound
 * @link https://developer.mozilla.org/en-US/docs/Web/CSS/clamp
 * @param {String} min
 * @param {String} val
 * @param {String} max
 * @example
 * clamp('200px', '40%', '400px') // returns clamp(200px, 40%, 400px)
 */
export function clamp(min: string, val: string, max: string): string {
  return `clamp(${min}${MATH_SEPARATOR}${val}${MATH_SEPARATOR}${max})`
}

/**
 * Perform operations using calc()
 * @link https://developer.mozilla.org/en-US/docs/Web/CSS/calc
 * @example
 * calc.add('90vh', '1rem') // returns 'calc(90vh + 1rem)'
 * calc.subtract('100%', '1rem') // returns 'calc(100% - 1rem)'
 * calc.multiply('1rem', '50%') // returns 'calc(1rem * 50%)'
 * calc.negate('1rem') // returns 'calc(-1rem)'
 */
export const calc = {
  /**
   * Performs the add (+) operation using calc()
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/calc
   * @param {String} value1
   * @param {String} value2
   * @returns {String} "calc(value1 + value2)"
   */
  add(value1: string | number, value2: string | number): string {
    return `calc(${value1} + ${value2})`
  },
  /**
   * Performs the subtract (-) operation using calc()
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/calc
   * @param {String} value1
   * @param {String} value2
   * @returns {String} "calc(value1 - value2)"
   */
  subtract(value1: string | number, value2: string | number): string {
    return `calc(${value1} - ${value2})`
  },
  /**
   * Performs the multiply (*) operation using calc()
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/calc
   * @param {String} value1
   * @param {String} value2
   * @returns {String} "calc(value1 * value2)"
   */
  multiply(value1: string | number, value2: string | number): string {
    return `calc(${value1} * ${value2})`
  },
  /**
   * Performs the division (/) operation using calc()
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/calc
   * @param {String} value1
   * @param {String} value2
   * @returns {String} "calc(value1 / value2)"
   */
  divide(value1: string | number, value2: string | number): string {
    return `calc(${value1} / ${value2})`
  },
  /**
   * Negate a value using calc()
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/calc
   * @param {String} value
   * @returns {String} "calc(-value)"
   */
  negate(value: string | number): string {
    return `calc(-${value})`
  },
}
