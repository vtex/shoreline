import { CSSObject } from '@emotion/css'
import { merge, get } from './util'

import { transformations } from './transform'
import { scales, Scales } from './scales'
import { aliases, Aliases } from './aliases'
import { multiples, Multiples } from './multiples'
import { defaultTheme } from './defaultObjects'
import { responsive } from './responsive'
import { CssPropsArgument, StyleObject, StyleProp, Theme } from './types'

export const styles = (args: StyleProp = {}) => (
  props: CssPropsArgument = {}
): CSSObject => {
  const theme: Theme = {
    ...defaultTheme,
    ...('theme' in props ? props.theme : props),
  }

  const result: CSSObject = {}
  let obj = typeof args === 'function' ? args(theme) : args

  if (obj.themeKey) {
    if (typeof obj.themeKey === 'object') {
      const [componentName] = Object.keys(obj.themeKey)
      const values = obj.themeKey[componentName]
      const component = get(theme, `components.${componentName}`, {})
      obj = {
        ...Object.keys(values).reduce((acc, entry) => {
          const defaultStyles = get(component, `${entry}.styles`, {})
          const entryStyles = get(component, `${entry}.${values[entry]}`, {})

          return merge(acc, defaultStyles, entryStyles)
        }, component?.styles ?? {}),
        ...obj,
      }
    } else {
      obj = { ...get(theme, obj.themeKey), ...obj }
    }
    delete obj.themeKey
  }

  const stylx = responsive(obj)(theme)

  for (const key in stylx) {
    const x = stylx[key as keyof typeof stylx]
    const val = typeof x === 'function' ? x(theme) : x
    const prop = key in aliases ? aliases[key as keyof Aliases] : key
    
    if (val && typeof val === 'object') {
      result[prop] = styles(val as StyleObject)(theme)
      continue
    }

    const scaleName = prop in scales ? scales[prop as keyof Scales] : undefined
    const scale = scaleName ? theme?.[scaleName] : get(theme, prop, {})
    const transform = get(transformations, prop, get)
    let value = transform(scale, val, val)
    const isObjectScale = value && typeof value === 'object'

    if (isObjectScale) {
      const defaultValue = value.default

      if (defaultValue) {
        if (typeof defaultValue === 'object') {
          value = styles(defaultValue)(theme)
          Object.assign(result, value)
          delete result[prop]
        } else {
          value = { [prop]: defaultValue }
          Object.assign(result, value)
        }
      } else {
        value = styles(value)(theme)
        Object.assign(result, value)
        delete result[prop]
      }
    }

    if (prop in multiples) {
      const dirs = multiples[prop as keyof Multiples]

      for (let i = 0; i < dirs.length; i++) {
        result[dirs[i]] = value
      }
    } else if (!isObjectScale) {
      result[prop] = value
    }
  }

  return result
}
