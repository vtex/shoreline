import { get, pick } from '../util'

/**
 * 🤖 Return unresolved style props from theme
 * Picks all variants from token entries
 */
export function getStyleProps<T>(params: GetStylePropsParams<T>) {
  const { theme, props = {}, patternKey = 'patterns', styleKeys = [] } = params

  const patternKeys = Object.keys(
    get((theme as unknown) as object, patternKey, {})
  )

  const patterns = pick(props, ...patternKeys)
  const styleProps = pick(props, ...styleKeys)

  const patternProps = Object.keys(patterns).reduce((acc, key) => {
    const patternPath = `${patternKey}.${key}.${get(patterns, key, '')}`
    const styleObject = get((theme as unknown) as object, patternPath, {})

    return { ...acc, ...styleObject }
  }, {})

  return { patternProps, styleProps }
}

export interface GetStylePropsParams<T> {
  theme: T
  props?: unknown
  patternKey?: string
  styleKeys?: string[]
}
