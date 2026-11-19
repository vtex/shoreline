/**
 * The kind of drawing a series makes, which is what its legend icon should
 * imitate — the reader matches the legend to the chart by shape, not only by
 * color.
 */
export type SeriesDrawing = 'bar' | 'standard' | 'forecast'

// The engine scales path icons into the legend item box (the theme squares it),
// so every icon is authored in the same 24×24 coordinate space. Bars keep the
// engine's own square; only lines need a custom path.
const squareViewBox = 24
const midY = squareViewBox / 2
const strokeWidth = 2.5
const lineTop = midY - strokeWidth / 2
const lineBottom = midY + strokeWidth / 2
const radius = 3.5

/**
 * A filled rectangle standing in for a stroke segment: legend path icons are
 * always filled — `lineStyle` does not stroke them — so the line itself has to
 * be drawn as geometry. The series' color is inherited by the fill.
 */
function segment(x1: number, x2: number): string {
  return [
    `M${x1} ${lineTop}`,
    `L${x2} ${lineTop}`,
    `L${x2} ${lineBottom}`,
    `L${x1} ${lineBottom}`,
    'Z',
  ].join(' ')
}

/**
 * Filled circle at the icon's center, closed with a hair's-width arc so the
 * subpath fills rather than strokes.
 */
const dot = `M${midY} ${midY - radius} A${radius} ${radius} 0 1 1 ${midY - 0.001} ${midY - radius} Z`

/**
 * Standard line: a solid horizontal stroke with a filled dot at its center —
 * the stroke is the trend, the dot is one of its points.
 */
const standardLinePath = [segment(1, squareViewBox - 1), dot].join(' ')

/**
 * Dashed stroke without a dot: the dashes read as the forecast's dashed line.
 * Three dashes, evenly spaced across the icon's width.
 */
function forecastLinePath(): string {
  const dashLength = 5
  const gap = 3.5
  const total = dashLength * 3 + gap * 2
  const startX = (squareViewBox - total) / 2
  const parts: string[] = []

  for (let index = 0; index < 3; index++) {
    const x = startX + index * (dashLength + gap)

    parts.push(segment(x, x + dashLength))
  }

  return parts.join(' ')
}

/**
 * Legend icon for a series' drawing. A legend `data` list shows only the series
 * it names, so every series needs an entry — bars take the engine's square
 * (driven by the theme's item width/height), while lines get a path drawn
 * entirely as filled subpaths, which the legend paints in the series' own
 * color.
 */
export function legendIcon(drawing: SeriesDrawing): string {
  if (drawing === 'bar') return 'rect'

  return `path://${drawing === 'forecast' ? forecastLinePath() : standardLinePath}`
}
