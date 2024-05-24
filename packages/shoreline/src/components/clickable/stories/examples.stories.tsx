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
