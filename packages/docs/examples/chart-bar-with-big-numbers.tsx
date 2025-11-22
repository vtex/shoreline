import { Chart } from '@vtex/shoreline-charts'

export const compactNumber = (number: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  })

  return formatter.format(number)
}
export default function Example() {
  return (
    <Chart
      xAxis={{ data: ['Mon', 'Tue', 'Wed'] }}
      yAxis={{
        axisLabel: { formatter: (value: number) => compactNumber(value) },
      }}
      series={[{ data: [12344441, 62346346, 97346346] }]}
      chartConfig={{ type: 'bar', gap: 3 }}
    />
  )
}
