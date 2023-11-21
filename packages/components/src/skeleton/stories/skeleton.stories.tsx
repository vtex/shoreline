import React from 'react'

import { Skeleton } from '../index'

export default {
  title: 'shoreline-components/skeleton',
}

export function Default() {
  return <Skeleton style={{ width: 200, height: 200 }} />
}

export function Shape() {
  return (
    <div>
      <Skeleton style={{ width: 200, height: 200 }} />
      <Skeleton shape="circle" style={{ width: 200, height: 200 }} />
    </div>
  )
}
