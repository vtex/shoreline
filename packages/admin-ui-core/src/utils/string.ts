/**
 * Joins the arguments with dashes
 * @param args strings
 * @example
 * join('a', 'b' 'c') // => 'a-b-c'
 */
export const join = (...args: Array<string | undefined>) =>
  args.filter(Boolean).join('-')
