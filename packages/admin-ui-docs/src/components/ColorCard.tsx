import React from 'react'
import { tag, Text, Flex, color as getColor, FlexSpacer } from '@vtex/admin-ui'
import { hexToHsla, hslaToHexA } from './utils'

export function ColorCard(props: ColorCardProps) {
  const { color, name } = props

  const colorValue = getColor(color as any)

  return (
    <Flex
      direction="column"
      csx={{
        maxWidth: 250,
        border: '$neutral',
        borderRadius: '8px',
        boxShadow: 'block',
        bg: '$primary',
        transition: 'all .2s ease-in-out',
        ':hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <tag.div
        csx={{
          bg: colorValue,
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          height: 80,
        }}
      />

      <Flex
        direction="column"
        csx={{
          padding: 4,
          justifyContent: 'space-around',
        }}
      >
        <CardLabel title="Name" value={name} />
        <CardLabel
          title="HSLA"
          value={
            isHex(colorValue) ? hexToHsla(colorValue) : hslaToString(colorValue)
          }
        />
        <CardLabel
          title="HEX"
          value={isHex(colorValue) ? colorValue : hslaToHexA(colorValue)}
        />
      </Flex>
    </Flex>
  )
}

function CardLabel(props: CardLabel) {
  const { title, value } = props

  return (
    <Flex csx={{ width: '100%' }}>
      <Text
        csx={{
          display: 'block',
          fontSettings: 'medium',
        }}
      >
        {title}
      </Text>
      <FlexSpacer />
      <Text
        csx={{
          display: 'block',
        }}
      >
        {value}
      </Text>
    </Flex>
  )
}

interface CardLabel {
  title: string
  value: string
}
interface ColorCardProps {
  /** Color Value */
  color: string
  /** Semantic color name */
  name: string
}

function hslaToString(hsla: string) {
  return hsla.replace(/hsla|hsl|\(|\)/g, '')
}

function isHex(color: string) {
  return color?.includes('#')
}
