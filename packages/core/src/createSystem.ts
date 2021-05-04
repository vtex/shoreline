import createEmotion, { Emotion } from '@emotion/css/create-instance'
import { css, StyleProp } from '@vtex/onda-css'

interface System {
  cn: (styleProp: StyleProp) => string
  emotion: Emotion
}

export function createSystem<T extends {}>(id: string, theme: T): System {
  // onCreateEmotion
  const emotion = createEmotion({
    key: id,
  })

  // onCreateTheme (theme-parse)

  // onCreateAlias

  // const ThemeProvider = createThemeProvider(theme)
  const cn = createStyleCompiler(theme, emotion)

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

export function createStyleCompiler<T extends {}>(theme: T, emotion: Emotion) {
  return function cn(styleProp: StyleProp): string {
    const rawStyles = css(styleProp)(theme)
    const className = emotion.css(rawStyles)

    return className
  }
}
