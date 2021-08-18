import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'
import deepmerge from 'deepmerge'
import { jsxs, EmotionContext } from '@vtex/admin-jsxs'
import packageInfo from '@emotion/react/package.json'
import type { Theme } from '@vtex/admin-styles'
import { QueryStateProvider } from '@vtex/onda-hooks'

const EMOTION_VERSION = packageInfo.version

export interface ContextValue {
  EMOTION_VERSION: string
  theme: Theme
}

export const Context = createContext<ContextValue>({
  EMOTION_VERSION,
  theme: {},
})

export const useThemeContext = () => useContext(Context)

const canUseSymbol = typeof Symbol === 'function' && Symbol.for

const REACT_ELEMENT = canUseSymbol ? Symbol.for('react.element') : 0xeac7
const FORWARD_REF = canUseSymbol ? Symbol.for('react.forward_ref') : 0xeac7

const deepmergeOptions: deepmerge.Options = {
  isMergeableObject: (n) => {
    return (
      !!n &&
      typeof n === 'object' &&
      (n as React.ExoticComponent).$$typeof !== REACT_ELEMENT &&
      (n as React.ExoticComponent).$$typeof !== FORWARD_REF
    )
  },
  arrayMerge: (_leftArray, rightArray) => rightArray,
}

/**
 * Deeply merge themes
 */
export const mergeThemes = (a: Theme, b: Theme): Theme =>
  deepmerge(a, b, deepmergeOptions)

function mergeAll<A, B>(a: A, B: B): A & B
function mergeAll<A, B, C>(a: A, B: B, c: C): A & B & C
function mergeAll<A, B, C, D>(a: A, B: B, c: C, d: D): A & B & C & D
function mergeAll<T = Theme>(...args: Array<Partial<T>>) {
  return deepmerge.all<T>(args, deepmergeOptions)
}

mergeThemes.all = mergeAll

interface BaseProviderProps {
  context: ContextValue
  children?: ReactNode
}

function BaseProvider(props: BaseProviderProps) {
  const { context, children } = props

  return jsxs(
    EmotionContext.Provider,
    { value: context.theme },
    jsxs(Context.Provider, { value: context }, children)
  )
}

export interface ThemeProviderProps {
  theme: Theme | ((outerTheme: Theme) => Theme)
  children?: ReactNode
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  const outer = useThemeContext()

  if (process.env.NODE_ENV !== 'production') {
    if (outer.EMOTION_VERSION !== EMOTION_VERSION) {
      console.warn(
        'Multiple versions of Emotion detected,',
        'and theming might not work as expected.',
        'Please ensure there is only one copy of @emotion/react installed in your application.'
      )
    }
  }

  const context =
    typeof theme === 'function'
      ? { ...outer, theme: theme(outer.theme) }
      : mergeThemes.all({}, outer, { theme })

  return jsxs(
    BaseProvider,
    { context },
    jsxs<{}>(QueryStateProvider, {}, children)
  )
}
