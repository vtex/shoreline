import { Composite } from 'reakit'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import * as style from './date-field.style'

export const DateField = createComponent<typeof Composite>((props) =>
  useElement(Composite, {
    baseStyle: style.dateField,
    ...props,
  })
)
