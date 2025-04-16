import type { TooltipComponentFormatterCallbackParams } from 'echarts'
import { renderToStaticMarkup } from 'react-dom/server'
import '../../theme/components/tooltip.css'

export default function ChartTooltip({ params }: ChartTooltipProps) {
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
            data-sl-chart-tooltip-data-serie-label-box
            style={{
              backgroundColor: params.color,
            }}
          />
          <span data-sl-chart-tooltip-data-serie-name>{params.seriesName}</span>
        </div>
        <span data-sl-chart-tooltip-data-serie-value>{params.value}</span>
      </div>
    </>
  )
}

export const getTooltipStaticString = (
  params: TooltipComponentFormatterCallbackParams
) => renderToStaticMarkup(<ChartTooltip params={params} />)

export interface ChartTooltipProps {
  params: TooltipComponentFormatterCallbackParams
}
