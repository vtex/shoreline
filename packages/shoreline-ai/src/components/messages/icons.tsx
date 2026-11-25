import type { SVGProps } from 'react'

function Icon(props: SVGProps<SVGSVGElement> & { d: string }) {
  const { d, ...rest } = props

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...rest}>
      <path d={d} />
    </svg>
  )
}

export function IconContentCopy(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon
      d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
      {...props}
    />
  )
}

export function IconExpandMore(props: SVGProps<SVGSVGElement>) {
  return <Icon d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" {...props} />
}

export function IconExpandLess(props: SVGProps<SVGSVGElement>) {
  return <Icon d="m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" {...props} />
}
