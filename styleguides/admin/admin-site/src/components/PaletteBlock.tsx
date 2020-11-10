import React from 'react'
import { Box, ThemeProvider, Set, BoxProps } from '@vtex/admin-ui'

import Heading from './Heading'

interface CardProps extends BoxProps {
  /** Color Value */
  color?: string
  /** Semantic color name */
  name?: string
}

interface SetProps {
  /** Spacing between palettes */
  spacing?: number
}

function PaletteCard(props: CardProps) {
  const { color, name, ...restProps } = props

  return (
    <Box border="default" padding={1} width={150} {...restProps}>
      <Box
        styles={{
          backgroundColor: color,
          borderRadius: 'default',
          height: 64,
          width: 'full',
          boxShadow: 'subtle',
          marginBottom: 1,
        }}
      />

      <Box text="highlight">{name}</Box>
      <Box text="small" styles={{ color: 'muted.0' }}>
        {color}
      </Box>
    </Box>
  )
}

export default function PaletteBlock(props: SetProps) {
  return (
    <ThemeProvider>
      <Set
        orientation="vertical"
        spacing={6}
        {...props}
        styleOverrides={{ marginTop: 6 }}
      >
        <Box>
          <Heading as="h2">Default</Heading>
          <Set spacing={2}>
            <PaletteCard color="#323845" name="text" />
            <PaletteCard color="#FFFFFF" name="background" />
            <PaletteCard color="#8DB6FA" name="focus" />
            <PaletteCard color="#F71963" name="emphasis" />
          </Set>
        </Box>
        <Box>
          <Heading as="h2">Muted</Heading>
          <Set spacing={2}>
            <PaletteCard color="#707685" name="muted.0" />
            <PaletteCard color="#898F9E" name="muted.1" />
            <PaletteCard color="#C4C5CA" name="muted.2" />
            <PaletteCard color="#E0E2E7" name="muted.3" />
            <PaletteCard color="#F4F6FB" name="muted.4" />
          </Set>
        </Box>
        <Box>
          <Heading as="h2">Primary</Heading>
          <Set spacing={2}>
            <PaletteCard color="#2953B2" name="primary.base" />
            <PaletteCard color="#1E4397" name="primary.hover" />
            <PaletteCard color="#3F6FDB" name="primary.active" />
            <PaletteCard color="#FFFFFF" name="primary.contrast" />
            <PaletteCard color="#F4F8FE" name="primary.washed.0" />
            <PaletteCard color="#E8F1FF" name="primary.washed.1" />
            <PaletteCard color="#DBE9FF" name="primary.washed.2" />
          </Set>
        </Box>
        <Box>
          <Heading as="h2">Danger</Heading>
          <Set spacing={2}>
            <PaletteCard color="#D23030" name="danger.base" />
            <PaletteCard color="#A70C0C" name="danger.hover" />
            <PaletteCard color="#DE0404" name="danger.active" />
            <PaletteCard color="#FFFFFF" name="danger.contrast" />
            <PaletteCard color="#FFF0F0" name="danger.washed.0" />
            <PaletteCard color="#FFE3E3" name="danger.washed.1" />
            <PaletteCard color="#FFD0D0" name="danger.washed.2" />
          </Set>
        </Box>
        <Box>
          <Heading as="h2">Success</Heading>
          <Set spacing={2}>
            <PaletteCard color="#368369" name="success.base" />
            <PaletteCard color="#005C31" name="success.hover" />
            <PaletteCard color="#26AE6E" name="success.active" />
            <PaletteCard color="#FFFFFF" name="success.contrast" />
            <PaletteCard color="#D6EFE5" name="success.washed.0" />
          </Set>
        </Box>
        <Box>
          <Heading as="h2">Warning</Heading>
          <Set spacing={2}>
            <PaletteCard color="#FFBA52" name="warning.base" />
            <PaletteCard color="#E6A30A" name="warning.hover" />
            <PaletteCard color="#EFA906" name="warning.active" />
            <PaletteCard color="#FFFFFF" name="warning.contrast" />
            <PaletteCard color="#FDE6C0" name="warning.washed.0" />
          </Set>
        </Box>
        <Box>
          <Heading as="h2">Basic</Heading>
          <Set spacing={2}>
            <PaletteCard color="#DAE3F5" name="blue" />
            <PaletteCard color="#F4EFFF" name="purple" />
            <PaletteCard color="#FDE6C0" name="yellow" />
            <PaletteCard color="#D6EFE5" name="green" />
            <PaletteCard color="#FEE3E3" name="red" />
            <PaletteCard color="#323845" name="black" />
          </Set>
        </Box>
      </Set>
    </ThemeProvider>
  )
}
