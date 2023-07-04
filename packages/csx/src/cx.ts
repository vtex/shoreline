type CxArgs = Array<string | null | undefined>

/**
 * Spaces classNames properly
 * @param args: classnames to be combined
 * @returns {String} Classnames properly spaced
 * @example
 * cx('cn1', 'cn2') // returns => 'cn1 cn2'
 */
export function cx(...args: CxArgs): string {
  const classNames = args.reduce((acc, argument) => {
    if (!argument) {
      return acc ?? ''
    }

    const trimmedArgument = argument.trim()
    const trimmedClassNames = `${acc} ${trimmedArgument}`.trim()

    return trimmedClassNames
  }, '')

  return classNames ?? ''
}
