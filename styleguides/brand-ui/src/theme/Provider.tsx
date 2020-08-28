import React, { ReactNode, memo } from 'react'
import { ThemeProvider as BaseProvider } from '@vtex-components/theme'

import { theme } from './theme'

interface Props {
  children: ReactNode
}

function ThemeProvider({ children }: Props) {
  return <BaseProvider theme={theme}>{children}</BaseProvider>
}

export default memo(ThemeProvider)
