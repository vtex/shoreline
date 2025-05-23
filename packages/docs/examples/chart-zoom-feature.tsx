import { Chart } from '@vtex/shoreline-charts'
import { presetSunrise } from '@vtex/shoreline'
import { parseTokens } from '@vtex/shoreline-utils'

export const colors = parseTokens({
  tokens: presetSunrise?.tokens?.color ?? {},
})

export default function Example() {
  return (
    <Chart
      chartConfig={{ type: 'line' }}
      series={{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        lineStyle: { type: 'dashed' },
      }}
      xAxis={{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }}
      option={{
        toolbox: {
          feature: {
            dataZoom: {
              show: true,
              brushStyle: {
                color: colors['--sl-pink-8'],
                opacity: 0.3,
              },
            },
          },
        },
      }}
    />
  )
}
