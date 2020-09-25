import React, { ReactNode, memo } from 'react'
import { ThemeProvider as BaseProvider } from '@vtex-components/theme'
import 'focus-visible/dist/focus-visible'

import { theme } from './config'
import Fonts from './Fonts'

interface Props {
  children: ReactNode
}

function ThemeProvider({ children }: Props) {
  return (
    <BaseProvider theme={theme}>
      <Fonts />
      {children}
    </BaseProvider>
  )
}

export default memo(ThemeProvider)
