import React from 'react'
import { Story, Meta } from '@storybook/react'

import { unstableBox as Box } from './index'
import { unstableThemeProvider as ThemeProvider } from '../../unstableSystem'
import { unstableTheme } from '../../unstableTheme'

export default {
  title: 'system-next/box',
} as Meta

export const Basic: Story = () => {
  return (
    <ThemeProvider theme={unstableTheme}>
      <Box>Cool Box</Box>
    </ThemeProvider>
  )
}

export const Styles: Story = () => {
  return (
    <ThemeProvider theme={unstableTheme}>
      <Box
        styles={{
          fontSize: 64,
        }}
      >
        Huge Text
      </Box>
    </ThemeProvider>
  )
}

export const ConsumeTheme: Story = () => {
  return (
    <ThemeProvider theme={unstableTheme}>
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
    </ThemeProvider>
  )
}

export const Surfaces: Story = () => {
  return (
    <ThemeProvider
      theme={{
        ...unstableTheme,
      }}
    >
      <Box surface="default" border="default">
        Default Box
      </Box>
      <Box surface="inverted">Inverted Box</Box>
      <Box surface="primary">Primary Box</Box>
    </ThemeProvider>
  )
}

export const Texts: Story = () => {
  return (
    <ThemeProvider theme={unstableTheme}>
      <Box text="headline">Headline</Box>
      <Box text="subtitle">Subtitle</Box>
      <Box text="action">Box with actions text</Box>
      <Box text="highlight">Highlight text</Box>
      <Box text="body">Box with body text</Box>
      <Box text="small">Box with small text</Box>
    </ThemeProvider>
  )
}

export const CustomTheme: Story = () => {
  return (
    <ThemeProvider
      theme={{
        ...unstableTheme,
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
    </ThemeProvider>
  )
}

// export const StyleProps: Story = () => {
//   return (
//     <ThemeProviderNext theme={unstableTheme}>
//       <Box
//         bg="primary.base"
//         color="primary.contrast"
//         borderRadius="3"
//         styles={{
//           variant: 'text.headline',
//         }}
//       >
//         Primary Box
//       </Box>
//     </ThemeProviderNext>
//   )
// }

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
