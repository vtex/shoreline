/**
 * Diameter of the marker a line draws at each point. Matches the engine's own
 * default, which the chart relies on: the marker and the isolated-point
 * markers drawn in dense charts must be the same size.
 */
export const lineSymbolSize = 4

// Design spec, markers: neighbours closer than this many marker diameters turn
// the line into a bead necklace, and the trend stops reading. The multiple is
// the design's calibration start, not a hard rule.
const markerSpacingMultiple = 3

/**
 * Whether lines can draw a marker at every point and still read as a line.
 *
 * The criterion is the pixel distance between neighbours, not the point count:
 * 30 daily points fit comfortably on a desktop chart and crowd on a phone. The
 * estimate uses the whole container, so it runs a few percent generous — grid
 * padding and the value axis' labels take their share — and a chart whose
 * width is not measured yet keeps its markers rather than guessing.
 */
export function pointMarkersFit(args: {
  /**
   * Number of categories on the shared category axis.
   */
  count: number
  /**
   * Width of the chart in px, or undefined before layout.
   */
  width?: number
}): boolean {
  const { count, width } = args

  if (count < 2 || width === undefined || !Number.isFinite(width) || width <= 0)
    return true

  return width / (count - 1) >= lineSymbolSize * markerSpacingMultiple
}

export interface IsolatedPoint {
  index: number
  value: number
}

function hasValue(value: number | null | undefined): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

/**
 * Values with no neighbouring value: both adjacent categories are gaps, so no
 * line segment reaches them and the point would vanish from the chart once
 * markers are hidden. A point at either end of the series counts when its only
 * neighbour is a gap, for the same reason.
 */
export function isolatedPoints(
  data: Array<number | null | undefined>
): IsolatedPoint[] {
  const points: IsolatedPoint[] = []

  data.forEach((value, index) => {
    if (
      hasValue(value) &&
      !hasValue(data[index - 1]) &&
      !hasValue(data[index + 1])
    )
      points.push({ index, value })
  })

  return points
}
