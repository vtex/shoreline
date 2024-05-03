import { Grid } from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  return (
    <Grid columns="repeat(3, 1fr)" rows="repeat(2, 64px)">
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
    </Grid>
  )
}
