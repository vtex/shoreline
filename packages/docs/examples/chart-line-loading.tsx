import { Button } from '@vtex/shoreline'
import { Chart } from '@vtex/shoreline-charts'
import { useState } from 'react'

export default function Example() {
  const [currentSeries, setCurrentSeries] = useState<any>([])
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <Button
        variant={'primary'}
        onClick={() => {
          if (isLoading) {
            setCurrentSeries([
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
            ])
            setIsLoading(false)
          } else {
            setIsLoading(true)
          }
        }}
      >
        {isLoading ? 'Finish Loading' : 'Unload'}
      </Button>
      <Chart
        chartConfig={{ type: 'line' }}
        xAxis={{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }}
        series={currentSeries}
        style={{ height: 550 }}
        loading={isLoading}
      />
    </>
  )
}
