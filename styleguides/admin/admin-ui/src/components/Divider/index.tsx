import { Separator } from 'reakit'
import { createOnda } from '@vtex/admin-core'

export const Divider = createOnda(
  {
    as: Separator,
    ownProps: ['orientation'],
  },
  {
    text: 'headline',
    border: 'solid',
    borderWidth: 1,
    borderColor: 'mid.tertiary',
    margin: 0,
    variants: {
      orientation: {
        horizontal: {
          borderBottom: 0,
        },
        vertical: {
          borderLeft: 0,
          height: 'auto',
        },
      },
    },
  }
)
