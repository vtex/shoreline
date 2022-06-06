import type { Ref } from 'react'
import React from 'react'
import type { Story, Meta } from '@storybook/react'
import type { IconProps } from '@vtex/phosphor-icons'
import { IconCopy } from '@vtex/phosphor-icons'
import { tag } from '@vtex/admin-ui-react'

import type { TooltipProps } from '../index'
import { Tooltip } from '../index'

import { Button } from '../../../button'
import { Tag } from '../../../tag'
import { Text } from '../../Text'
import { Stack } from '../../../stack'

export default {
  title: 'admin-ui/Tooltip',
  component: Tooltip,
} as Meta

export const Playground: Story<TooltipProps> = (args) => {
  return (
    <Tooltip {...args}>
      <Button icon={<IconCopy />} variant="tertiary" />
    </Tooltip>
  )
}

Playground.args = {
  label: 'Tooltip Label!',
}

export const ReactNodeLabel = () => {
  return (
    <Tooltip
      visible
      placement="right"
      label={
        <Stack>
          <Text variant="detail" tone="secondary">
            Previous Order: 102183 (211-213)
          </Text>
          <Tag palette="green" label="Ready for Handling" />
          <Text variant="detail">João da Silva</Text>
          <Text variant="detail">49,00 BRL</Text>
        </Stack>
      }
    >
      <Button icon={<IconCopy />} variant="tertiary" />
    </Tooltip>
  )
}

export const CustomComponent = () => {
  const CustomIcon = React.forwardRef(function Custom(
    props: IconProps,
    ref: Ref<SVGSVGElement>
  ) {
    const { viewBox = '0 0 12 12', width = 24, height = 24 } = props

    return (
      <tag.svg
        ref={ref}
        width={width}
        height={height}
        viewBox={viewBox}
        fill="none"
      >
        <circle cx="6" cy="6" r="6" fill="#D7DADF" />
        <path
          d="M6.00016 6.90246V6.72246C6.00016 6.13221 6.36466 5.81271 6.73066 5.56746C7.08766 5.32746 7.44541 5.01396 7.44541 4.43571C7.44541 3.63771 6.79891 2.99121 6.00091 2.99121C5.20291 2.99121 4.55566 3.63621 4.55566 4.43421"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.99925 8.93981C5.92725 8.93981 5.86875 8.99831 5.8695 9.07031C5.8695 9.14231 5.928 9.20081 6 9.20081C6.072 9.20081 6.1305 9.14231 6.1305 9.07031C6.1305 8.99756 6.072 8.93981 5.99925 8.93981"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </tag.svg>
    )
  })

  return (
    <Tooltip label="My Custom icon">
      <CustomIcon />
    </Tooltip>
  )
}
