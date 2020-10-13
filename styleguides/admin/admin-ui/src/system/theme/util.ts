import { readableColor } from 'polished'

import colors from './config/colors'

export function contrast(color: string) {
  return readableColor(color, colors.background, colors.text)
}
