import { Stack } from '../index'
import { style } from '@vtex/shoreline-utils'

export default {
  title: 'components/stack',
}

const itemStyle = style({
  background: '$color-blue-3',
  borderRadius: '$border-radius-2',
  width: '5rem',
  height: '3rem',
  display: 'grid',
  placeItems: 'center',
})

export function Depth() {
  return (
    <div className="App">
      <p style={{ margin: '0 0 var(--sl-space-2)' }}>With two coluns:</p>
      <Stack space="$space-10" horizontal>
        <Stack space="$space-1">
          <div style={itemStyle}>Col A 1</div>
          <div style={itemStyle}>Col A 2</div>
          <div style={itemStyle}>Col A 3</div>
        </Stack>

        <Stack space="$space-1">
          <div style={itemStyle}>Col B 1</div>
          <div style={itemStyle}>Col B 2</div>
          <div style={itemStyle}>Col B 3</div>
        </Stack>
      </Stack>

      <p style={{ margin: 'var(--sl-space-10) 0 var(--sl-space-2)' }}>
        With three coluns:
      </p>

      <Stack space="$space-20" horizontal>
        <Stack space="$space-10">
          <div style={itemStyle}>Col A 1</div>
          <div style={itemStyle}>Col A 2</div>
          <div style={itemStyle}>Col A 3</div>
        </Stack>

        <Stack space="$space-5">
          <div style={itemStyle}>Col B 1</div>
          <div style={itemStyle}>Col B 2</div>
          <div style={itemStyle}>Col B 3</div>
        </Stack>

        <Stack space="$space-1">
          <div style={itemStyle}>Col C 1</div>
          <div style={itemStyle}>Col C 2</div>
          <div style={itemStyle}>Col C 3</div>
        </Stack>
      </Stack>
    </div>
  )
}
