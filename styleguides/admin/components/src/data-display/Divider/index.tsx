import { Separator } from 'reakit'
import { createOnda } from '@vtex/admin-core'

/**
 * Dividers are used to visually separate content.
 * It renders a hr div element by default
 * @example
 * import { Divider } from `@vtex/admin-ui`
 *
 * function UseCase() {
 *   return <div> content <Divider /> content </div>
 * }
 */
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
