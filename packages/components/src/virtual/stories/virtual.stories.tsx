import '../../../dist/styles.min.css'
import React, { useMemo } from 'react'

import { Virtual } from '../index'

export default {
  title: 'shoreline-components/virtual',
}

export function Default() {
  const items = useMemo(() => new Array(100000).fill(true), [])

  return (
    <Virtual items={items} estimateSize={() => 35}>
      {({ items, bottom, top, ref }) => (
        <div
          style={{ height: '500px', width: `400px`, overflow: 'auto' }}
          ref={ref}
        >
          {top > 0 && <div style={{ height: `${top}px` }} />}
          {items.map((item) => (
            <div key={item.index} style={{ height: `${item.size}px` }}>
              Item {item.index}
            </div>
          ))}
          {bottom > 0 && <div style={{ height: `${bottom}px` }} />}
        </div>
      )}
    </Virtual>
  )
}
