import { Stack } from '../../stack'
import { Clickable, ClickableBubble } from '../index'

export default {
  title: 'components/clickable',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function ClickBubble() {
  return (
    <Clickable onClick={() => alert('Parent click')}>
      <ClickableBubble>
        <p>Click the text will bubble the click event to the parent</p>
      </ClickableBubble>
      <button onClick={() => alert('Child click')}>Child</button>
    </Clickable>
  )
}

export function ClickBubbleAllChildren() {
  return (
    <Stack>
      <Clickable onClick={() => alert('Parent click')}>
        <ClickableBubble>
          <p>
            Click the text will bubble the click event to the parent{' '}
            <span style={{ fontWeight: 600 }}>
              and click in their child too
            </span>{' '}
            because the ClickableBubble is not set to onlyImmediateChild
          </p>
        </ClickableBubble>
        <button onClick={() => alert('Child click')}>Child</button>
      </Clickable>
      <Clickable onClick={() => alert('Parent click')}>
        <ClickableBubble onlyImmediateChild>
          <p>
            Click the text will bubble the click event to the parent{' '}
            <span style={{ fontWeight: 600 }}>
              and click in their child will not
            </span>{' '}
            because the ClickableBubble is set to onlyImmediateChild
          </p>
        </ClickableBubble>
        <button onClick={() => alert('Child click')}>Child</button>
      </Clickable>
    </Stack>
  )
}
