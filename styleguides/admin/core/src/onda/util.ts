import isPropValid from '@emotion/is-prop-valid'
import { pick } from '../system'
import { ONDA_METADATA } from './symbols'

export function useOwnPropsIdentity<OwnProps, Props>(_: OwnProps, j: Props) {
  return j
}

/**
 * clean not valid html props
 * @param props
 */
export function cleanProps<P extends {}>(props: P) {
  const validKeys = Object.keys(props).filter(isPropValid)
  const htmlProps = pick(props, validKeys)
  return htmlProps
}

export function isOndaComponent(value: any): boolean {
  return !!value[ONDA_METADATA]
}

export function pickOwnProps(type: any) {
  // is a configuration
  if (!!type.as) {
    if (isOndaComponent(type.as)) {
      // passed an onda component on `as`
      const meta = type[ONDA_METADATA]
      return [...(meta?.ownProps ?? []), ...(type?.ownProps ?? [])]
    }
    return type?.ownProps ?? []
  }

  // is a literal type
  if (isOndaComponent(type)) {
    const meta = type[ONDA_METADATA]
    return meta?.ownProps ?? []
  }

  return []
}
