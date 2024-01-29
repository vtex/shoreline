import React from 'react'

import { Skeleton } from '../index'

export default {
  title: 'components/skeleton',
}

export function Show() {
  return (
    <div>
      <Skeleton style={{ width: 200, height: 200 }} />
      <Skeleton shape="circle" style={{ width: 200, height: 200 }} />
    </div>
  )
}
