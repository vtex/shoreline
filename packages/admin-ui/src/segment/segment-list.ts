import { Composite } from 'reakit'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './segment.style'

export const SegmentList = createComponent<typeof Composite>((props) =>
  useElement(Composite, {
    baseStyle: style.segmentList,
    ...props,
  })
)
