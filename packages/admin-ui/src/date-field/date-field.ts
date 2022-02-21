import { Composite } from 'reakit'
import { createComponent, useElement } from '@vtex/admin-ui-react'

export const DateField = createComponent<typeof Composite>((props) =>
  useElement(Composite, {
    baseStyle: {
      width: 296,
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 1,
      paddingY: 2,
      paddingX: 3,
      border: '$neutral',
      borderRadius: 4,
    },
    ...props,
  })
)
