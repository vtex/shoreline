/**
 * The kind of drawing a series makes, which is what its legend icon should
 * imitate — the reader matches the legend to the chart by shape, not only by
 * color.
 */
export type SeriesDrawing = 'bar' | 'standard' | 'forecast'

// Icons are authored in the legend's own item box (20×12, from the chart
// theme) so their units are pixels: a 2-unit stroke renders 2px thick, and the
// marker's ring keeps the thickness the chart draws around each point. The
// box is wider than it is tall so a line reads as a line with a marker on it,
// and the square a bar gets stays 12×12 inside it.
const slotWidth = 20
const slotHeight = 12
const midX = slotWidth / 2
const midY = slotHeight / 2
const strokeWidth = 2
const lineTop = midY - strokeWidth / 2
const lineBottom = midY + strokeWidth / 2
// The point marker: 10px across with the chart's 2px ring, so it is a size
// bigger than the marker drawn on the line itself, as the design has it.
const markerRadius = 5
const markerRing = 2
const squareSize = slotHeight

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
 * A ring at the icon's center: the outer circle, then the inner one wound the
 * other way, so the fill rule cuts the center out. The hole stays transparent,
 * which is what the legend's own background shows through — the chart marker
 * it imitates is drawn on top of its line the same way.
 */
function marker(): string {
  const outer = markerRadius
  const inner = markerRadius - markerRing

  return [
    `M${midX - outer} ${midY}`,
    `A${outer} ${outer} 0 1 1 ${midX + outer} ${midY}`,
    `A${outer} ${outer} 0 1 1 ${midX - outer} ${midY}`,
    'Z',
    `M${midX - inner} ${midY}`,
    `A${inner} ${inner} 0 1 0 ${midX + inner} ${midY}`,
    `A${inner} ${inner} 0 1 0 ${midX - inner} ${midY}`,
    'Z',
  ].join(' ')
}

/**
 * Standard line: a solid stroke with the marker at its center — the stroke is
 * the trend, the marker is one of its points. The stroke stops at the marker
 * instead of running under it, so the hole reads as the point's white center.
 */
const standardLinePath = [
  segment(0, midX - markerRadius),
  marker(),
  segment(midX + markerRadius, slotWidth),
].join(' ')

/**
 * Dashed stroke without a marker: the dashes read as the forecast's dashed
 * line. Four dashes, evenly spaced across the icon's width, sized to the
 * two-pixel stroke they share with the standard line.
 */
function forecastLinePath(): string {
  const dashLength = 3
  const gap = 2.5
  const total = dashLength * 4 + gap * 3
  const startX = (slotWidth - total) / 2
  const parts: string[] = []

  for (let index = 0; index < 4; index++) {
    const x = startX + index * (dashLength + gap)

    parts.push(segment(x, x + dashLength))
  }

  return parts.join(' ')
}

/**
 * A filled square for a bar series, centered in the wide icon box. Bars keep
 * the square the engine draws them with; it comes from a path instead of
 * `'rect'` because `'rect'` fills the whole item box and would stretch to the
 * box's width.
 */
const squareLeft = (slotWidth - squareSize) / 2
const squareRight = squareLeft + squareSize
const barPath = [
  `M${squareLeft} 0`,
  `L${squareRight} 0`,
  `L${squareRight} ${squareSize}`,
  `L${squareLeft} ${squareSize}`,
  'Z',
].join(' ')

/**
 * Legend icon for a series' drawing. Every series gets an entry — a legend
 * `data` list shows only the series it names — and every icon is a path drawn
 * as filled subpaths, which the legend paints in the series' own color.
 */
export function legendIcon(drawing: SeriesDrawing): string {
  if (drawing === 'bar') return `path://${barPath}`

  return `path://${drawing === 'forecast' ? forecastLinePath() : standardLinePath}`
}
