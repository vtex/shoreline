import { onda } from '@vtex/admin-core'

/**
 * Form label component.
 * It renders a label jsx element by default
 * @example

 * import { Label, LabelProps } from `@vtex/admin-ui`
 *
 * function UseCase() {
 *   return <Label>Your label here!</Label>
 * }
 */
export const Label = onda('label', {
  text: 'body',
})
