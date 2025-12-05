import { Chart, addHoverToLegendColor } from '@vtex/shoreline-charts'

export default function Example() {
  addHoverToLegendColor('var(--sl-color-red-10)', 'var(--sl-color-red-11)')
  addHoverToLegendColor('var(--sl-color-pink-10)', 'var(--sl-color-pink-11)')
  return (
    <Chart
      chartConfig={{ type: 'bar', variant: 'vertical', gap: 1 }}
      xAxis={{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }}
      series={[
        {
          data: [1, 2, 3, 4, 5, 6, 7],
          name: 'red',
          itemStyle: {
            borderRadius: [10, 10, 0, 0],
          },
          color: 'var(--sl-color-red-10)',
        },
        {
          data: [2, 4, 5, 6, 7, 8, 3],
          name: 'pink',
          itemStyle: {
            borderRadius: [10, 10, 0, 0],
          },
          color: 'var(--sl-color-pink-10)',
        },
      ]}
      checkboxLegend={true}
    />
  )
}
