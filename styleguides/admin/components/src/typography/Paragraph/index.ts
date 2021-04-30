import { createOnda } from '@vtex/admin-core'

/**
 * Typography element designed for paragraphs
 * It renders a `p` jsx element by default
 * @example

 * import { Paragraph } from `@vtex/admin-ui`
 *
 * function UseCase() {
 *   return <Paragraph>Your paragraph</Paragraph>
 * }
 */
export const Paragraph = createOnda('p', {
  text: 'body',
})
