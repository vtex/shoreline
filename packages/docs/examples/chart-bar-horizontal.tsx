import { Chart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <Chart
      chartConfig={{ type: 'bar', variant: 'horizontal' }}
      option={{
        yAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        animationDelay: (idx) => {
          console.log(idx)
          return idx * 100
        },
        series: [{ data: [1, 2, 3, 4, 5, 6, 7] }],
      }}
    />
  )
}
