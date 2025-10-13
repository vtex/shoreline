import { Chart } from '@vtex/shoreline-charts'
import { useState } from 'react'
import { Button } from '@vtex/shoreline'

export default function Example() {
  const [currentSeries, setCurrentSeries] = useState<any>([])
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <Button
        style={{ marginBottom: 'var(--sl-space-2)' }}
        variant={'primary'}
        onClick={() => {
          if (isLoading) {
            setCurrentSeries([
              { data: [1, 2, 3, 4, 5, 6, 7], name: 'Series A' },
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
