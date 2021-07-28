import { theme } from '@vtex/admin-ui-theme'
import {
  createSystem as baseCreateSystem,
  merge,
  StyleObject,
  Theme
} from '@vtex/admin-ui-system'

interface ThemeOptions {
  overrides?: Partial<Theme>
  components?: Record<string, StyleObject>
}

/**
 * creates a new system
 * @param appKey key of your app
 * @param themeOptions theme options
 */
export function createSystem(
  appKey: string,
  themeOptions: ThemeOptions = {
    overrides: {},
  }
) {
  const { overrides, components } = themeOptions

  const baseTheme = merge(theme, overrides)
  const fullTheme = components
    ? Object.assign(baseTheme, {
        components: {
          ...components,
          ...theme.components,
        },
      })
    : baseTheme

  return baseCreateSystem(fullTheme, `vtex-${appKey}`)
}

/** base system of admin-ui without any new components */
export const defaultSystem = createSystem('admin-ui')

export {
  styles,
  Global,
  css,
  jsxs,
  createComponent,
  isFunction,
  useTheme,
  useResponsiveValue,
  useMediaQuery,
  get,
  pick,
  omit,
  isObjectEmpty,
  merge,
  forwardRef,
  inlineVariant,
  StyleProp,
  StyleObject,
  ResponsiveValue,
  darken,
  lighten,
  grayscale,
  getColor,
  rotate,
  hue,
  saturation,
  lightness,
  saturate,
  desaturate,
  shade,
  tint,
  transparentize,
  alpha,
  mix,
  complement,
  invert,
  Theme,
  Colors,
} from '@vtex/admin-ui-system'
