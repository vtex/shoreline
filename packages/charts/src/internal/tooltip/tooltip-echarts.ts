import type { AxisTooltipOptions } from './tooltip-model'
import { buildAxisTooltipData } from './tooltip-model'
import { getTooltipPosition } from './tooltip-position'
import { renderChartTooltip } from './tooltip-render'

/**
 * The subset of the engine's `CallbackDataParams` this module reads. Typed
 * locally because the engine doesn't re-export that type from `echarts/core`
 * or `echarts/components`.
 */
interface EChartsAxisTooltipParam {
  name?: string
  seriesName?: string
  value: unknown
  color: unknown
}

interface EChartsTooltipPositionSize {
  contentSize: [number, number]
  viewSize: [number, number]
}

/**
 * Builds an engine tooltip `formatter` for an axis-trigger tooltip: one row
 * per series at the hovered category, per the design spec's "tooltip shows
 * data for the selected bars" behaviour. Bound to the row order the calling
 * chart's geometry calls for — see `AxisTooltipOptions.reverse`.
 */
export function createAxisTooltipFormatter(options: AxisTooltipOptions = {}) {
  return (
    params: EChartsAxisTooltipParam | EChartsAxisTooltipParam[]
  ): string => {
    const items = Array.isArray(params) ? params : [params]

    return renderChartTooltip(
      buildAxisTooltipData(
        items.map((item) => ({
          name: item.name,
          seriesName: item.seriesName,
          value: typeof item.value === 'number' ? item.value : null,
          color: typeof item.color === 'string' ? item.color : undefined,
        })),
        options
      )
    )
  }
}

/**
 * Engine tooltip `position` bound to a resolved pixel offset.
 */
export function createTooltipPositioner(offset: number) {
  return (
    point: [number, number],
    _params: unknown,
    _el: HTMLDivElement | null,
    _rect: unknown,
    size: EChartsTooltipPositionSize
  ): [number, number] =>
    getTooltipPosition({
      point,
      contentSize: size.contentSize,
      viewSize: size.viewSize,
      offset,
    })
}
