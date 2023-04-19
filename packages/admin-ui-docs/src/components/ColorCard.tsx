import React from 'react'
import { csx, Text, Flex, color as getColor, FlexSpacer } from '@vtex/admin-ui'

export function ColorCard(props: ColorCardProps) {
  const { color, name } = props

  const colorValue = getColor(color as any)

  return (
    <Flex
      direction="column"
      className={csx({
        maxWidth: 250,
        border: '$neutral',
        borderRadius: '8px',
        boxShadow: 'block',
        bg: '$primary',
        transition: 'all .2s ease-in-out',
        ':hover': {
          transform: 'scale(1.05)',
        },
      })}
    >
      <div
        className={csx({
          bg: colorValue,
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          height: 80,
        })}
      />

      <Flex
        direction="column"
        className={csx({
          padding: '$space-4',
          justifyContent: 'space-around',
        })}
      >
        <CardLabel title="Name" value={name} />
        <CardLabel title="HEX" value={colorValue} />
      </Flex>
    </Flex>
  )
}

function CardLabel(props: CardLabel) {
  const { title, value } = props

  return (
    <Flex className={csx({ width: '100%' })}>
      <Text
        className={csx({
          display: 'block',
          fontSettings: 'medium',
        })}
      >
        {title}
      </Text>
      <FlexSpacer />
      <Text
        className={csx({
          display: 'block',
        })}
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
