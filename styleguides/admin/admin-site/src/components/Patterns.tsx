import React from 'react'
import {
  CollapsibleGroup,
  ThemeProvider,
  Collapsible,
  useCollapsible,
  Box,
} from '@vtex/admin-ui'

export function Pattern({ header, children }: any) {
  const collapsible = useCollapsible({ visible: false })

  return (
    <Collapsible state={collapsible}>
      <Collapsible.Header label={header} />
      <Collapsible.Content>
        <Box styles={{ bg: 'muted.3' }} padding={2}>
          {children}
        </Box>
      </Collapsible.Content>
    </Collapsible>
  )
}

export function PatternsBlock({ children }: any) {
  return (
    <ThemeProvider>
      <CollapsibleGroup>{children}</CollapsibleGroup>
    </ThemeProvider>
  )
}
