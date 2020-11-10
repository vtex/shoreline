import React, { ReactNode } from 'react'
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

interface PaletteSet {
  title: string
  children: ReactNode
}

function PaletteSet({ title, children }: PaletteSet) {
  return (
    <Box>
      <Heading as="h2">{title}</Heading>
      <Set
        spacing={2}
        styleOverrides={{
          flexWrap: 'wrap',
          '> *': {
            marginTop: 2,
            marginLeft: 2,
          },
        }}
      >
        {children}
      </Set>
    </Box>
  )
}

function PaletteCard(props: CardProps) {
  const { color, name, ...restProps } = props

  return (
    <Box
      border="default"
      padding={1}
      paddingBottom={2}
      width={180}
      {...restProps}
    >
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
        <PaletteSet title="Default">
          <PaletteCard color="#323845" name="text.primary" />
          <PaletteCard color="#707685" name="text.secondary" />
          <PaletteCard color="#FFFFFF" name="background" />
          <PaletteCard color="#8DB6FA" name="focus" />
          <PaletteCard color="#F71963" name="brand" />
        </PaletteSet>

        <PaletteSet title="Muted">
          <PaletteCard color="#898F9E" name="muted.0" />
          <PaletteCard color="#C4C5CA" name="muted.1" />
          <PaletteCard color="#E0E2E7" name="muted.2" />
          <PaletteCard color="#F4F6FB" name="muted.3" />
        </PaletteSet>

        <PaletteSet title="Primary">
          <PaletteCard color="#2953B2" name="primary.base" />
          <PaletteCard color="#1E4397" name="primary.hover" />
          <PaletteCard color="#3F6FDB" name="primary.active" />
          <PaletteCard color="#FFFFFF" name="primary.accent" />
        </PaletteSet>

        <PaletteSet title="Secondary">
          <PaletteCard color="#DAE3F5" name="secondary.base" />
          <PaletteCard color="#C6CEE8" name="secondary.hover" />
          <PaletteCard color="#E2EAF8" name="secondary.active" />
          <PaletteCard color="#2953B2" name="secondary.accent" />
        </PaletteSet>

        <PaletteSet title="Feedback Danger">
          <PaletteCard color="#CB4242" name="danger.base" />
          <PaletteCard color="#860002" name="danger.hover" />
          <PaletteCard color="Missing Color" name="danger.active" />
          <PaletteCard color="#FFFFFF" name="danger.accent" />
          <PaletteCard color="#FEDADA" name="danger.washed.base" />
          <PaletteCard color="#EEC5C5" name="danger.washed.hover" />
          <PaletteCard color="#FEE3E3" name="danger.washed.active" />
          <PaletteCard color="#CB4242" name="danger.washed.accent" />
        </PaletteSet>

        <PaletteSet title="Feedback Success">
          <PaletteCard color="#368369" name="success.base" />
          <PaletteCard color="Missing Color" name="success.hover" />
          <PaletteCard color="Missing Color" name="success.active" />
          <PaletteCard color="#FFFFFF" name="success.accent" />
          <PaletteCard color="#CEE8DE" name="success.washed.base" />
          <PaletteCard color="#BAD4CB" name="success.washed.hover" />
          <PaletteCard color="Missing Color" name="success.washed.active" />
          <PaletteCard color="#368369" name="success.washed.accent" />
        </PaletteSet>

        <PaletteSet title="Feedback Warning">
          <PaletteCard color="#FFBA52" name="warning.base" />
          <PaletteCard color="Missing Color" name="warning.hover" />
          <PaletteCard color="Missing Color" name="warning.active" />
          <PaletteCard color="#FFFFFF" name="warning.accent" />
          <PaletteCard color="#F6E0BA" name="warning.washed.base" />
          <PaletteCard color="#E3CCA5" name="warning.washed.hover" />
          <PaletteCard color="Missing Color" name="warning.washed.active" />
          <PaletteCard color="#FFBA52" name="warning.washed.accent" />
        </PaletteSet>

        <PaletteSet title="Basic Colors">
          <PaletteCard color="#DAE3F5" name="basic.blue" />
          <PaletteCard color="#F4EFFF" name="basic.purple" />
          <PaletteCard color="#F6E0BA" name="basic.yellow" />
          <PaletteCard color="#CEE8DE" name="basic.green" />
          <PaletteCard color="#FEDADA" name="basic.red" />
          <PaletteCard color="#323845" name="basic.black" />
        </PaletteSet>
      </Set>
    </ThemeProvider>
  )
}
