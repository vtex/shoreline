import isPropValid from '@emotion/is-prop-valid'
import { pick, get } from '@vtex/onda-util'
import { ONDA_METADATA } from './symbols'

export function useOptionsIdentity<Options, Props>(
  _: Options,
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

/**
 * @example
 * pickOptions('div', { options: ['label'] }) => ['label']
 * 
 * const Button = jsx.button({}, { options: ['x']})
 * const YellowButton = jsx(Button)({
 *  bg: 'yellow',
 *  variant: {
 *    
 *  }
 * }, options: {})
 * 
 * <Avatar as="button" csx={{ ... }} />
 * 
 * pickOptions(Button, { options: ['b'] }) => ['x', 'b']
 */
export function pickOptions(type: any, config: any): string[] {
  if (isOndaComponent(type)) {
    // passed an onda component on `as`
    const parentParentOptions = pickOptions(type[ONDA_METADATA].options, {})
    const componentOptions = get(config, 'options', [])
    return [...parentParentOptions, ...componentOptions]
  }
  
  return get(config, 'options', [])
}
