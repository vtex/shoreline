import { jsx } from '@vtex/admin-ui-react'

/**
 * Abbreviation component
 * @example
 * <Abbr title="Long Version">lv</Abbr>
 */
export const Abbr = jsx('abbr')({
  textDecoration: 'none',
  text: '$body',
})
