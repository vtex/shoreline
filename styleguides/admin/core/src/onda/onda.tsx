import { createOnda } from './createOnda'
import { DOMElements, domElements } from './domElements'
import { As, OndaComponent } from './types'

export type InlineCreateOnda = {
  <T extends As>(target: T): OndaComponent<T, {}, {}>
}

export const onda = (createOnda as unknown) as InlineCreateOnda &
  HTMLAdminComponents

export type HTMLAdminComponents = {
  [Tag in DOMElements]: OndaComponent<Tag, {}, {}>
}

domElements.forEach((tag) => {
  ;(onda as any)[tag] = createOnda(tag)
})
