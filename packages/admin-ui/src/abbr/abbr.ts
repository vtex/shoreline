import { createComponent, useElement } from '@vtex/admin-ui-react'

/**
 * Abbreviation component
 * @example
 * <Abbr title="Long Version">lv</Abbr>
 */
export const Abbr = createComponent<'abbr'>((props) => {
  return useElement('abbr', {
    baseStyle: {
      textDecoration: 'none',
      text: '$body',
    },
    ...props,
  })
})
