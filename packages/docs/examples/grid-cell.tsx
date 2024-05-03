import { Grid, GridCell } from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  return (
    <Grid columns="repeat(3, 1fr)" rows="repeat(2, 64px)">
      <GridCell>
        <DecorativeBox />
      </GridCell>
      <GridCell>
        <DecorativeBox />
      </GridCell>
      <GridCell>
        <DecorativeBox />
      </GridCell>
      <GridCell>
        <DecorativeBox />
      </GridCell>
      <GridCell>
        <DecorativeBox />
      </GridCell>
      <GridCell>
        <DecorativeBox />
      </GridCell>
    </Grid>
  )
}
