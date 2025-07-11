import type { TooltipComponentFormatterCallbackParams } from 'echarts'
import { renderToStaticMarkup } from 'react-dom/server'
import '../../theme/components/tooltip.css'
import { Flex } from '@vtex/shoreline'

export default function ChartTooltip({ params, invert }: ChartTooltipProps) {
  if (Array.isArray(params) && invert) params.reverse()
  return (
    <>
      <h4 data-sl-chart-tooltip-title>
        {Array.isArray(params) ? params[0].name : params.name}
      </h4>
      <div data-sl-chart-tooltip>
        {Array.isArray(params) ? (
          params.map((param) => (
            <ChartTooltipBase key={param.dataIndex} params={param} />
          ))
        ) : (
          <ChartTooltipBase params={params} />
        )}
      </div>
    </>
  )
}

export function ChartTooltipBase({ params }: { params: any }) {
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
              <span data-sl-chart-tooltip-data-serie-value>{params.value}</span>
            </b>
          </Flex>
        </div>
      </div>
    </>
  )
}

export const getTooltipStaticString = (
  params: TooltipComponentFormatterCallbackParams,
  invert?: boolean
) => renderToStaticMarkup(<ChartTooltip params={params} invert={invert} />)

export interface ChartTooltipProps {
  params: TooltipComponentFormatterCallbackParams
  invert?: boolean
}
