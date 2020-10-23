import * as React from 'react'
import { Provider as ReakitProvider } from 'reakit'
import { mergeSystem } from 'reakit-system'
import * as bootstrapSystem from 'reakit-system-bootstrap'
import * as playgroundSystem from 'reakit-playground/system'
import { unstableThemeProvider as ThemeProvider, theme } from '@vtex/admin-ui'

const system = mergeSystem(playgroundSystem, {
  palette: {
    ...bootstrapSystem.palette,
    primary: '#6a50ee',
    link: '#006DFF',
    secondary: '#504984',
  },
})

function Provider(props: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme as any}>
      <ReakitProvider unstable_system={system}>{props.children}</ReakitProvider>
    </ThemeProvider>
  )
}

export default Provider
