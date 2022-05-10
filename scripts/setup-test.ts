import '@testing-library/jest-dom/extend-expect'
import serializer, { matchers } from 'jest-emotion'
import { toHaveNoViolations } from 'jest-axe'

expect.addSnapshotSerializer(serializer)
expect.extend(matchers)
expect.extend(toHaveNoViolations)

beforeAll(() => {
  const { getComputedStyle } = window

  window.getComputedStyle = (elt) => getComputedStyle(elt)
})
