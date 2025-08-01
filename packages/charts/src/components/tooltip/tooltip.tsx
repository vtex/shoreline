import type { TooltipComponentFormatterCallbackParams } from 'echarts'
import { renderToStaticMarkup } from 'react-dom/server'
import '../../theme/components/tooltip.css'
import { Flex } from '@vtex/shoreline'
import { isArray } from 'lodash'

export default function ChartTooltip({ params, invert }: ChartTooltipProps) {
  if (isArray(params) && invert) params.reverse()
  const realParams = isArray(params)
    ? params.filter(
        (p: any) =>
          typeof p.seriesName === 'string' &&
          !p.seriesName.startsWith('__invisible')
      )
    : params

  return (
    <>
      <h4 data-sl-chart-tooltip-title>
        {isArray(realParams) ? realParams[0].name : realParams.name}
      </h4>
      <div data-sl-chart-tooltip>
        {isArray(realParams) ? (
          realParams.map((param) => (
            <ChartTooltipBase key={param.dataIndex} params={param} />
          ))
        ) : (
          <ChartTooltipBase params={realParams} />
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
