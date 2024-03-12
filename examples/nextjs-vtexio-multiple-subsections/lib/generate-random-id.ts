import { ITEMS_PER_PAGE } from './items'

export const generateRandomId = () => {
  return Math.floor(Math.random() * ITEMS_PER_PAGE)
}
