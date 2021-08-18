import type { Theme } from '@vtex/admin-ui-system'

import { vars } from './vars'
import components from './components'

const makeTheme = (theme: any): Theme => theme as unknown as Theme

export const theme = makeTheme({
  ...vars,
  components,
})
