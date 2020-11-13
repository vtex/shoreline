import React, { Fragment } from 'react'
import {
  Box,
  ThemeProvider,
  Set,
  BoxProps,
  useTheme,
  get,
} from '@vtex/admin-ui'

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
    <Box border="default" padding={1} width={164} {...restProps}>
      <Box
        styles={{
          backgroundColor: color,
          borderRadius: 'default',
          height: 72,
          width: 'full',
          boxShadow: 'subtle',
          marginBottom: 1,
        }}
      />

      <Box text="highlight">{name}</Box>
      <Box text="small" styles={{ color: 'text.secondary' }}>
        {color}
      </Box>
    </Box>
  )
}

export function BackgroundColors() {
  const theme = useTheme()

  const getColor = (color: string) => get(theme, `colors.${color}`)

  return (
    <Set spacing={2}>
      <PaletteCard color={getColor('background')} name="background" />
      <PaletteCard color={getColor('muted.0')} name="muted.0" />
      <PaletteCard color={getColor('muted.1')} name="muted.1" />
      <PaletteCard color={getColor('muted.2')} name="muted.2" />
      <PaletteCard color={getColor('muted.3')} name="muted.3" />
    </Set>
  )
}

export function TextColors() {
  const theme = useTheme()

  const getColor = (color: string) => get(theme, `colors.${color}`)

  return (
    <Set spacing={2}>
      <PaletteCard color={getColor('text.primary')} name="text.primary" />
      <PaletteCard color={getColor('text.secondary')} name="text.secondary" />
    </Set>
  )
}

export function PrimaryColors() {
  const theme = useTheme()

  const getColor = (color: string) => get(theme, `colors.${color}`)

  return (
    <Set spacing={2}>
      <PaletteCard color={getColor('primary.base')} name="primary.base" />
      <PaletteCard color={getColor('primary.hover')} name="primary.hover" />
      <PaletteCard color={getColor('primary.pressed')} name="primary.pressed" />
      <PaletteCard color={getColor('primary.accent')} name="primary.accent" />
    </Set>
  )
}

export function SecondaryColors() {
  const theme = useTheme()

  const getColor = (color: string) => get(theme, `colors.${color}`)

  return (
    <Set spacing={2}>
      <PaletteCard color={getColor('secondary.base')} name="secondary.base" />
      <PaletteCard color={getColor('secondary.hover')} name="secondary.hover" />
      <PaletteCard
        color={getColor('secondary.pressed')}
        name="secondary.pressed"
      />
      <PaletteCard
        color={getColor('secondary.accent')}
        name="secondary.accent"
      />
    </Set>
  )
}

export function SemanticColor(props: { color: string }) {
  const { color } = props

  const theme = useTheme()

  const getColor = (c: string) => get(theme, `colors.${c}`)

  return (
    <Set spacing={2}>
      <PaletteCard color={getColor(`${color}.base`)} name={`${color}.base`} />
      <PaletteCard color={getColor(`${color}.hover`)} name={`${color}.hover`} />
      <PaletteCard
        color={getColor(`${color}.pressed`)}
        name={`${color}.pressed`}
      />
      <PaletteCard
        color={getColor(`${color}.accent`)}
        name={`${color}.accent`}
      />
    </Set>
  )
}

export default function PaletteBlock(props: SetProps) {
  const theme = useTheme()

  const getColor = (color: string) => get(theme, `colors.${color}`)

  return (
    <ThemeProvider>
      <Set
        orientation="vertical"
        spacing={6}
        {...props}
        styleOverrides={{ marginTop: 6 }}
      >
        <Box>
          <Heading element="h2">Complementary</Heading>
          <Set spacing={2}>
            <PaletteCard color={getColor('focus')} name="focus" />
            <PaletteCard color={getColor('brand')} name="brand" />
          </Set>
        </Box>
        {['danger', 'success', 'warning'].map((color) => (
          <Fragment key={color}>
            <Box>
              <Heading
                element="h2"
                styleOverrides={{ textTransform: 'capitalize' }}
              >
                {color}
              </Heading>
              <Set spacing={2}>
                <PaletteCard
                  color={getColor(`${color}.base`)}
                  name={`${color}.base`}
                />
                <PaletteCard
                  color={getColor(`${color}.hover`)}
                  name={`${color}.hover`}
                />
                <PaletteCard
                  color={getColor(`${color}.pressed`)}
                  name={`${color}.pressed`}
                />
                <PaletteCard
                  color={getColor(`${color}.accent`)}
                  name={`${color}.accent`}
                />
              </Set>
            </Box>
            <Box>
              <Heading
                element="h2"
                styleOverrides={{ textTransform: 'capitalize' }}
              >
                {color} Washed
              </Heading>
              <Set spacing={2}>
                <PaletteCard
                  color={getColor(`${color}.washed.base`)}
                  name={`${color}.washed.base`}
                />
                <PaletteCard
                  color={getColor(`${color}.washed.hover`)}
                  name={`${color}.washed.hover`}
                />
                <PaletteCard
                  color={getColor(`${color}.washed.pressed`)}
                  name={`${color}.washed.pressed`}
                />
                <PaletteCard
                  color={getColor(`${color}.washed.accent`)}
                  name={`${color}.washed.accent`}
                />
              </Set>
            </Box>
          </Fragment>
        ))}
        <Box>
          <Heading element="h2">Basic</Heading>
          <Set
            spacing={2}
            styleOverrides={{
              flexWrap: 'wrap',
            }}
          >
            <PaletteCard color="#DAE3F5" name="blue" />
            <PaletteCard color="#F4EFFF" name="purple" />
            <PaletteCard color="#FDE6C0" name="yellow" />
            <PaletteCard color="#D6EFE5" name="green" />
            <PaletteCard color="#FEE3E3" name="red" />
            <PaletteCard color={getColor('text.primary')} name="black" />
          </Set>
        </Box>
      </Set>
    </ThemeProvider>
  )
}
