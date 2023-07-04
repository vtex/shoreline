import { COMMA, SPACE } from './constants'

const MATH_SEPARATOR = `${COMMA}${SPACE}`

/**
 * Sets the smallest (most negative) value from a list of comma-separated expressions as the value of a CSS property value
 * @link https://developer.mozilla.org/en-US/docs/Web/CSS/min
 */
export function min(...values: Array<string | number>) {
  const joinedString = values.join(MATH_SEPARATOR)

  return `min(${joinedString})`
}

/**
 * Sets the largest (most positive) value from a list of comma-separated expressions as the value of a CSS property value
 * @link https://developer.mozilla.org/en-US/docs/Web/CSS/max
 */
export function max(...values: Array<string | number>) {
  const joinedString = values.join(MATH_SEPARATOR)

  return `max(${joinedString})`
}

/**
 * Clamps a middle value within a range of values between a defined minimum bound and a maximum bound
 * @link https://developer.mozilla.org/en-US/docs/Web/CSS/clamp
 * @param {String} min
 * @param {String} val
 * @param {String} max
 */
export function clamp(min: string, val: string, max: string) {
  return `clamp(${min}${MATH_SEPARATOR}${val}${MATH_SEPARATOR}${max})`
}

/**
 * Lets you perform calculations when specifying CSS property values
 * @returns
 */
export function add(value1: string | number, value2: string | number) {
  return `calc(${value1} + ${value2})`
}

/**
 * Lets you perform calculations when specifying CSS property values
 */
export function subtract(value1: string | number, value2: string | number) {
  return `calc(${value1} - ${value2})`
}

/**
 * Lets you perform calculations when specifying CSS property values
 */
export function multiply(value1: string | number, value2: string | number) {
  return `calc(${value1} * ${value2})`
}

/**
 * Lets you perform calculations when specifying CSS property values
 */
export function divide(value1: string | number, value2: string | number) {
  return `calc(${value1} / ${value2})`
}

/**
 * Lets you perform calculations when specifying CSS property value
 */
export function negate(value1: string | number) {
  return `calc(-${value1})`
}

export const calc = {
  add,
  subtract,
  multiply,
  divide,
  negate,
}
