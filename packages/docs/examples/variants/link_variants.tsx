import { Link } from '@vtex/shoreline'

export function DefaultLink() {
  return <Link href="#">Default Link</Link>
}

export function ExternalLink() {
  return (
    <Link href="https://vtex.com" target="_blank" rel="noopener noreferrer">
      External Link
    </Link>
  )
}

export function LinkWithTitle() {
  return (
    <Link href="#" title="This is a helpful title">
      Link with Title
    </Link>
  )
}
