import { LineChart } from '@vtex/shoreline-charts'

const days = Array.from({ length: 90 }, (_, i) => i + 1)

// The line covers roughly the first fifth of the width, stops, resumes around a
// third of the way in and runs to nine tenths, with one lone reading between
// each gap and the next stretch.
const readings = days.map((day) => {
  if (day <= 18) return 120 + (day % 12)
  if (day === 28) return 180
  if (day >= 31 && day <= 81) return 130 + (day % 12)
  if (day === 86) return 90
  return null
})

export default function Example() {
  return (
    <div style={{ width: 420 }}>
      <LineChart
        label="Intermittent sensor readings, 90 days"
        categories={days.map(String)}
        series={[{ name: 'Sensor A', data: readings }]}
      />
    </div>
  )
}
