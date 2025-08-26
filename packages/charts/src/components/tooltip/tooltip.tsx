import type { TooltipComponentFormatterCallbackParams } from 'echarts'
import { renderToStaticMarkup } from 'react-dom/server'
import '../../theme/components/tooltip.css'
import { Flex } from '@vtex/shoreline'
import { isArray } from 'lodash'

export default function ChartTooltip({
  params,
  invert = false,
  percentage = false,
}: ChartTooltipProps) {
  if (isArray(params) && invert) params.reverse()
  return (
    <>
      <h4 data-sl-chart-tooltip-title>
        {isArray(params) ? params[0].name : params.name}
      </h4>
      <div data-sl-chart-tooltip>
        {isArray(params) ? (
          params.map((param) => (
            <ChartTooltipBase
              key={param.dataIndex}
              params={param}
              percentage={percentage}
            />
          ))
        ) : (
          <ChartTooltipBase params={params} percentage={percentage} />
        )}
      </div>
    </>
  )
}

export function ChartTooltipBase({
  params,
  percentage,
}: { params: any; percentage: boolean }) {
  return (
    <>
      <div data-sl-chart-tooltip-data-container>
        <div data-sl-chart-tooltip-data-serie-container>
          <span
            data-sl-chart-tooltip-data-serie-label-line
            style={{
              backgroundColor: params.color,
            }}
          />
          <Flex direction="column" justify="center" align="left" gap={0}>
            <span data-sl-chart-tooltip-data-serie-name>
              {params.seriesName}
            </span>
            <b>
              <span data-sl-chart-tooltip-data-serie-value>
                {percentage
                  ? `${Math.round(params.value * 1000) / 10}%`
                  : isArray(params.value)
                    ? params.value[1]
                    : params.value}
              </span>
            </b>
          </Flex>
        </div>
      </div>
    </>
  )
}

export const getTooltipStaticString = (
  params: TooltipComponentFormatterCallbackParams,
  invert = false,
  percentage = false
) =>
  renderToStaticMarkup(
    <ChartTooltip params={params} invert={invert} percentage={percentage} />
  )

export interface ChartTooltipProps {
  params: TooltipComponentFormatterCallbackParams
  invert?: boolean
  percentage?: boolean
}
