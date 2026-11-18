/**
 * How a line series connects its points: straight segments between values, or
 * a spline through them.
 */
export type ChartCurve = 'linear' | 'smooth'

/**
 * The engine draws a spline when `smooth` is set; every other curve renders as
 * straight segments.
 */
export function isSmoothCurve(curve: ChartCurve = 'linear') {
  return curve === 'smooth'
}
