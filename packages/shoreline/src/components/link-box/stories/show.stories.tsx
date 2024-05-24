import { LinkBox } from '../index'

export default {
  title: 'components/link-box',
}

export function Show() {
  return (
    <LinkBox href="https://vtex.com">
      <a href="https://google.com">Link to Google</a>
      <button onClick={() => alert('Alert message')}>Alert Something</button>
    </LinkBox>
  )
}
