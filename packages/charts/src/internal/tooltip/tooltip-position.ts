export interface TooltipPositionInput {
  /**
   * Mouse/data point, relative to the chart's own bounds.
   */
  point: [number, number]
  contentSize: [number, number]
  /**
   * Chart bounds. Only used to pick the side to flip to — the result is not
   * confined to them.
   */
  viewSize: [number, number]
  /**
   * Gap between the hovered point and the tooltip.
   */
  offset: number
}

/**
 * `offset` px to the left or right of the hovered point, flipping sides by
 * which half of the chart it falls in, vertically centered on the point, per
 * the design spec's positioning rule.
 *
 * Deliberately unclamped: the tooltip is allowed to overflow the chart's own
 * bounds rather than being pushed back inside them. Clamping moved the tooltip
 * off the hovered bar on small charts, which reads as pointing at the wrong
 * category — worse than overlapping whatever sits next to the chart. The half
 * flip already keeps it inside the chart in the common case, and `viewSize` is
 * still what that flip is measured against.
 */
export function getTooltipPosition(
  input: TooltipPositionInput
): [number, number] {
  const { point, contentSize, viewSize, offset } = input
  const [pointX, pointY] = point
  const [contentWidth, contentHeight] = contentSize
  const [viewWidth] = viewSize

  const onLeftHalf = pointX < viewWidth / 2
  const x = onLeftHalf ? pointX + offset : pointX - contentWidth - offset
  const y = pointY - contentHeight / 2

  return [x, y]
}
