import { Chart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <Chart
      chartConfig={{ type: 'line' }}
      option={{
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        animationDelay: (idx) => {
          return idx * 100
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: 'Union Ads',
            type: 'line',
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: 'Video Ads',
            type: 'line',
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: 'Direct',
            type: 'line',
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: 'Search Engine',
            type: 'line',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      }}
      style={{ height: 400 }}
    />
  )
}
