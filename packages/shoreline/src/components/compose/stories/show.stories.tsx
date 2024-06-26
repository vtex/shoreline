import { useRef } from 'react'

import { Compose } from '../index'

export default {
  title: 'components/compose',
}

export function Show() {
  const ref = useRef()

  return (
    <Compose
      onClick={() => {
        console.log('clicked')
      }}
      ref={ref}
    >
      <a href="https://vtex.com.br" target="_blank" rel="noreferrer">
        Go to VTEX
      </a>
    </Compose>
  )
}
