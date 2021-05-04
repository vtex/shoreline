import createEmotion, { Emotion } from '@emotion/css/create-instance'
import { createCSS, StyleProp } from '@vtex/onda-css'
import { Plugin, StepsInstance, buildSteps } from '@vtex/onda-system'
import { plugins as defaultPlugins } from '@vtex/onda-plugins'

interface System {
  cn: (styleProp: StyleProp) => string
  emotion: Emotion
}

interface SystemSpec<Theme extends Record<string, any>> {
  id: string
  theme: Theme
  plugins: Plugin<Theme>[]
}

export function createSystem<Theme extends Record<string, any>>(
  spec: SystemSpec<Theme>
): System {
  const { id, theme, plugins = defaultPlugins } = spec

  const emotion = createEmotion({
    key: id,
  })

  // phases
  const steps = buildSteps(theme, plugins)
  const cn = createStyleCompiler({ theme, emotion, steps })

  return {
    emotion,
    cn,
  }
}

export function createEmotionInstance(appKey: string) {
  return createEmotion({
    key: appKey,
  })
}

interface CompilerSpec<Theme> {
  theme: Theme
  steps: StepsInstance
  emotion: Emotion
}

export function createStyleCompiler<Theme extends Record<string, any>>(
  spec: CompilerSpec<Theme>
) {
  const { theme, steps, emotion } = spec
  const css = createCSS(steps)

  return function cn(styleProp: StyleProp): string {
    const rawStyles = css(styleProp)(theme)
    const className = emotion.css(rawStyles)

    return className
  }
}

/**

structure
  - alias
  - rule
  - split
  - transform

parse
  - use the defined structure to parse human -> meta
  (h: Human) -> meta (object)

compile
  - use the parse to meta -> machine
  (m: Meta) => string

 */
