import type { TooltipComponentFormatterCallbackParams } from 'echarts'
import { renderToStaticMarkup } from 'react-dom/server'
import '../../theme/components/tooltip.css'
import { Flex } from '@vtex/shoreline'
import { isArray } from 'lodash'

export default function ChartTooltip({
  params,
  invert = false,
  percentage = false,
  dimension,
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
              dimension={dimension}
            />
          ))
        ) : (
          <ChartTooltipBase
            params={params}
            percentage={percentage}
            dimension={dimension}
          />
        )}
      </div>
    </>
  )
}

export function ChartTooltipBase({
  params,
  percentage,
  dimension,
}: { params: any; percentage: boolean; dimension?: number }) {
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
                {getValueForTooltip(params, percentage, dimension)}
              </span>
            </b>
          </Flex>
        </div>
      </div>
    </>
  )
}

function getValueForTooltip(params, percentage, dimension) {
  if (percentage) {
    return `${Math.round(params.value * 1000) / 10}%`
  }
  if (!isArray(params.value)) {
    return params.value
  }
  if (dimension && params.value.length > dimension) {
    return params.value[dimension]
  }
  return params.value[1]
}

export const getTooltipStaticString = (props: FormatterParams) => {
  const { params, invert = false, percentage = false, dimension } = props
  return renderToStaticMarkup(
    <ChartTooltip
      params={params}
      invert={invert}
      percentage={percentage}
      dimension={dimension}
    />
  )
}

export interface FormatterParams {
  params: TooltipComponentFormatterCallbackParams
  invert?: boolean
  percentage?: boolean
  dimension?: number
}

export interface ChartTooltipProps {
  params: TooltipComponentFormatterCallbackParams
  invert?: boolean
  percentage?: boolean
  dimension?: number
}
