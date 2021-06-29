import isPropValid from '@emotion/is-prop-valid'
import { pick, get } from '@vtex/onda-util'
import { ONDA_METADATA } from './symbols'

export function useOwnPropsIdentity<OwnProps, Props>(
  _: OwnProps,
  props: Props
) {
  return props
}

/**
 * clean invalid HTML props
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

export function isStrict(type: any) {
  return !!(type as any).as
}

export function pickOwnProps(type: any): string[] {
  if (isStrict(type)) {
    if (isOndaComponent(type.as)) {
      // passed an onda component on `as`
      const parentOwnProps = pickOwnProps(type.as)
      const ownProps = get(type, 'ownProps', [])
      return [...parentOwnProps, ...ownProps]
    }
    return get(type, 'ownProps', [])
  }

  // is a literal type
  if (isOndaComponent(type)) {
    const meta = type[ONDA_METADATA]
    return get(meta, 'ownProps', [])
  }

  return []
}
