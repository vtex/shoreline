import { createOnda } from '@vtex/admin-core'

/**
 * Typography element designed for titles
 * It renders a `h1` jsx element by default
 * @example

 * import { Heading } from `@vtex/admin-ui`
 *
 * function UseCase() {
 *   return <Heading>Your heading</Heading>
 * }
 */
export const Heading = createOnda('h1', {
  text: 'headline',
})
