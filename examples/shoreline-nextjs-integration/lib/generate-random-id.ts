import { ITEMS_PER_PAGE } from '../pages'

export const generateRandomId = () => {
  return Math.floor(Math.random() * ITEMS_PER_PAGE)
}
