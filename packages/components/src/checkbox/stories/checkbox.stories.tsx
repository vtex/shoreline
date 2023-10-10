import '../../../shoreline/styles.css'
import React from 'react'

import { Checkbox } from '../index'

export default {
  title: 'shoreline-components/checkbox',
}

export function Default() {
  return (
    <div>
      <div
        style={{
          padding: '1rem',
        }}
      >
        <Checkbox>Label</Checkbox>
      </div>
      <div
        style={{
          padding: '1rem',
        }}
      >
        <Checkbox error>Label</Checkbox>
      </div>
    </div>
  )
}

export function LongLabel() {
  return (
    <div
      style={{
        padding: '1rem',
      }}
    >
      <Checkbox>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis
        velit vel metus egestas viverra. Praesent blandit, lectus non viverra
        tristique, libero quam pellentesque enim, sed pellentesque diam turpis
        in urna. In blandit, dui a rhoncus tincidunt, nisi augue elementum
        ligula, id semper odio mauris semper ante.
      </Checkbox>
    </div>
  )
}
