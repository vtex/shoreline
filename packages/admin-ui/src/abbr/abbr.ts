import { createComponent, useElement } from '@vtex/admin-ui-react'
import * as style from './abbr.style'

/**
 * Abbreviation component
 * @example
 * <Abbr title="Long Version">lv</Abbr>
 */
export const Abbr = createComponent<'abbr'>((props) => {
  return useElement('abbr', {
    baseStyle: style.base,
    ...props,
  })
})
