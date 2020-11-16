import React from 'react'
import { Set, Columns, Heading, ThemeProvider } from '@vtex/admin-ui'

interface Props {
  value: string
  themeKey: string
}

function PropRow({ value, themeKey }: Props) {
  return (
    <Columns
      spacing={3}
      styleOverrides={{
        color: 'text.primary',
        paddingY: 2,
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: 'muted.1',
      }}
    >
      <Columns.Item styleOverrides={{ paddingLeft: 6 }}>{value}</Columns.Item>
      <Columns.Item styleOverrides={{ paddingLeft: 6 }}>
        {themeKey}
      </Columns.Item>
    </Columns>
  )
}

function TitleColumn() {
  return (
    <Columns
      spacing={3}
      styleOverrides={{
        paddingY: 4,
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: 'muted.1',
      }}
    >
      <Columns.Item styleOverrides={{ paddingLeft: 6 }}>
        <Heading text="headline">Property</Heading>
      </Columns.Item>
      <Columns.Item styleOverrides={{ paddingLeft: 6 }}>
        <Heading text="headline">Theme Key</Heading>
      </Columns.Item>
    </Columns>
  )
}

export default function ThemeAwareProps() {
  return (
    <ThemeProvider>
      <Set
        orientation="vertical"
        styleOverrides={{ bg: 'background', color: 'primary.base' }}
        fluid
      >
        <TitleColumn />
        <PropRow value="fontSize" themeKey="fontSizes" />
        <PropRow value="lineHeight" themeKey="lineHeights" />
        <PropRow value="color" themeKey="colors" />
        <PropRow value="backgroundColor, bg" themeKey="colors" />
        <PropRow value="margin" themeKey="space" />
        <PropRow value="marginX" themeKey="space" />
        <PropRow value="marginY" themeKey="space" />
        <PropRow value="marginLeft" themeKey="space" />
        <PropRow value="marginRight" themeKey="space" />
        <PropRow value="marginBottom" themeKey="space" />
        <PropRow value="marginTop" themeKey="space" />
        <PropRow value="paddingX" themeKey="space" />
        <PropRow value="paddingY" themeKey="space" />
        <PropRow value="paddingLeft" themeKey="space" />
        <PropRow value="paddingRight" themeKey="space" />
        <PropRow value="paddingBottom" themeKey="space" />
        <PropRow value="paddingTop" themeKey="space" />
        <PropRow value="top" themeKey="space" />
        <PropRow value="bottom" themeKey="space" />
        <PropRow value="left" themeKey="space" />
        <PropRow value="right" themeKey="space" />
        <PropRow value="borderColor" themeKey="colors" />
        <PropRow value="borderRadius" themeKey="borderRadius" />
        <PropRow value="boxShadow" themeKey="shadows" />
        <PropRow value="textShadow" themeKey="shadows" />
        <PropRow value="zIndex" themeKey="zIndexes" />
        <PropRow value="width" themeKey="sizes" />
        <PropRow value="minWidth" themeKey="sizes" />
        <PropRow value="maxWidth" themeKey="sizes" />
        <PropRow value="height" themeKey="sizes" />
        <PropRow value="minHeight" themeKey="sizes" />
        <PropRow value="maxHeight" themeKey="sizes" />
        <PropRow value="size" themeKey="sizes" />
        <PropRow value="transition" themeKey="transition" />
        <PropRow
          value="fontVariationSettings"
          themeKey="fontVariationSettings"
        />
      </Set>
    </ThemeProvider>
  )
}
