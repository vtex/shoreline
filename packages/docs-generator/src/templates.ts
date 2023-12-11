import Handlebars from 'handlebars'
import { readFileSync } from 'fs'
import path from 'path'

type Template = 'component.mdx' | '_meta.json'

/**
 * Gets a documentation template from the templates folder
 *
 * @param template The template to get
 */
export function getTemplate(template: Template) {
  return Handlebars.compile(
    readFileSync(path.join(__dirname, `./templates/${template}.hbs`), 'utf8')
  )
}
