export interface TooltipPositionInput {
  /**
   * Mouse/data point, relative to the chart's own bounds.
   */
  point: [number, number]
  contentSize: [number, number]
  viewSize: [number, number]
  /**
   * Gap between the hovered point and the tooltip.
   */
  offset: number
}

/**
 * `offset` px to the left or right of the hovered point, flipping sides by
 * which half of the chart it falls in, vertically centered on the point —
 * design-notes/tooltip.md, Positioning. Clamped so the tooltip never renders
 * outside the chart's own bounds.
 */
export function getTooltipPosition(
  input: TooltipPositionInput
): [number, number] {
  const { point, contentSize, viewSize, offset } = input
  const [pointX, pointY] = point
  const [contentWidth, contentHeight] = contentSize
  const [viewWidth, viewHeight] = viewSize

  const onLeftHalf = pointX < viewWidth / 2
  const rawX = onLeftHalf ? pointX + offset : pointX - contentWidth - offset
  const x = Math.min(Math.max(rawX, 0), Math.max(viewWidth - contentWidth, 0))

  const rawY = pointY - contentHeight / 2
  const y = Math.min(Math.max(rawY, 0), Math.max(viewHeight - contentHeight, 0))

  return [x, y]
}
