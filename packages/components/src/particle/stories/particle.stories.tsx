import React, { useLayoutEffect, useRef } from 'react'

import { Particle } from '../index'

export default {
  title: 'shoreline-components/particle',
}

export function Default() {
  const ref = useRef()

  useLayoutEffect(() => {
    console.log(ref.current)
  }, [])

  return (
    <Particle
      onClick={() => {
        console.log('clicked')
      }}
      ref={ref}
    >
      <a href="https://vtex.com.br" target="_blank" rel="noreferrer">
        Link to something
      </a>
    </Particle>
  )
}
