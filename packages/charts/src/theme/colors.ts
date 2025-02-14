import { presetSunrise } from '@vtex/shoreline'
import { parseTokens } from '@vtex/shoreline-utils'

export const colors = parseTokens({
  tokens: presetSunrise?.tokens?.color ?? {},
})

export const defaultColorPreset = [
  colors['--sl-blue-8'],
  colors['--sl-orange-6'],
  colors['--sl-purple-9'],
  colors['--sl-pink-8'],
]

export const defaultChartColorConfig = {
  lineColor: colors['--sl-gray-6'],
  textSoft: colors['--sl-gray-9'],
  bgLineColor: colors['--sl-gray-3'],
}

export const defaultSpinnerColor = colors['--sl-blue-8']
