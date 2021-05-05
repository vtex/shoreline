import { createComponent } from './createComponent'
import { DOMElements, domElements } from './domElements'
import { As, OndaComponent } from './types'

export type InlineCreateComponent = {
  <T extends As>(target: T): OndaComponent<T, {}, {}>
}

export const onda = (createComponent as unknown) as InlineCreateComponent &
  HTMLAdminComponents

export type HTMLAdminComponents = {
  [Tag in DOMElements]: OndaComponent<Tag, {}, {}>
}

domElements.forEach((tag) => {
  ;(onda as any)[tag] = createComponent(tag)
})
