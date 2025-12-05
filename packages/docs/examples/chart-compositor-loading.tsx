import { Button } from '@vtex/shoreline'
import { ChartCompositor } from '@vtex/shoreline-charts'
import { useState } from 'react'

export default function Example() {
  const [charts, setCharts] = useState<any>([])
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <Button
        style={{ marginBottom: 'var(--sl-space-2)' }}
        variant={'primary'}
        onClick={() => {
          if (isLoading) {
            setCharts([
              {
                series: { data: [1, 2, 3, 4, 5] },
                chartConfig: { type: 'bar' },
              },
              {
                series: { data: [1, 3, 2, 5, 4] },
                chartConfig: { type: 'line' },
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
      <ChartCompositor
        charts={charts}
        tooltip={{ type: 'line' }}
        loading={isLoading}
        xAxis={{ type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] }}
        yAxis={{ type: 'value', splitLine: { show: true } }}
      />
    </>
  )
}
