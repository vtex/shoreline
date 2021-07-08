// import React from 'react'
import { jsx } from '@vtex/onda-react'

export const Empty = jsx.div({}, {
  useOptions(_,props){
    return {
      ...props,
    }
  }
})