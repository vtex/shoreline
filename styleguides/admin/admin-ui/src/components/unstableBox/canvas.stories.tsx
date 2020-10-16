import React from 'react'
import { Story, Meta } from '@storybook/react'

import { unstableBox as Box } from './index'
import { ThemeProviderNext } from '../../system-next'
import { baseTheme } from '../../themes-next'

export default {
  title: 'system-next/box',
} as Meta

export const Basic: Story = () => {
  return (
    <ThemeProviderNext theme={baseTheme}>
      <Box>Cool Box</Box>
    </ThemeProviderNext>
  )
}

export const Styles: Story = () => {
  return (
    <ThemeProviderNext theme={baseTheme}>
      <Box
        styles={{
          fontSize: 64,
        }}
      >
        Huge Text
      </Box>
    </ThemeProviderNext>
  )
}

export const ConsumeTheme: Story = () => {
  return (
    <ThemeProviderNext theme={baseTheme}>
      <Box
        styles={{
          fontSize: 64,
          bg: 'primary.base',
          color: 'primary.contrast',
          borderRadius: 4,
        }}
      >
        Primary Box
      </Box>
    </ThemeProviderNext>
  )
}

export const CustomTheme: Story = () => {
  return (
    <ThemeProviderNext
      theme={{
        ...baseTheme,
        box: {
          default: {
            bg: 'background',
            color: 'text',
            padding: 4,
            margin: 2,
          },
          inverted: {
            bg: 'text',
            color: 'background',
            padding: 4,
            margin: 2,
          },
        },
      }}
    >
      <Box
        styles={{
          variant: 'box.default',
        }}
      >
        Default Box
      </Box>
      <Box
        styles={{
          variant: 'box.inverted',
        }}
      >
        Inverted Box
      </Box>
    </ThemeProviderNext>
  )
}

export const StyleProps: Story = () => {
  return (
    <ThemeProviderNext theme={baseTheme}>
      <Box
        bg="primary.base"
        color="primary.contrast"
        borderRadius="3"
        styles={{
          variant: 'text.headline',
        }}
      >
        Primary Box
      </Box>
    </ThemeProviderNext>
  )
}

// export const FullUse: Story = () => {
//   const ref = useRef<HTMLInputElement>(null)
//   const handleFocus = () => {
//     if (ref.current) {
//       ref.current.focus()
//     }
//   }

//   return (
//     <ThemeProviderNext theme={theme}>
//       <Box
//         ref={ref}
//         borderRadius={4}
//         borderStyle="solid"
//         fontSize={18}
//         use={Input}
//         type="text"
//       />
//       <button onClick={handleFocus}>Focus</button>
//     </ThemeProviderNext>
//   )
// }

// export const Flexbox: Story = () => {
//   return (
//     <ThemeProviderNext theme={theme}>
//       <Box display="flex" width="100%" direction="column">
//         <Box width="20%" height={120} bg="primary" />
//         <Box width="20%" height={120} bg="secondary" />
//       </Box>
//     </ThemeProviderNext>
//   )
// }
