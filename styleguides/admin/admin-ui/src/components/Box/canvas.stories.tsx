import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Box } from './index'

export default {
  title: 'system-next/box',
} as Meta

export const Basic: Story = () => {
  return <Box>Cool Box</Box>
}

export const Styles: Story = () => {
  return (
    <Box
      styles={{
        fontSize: 64,
      }}
    >
      Huge Text
    </Box>
  )
}

export const ConsumeTheme: Story = () => {
  return (
    <Box
      styles={{
        fontSize: 64,
        bg: 'primary.base',
        color: 'primary.accent',
        borderRadius: 4,
      }}
    >
      Primary Box
    </Box>
  )
}

export const Surfaces: Story = () => {
  return (
    <>
      <Box palette="base" border="default">
        Default Box
      </Box>
      <Box palette="inverted">Inverted Box</Box>
      <Box palette="primary">Primary Box</Box>
    </>
  )
}

export const Texts: Story = () => {
  return (
    <>
      <Box text="headline">Headline</Box>
      <Box text="subtitle">Subtitle</Box>
      <Box text="action">Box with actions text</Box>
      <Box text="highlight">Highlight text</Box>
      <Box text="body">Box with body text</Box>
      <Box text="small">Box with small text</Box>
    </>
  )
}

export const Divider: Story = () => {
  return (
    <>
      <Box text="headline" border="divider-bottom" width={100}>
        Headline
      </Box>
      <Box text="subtitle">Subtitle</Box>
      <Box text="action">Box with actions text</Box>
      <Box text="highlight">Highlight text</Box>
      <Box text="body">Box with body text</Box>
      <Box text="small">Box with small text</Box>
    </>
  )
}

// export const CustomTheme: Story = () => {
//   return (
//     <ThemeProvider
//       theme={{
//         ...unstableTheme,
//         box: {
//           default: {
//             bg: 'background',
//             color: 'text.primary',
//             padding: 4,
//             margin: 2,
//           },
//           inverted: {
//             bg: 'text.primary',
//             color: 'background',
//             padding: 4,
//             margin: 2,
//           },
//         },
//       }}
//     >
//       <Box
//         styles={{
//           variant: 'box.default',
//         }}
//       >
//         Default Box
//       </Box>
//       <Box
//         styles={{
//           variant: 'box.inverted',
//         }}
//       >
//         Inverted Box
//       </Box>
//     </ThemeProvider>
//   )
// }

// export const StyleProps: Story = () => {
//   return (
//     <ThemeProviderNext >
//       <Box
//         bg="primary.base"
//         color="primary.accent"
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
