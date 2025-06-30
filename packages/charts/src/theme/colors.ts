import { presetSunrise } from '@vtex/shoreline'
import { parseTokens } from '@vtex/shoreline-utils'

export const colors = parseTokens({
  tokens: presetSunrise?.tokens?.color ?? {},
})

export const defaultColorPreset = [
  colors['--sl-blue-8'],
  colors['--sl-purple-9'],
  colors['--sl-orange-6'],
  colors['--sl-pink-8'],
  colors['--sl-teal-11'],
]

export const defaultColorShade = [
  colors['--sl-blue-9'],
  colors['--sl-purple-10'],
  colors['--sl-orange-7'],
  colors['--sl-pink-9'],
  colors['--sl-teal-12'],
]
export const defaultAreaColors = [
  colors['--sl-blue-11'],
  colors['--sl-purple-11'],
  colors['--sl-orange-11'],
  colors['--sl-pink-11'],
  colors['--sl-teal-11'],
]

export const defaultChartColorConfig = {
  lineColor: colors['--sl-gray-6'],
  textSoft: colors['--sl-gray-9'],
  bgLineColor: colors['--sl-gray-3'],
  zoomBoxColor: colors['--sl-pink-4'],
}

export const defaultSpinnerColor = colors['--sl-blue-8']
