import { Button } from '@vtex/shoreline'
import { Chart } from '@vtex/shoreline-charts'
import { useState } from 'react'

export default function Example() {
  const [zoom, changeZoom] = useState(true)

  const toogleZoom = () => {
    const newZoom = !zoom
    changeZoom(newZoom)
  }

  return (
    <>
      <Button onClick={toogleZoom}>Zoom</Button>
      <Chart
        chartConfig={{ type: 'line' }}
        option={{
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          series: {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            lineStyle: { type: 'dashed' },
          },
        }}
        dataZoom={zoom}
      />
    </>
  )
}
