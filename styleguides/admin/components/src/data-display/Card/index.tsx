import { createOnda } from '@vtex/admin-core'

/**
 * Cards are surfaces that display content and actions on a single topic.
 * It renders a label div element by default
 * @example

 * import { Card } from `@vtex/admin-ui`
 *
 * function UseCase() {
 *   return <Card>Content here!</Card>
 * }
 */
export const Card = createOnda('div', {
  bg: 'light.primary',
  color: 'dark.primary',
  border: 'default',
  padding: 6,
})
