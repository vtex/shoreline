type CxArgs = Array<string | null | undefined>

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
