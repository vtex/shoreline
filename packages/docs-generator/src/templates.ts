import Handlebars from 'handlebars'
import { readFileSync } from 'fs'

type Template =
  | 'component.mdx'
  | 'meta.json'
  | 'componentMeta.json'
  | 'componentsIndex.mdx'

/**
 * Gets a documentation template from the templates folder
 *
 * @param template The template to get
 */
export function getTemplate(template: Template) {
  return Handlebars.compile(
    readFileSync(`./dist/esm/templates/${template}.hbs`, 'utf8')
  )
}
