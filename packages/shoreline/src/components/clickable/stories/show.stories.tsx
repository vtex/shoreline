import { Clickable } from '../index'

export default {
  title: 'components/clickable',
}

export function Show() {
  return (
    <Clickable onClick={() => alert('Parent click')}>
      <p>Select me will NOT trigger clicks</p>
      <button onClick={() => alert('Child click')}>Child</button>
    </Clickable>
  )
}
