import { faker } from '@faker-js/faker'

export const ITEMS_PER_PAGE = 5

export const items = Array(ITEMS_PER_PAGE)
  .fill(1)
  .map((_, id) => {
    return {
      id: `${id}`,
      name: faker.commerce.productName(),
      brand: faker.company.buzzNoun(),
      price: faker.commerce.price(),
    }
  })
