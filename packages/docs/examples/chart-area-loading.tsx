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
              { data: [70, 40, 55, 35, 39, 30, 25], name: 'Product A' },
              { data: [0, 0, 5, 10, 25, 45, 55], name: 'Product B' },
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
        chartConfig={{ type: 'bar', variant: 'vertical' }}
        xAxis={{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }}
        series={currentSeries}
        loading={isLoading}
      />
    </>
  )
}
