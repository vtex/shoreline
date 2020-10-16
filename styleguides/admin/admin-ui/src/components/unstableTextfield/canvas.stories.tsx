import React, { useRef } from 'react'
import { Story, Meta } from '@storybook/react'

import { unstableTextField as TextField } from './index'
import { ThemeProviderNext } from '../../system-next'
import { baseTheme } from '../../themes-next'

export default {
  title: 'system-next/text-field',
} as Meta

export const Field: Story = () => {
  return (
    <ThemeProviderNext theme={baseTheme}>
      <TextField id="username" label="Username" />
    </ThemeProviderNext>
  )
}

export const Ref: Story = () => {
  const ref = useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    if (ref.current) {
      ref.current.focus()
    }
  }

  return (
    <ThemeProviderNext theme={baseTheme}>
      <TextField ref={ref} id="with-ref" label="With Ref" />
      <button onClick={handleFocus}>Focus</button>
    </ThemeProviderNext>
  )
}

// export const Sx: Story = () => {
//   return (
//     <ThemeProviderNext theme={baseTheme}>
//       <Box
//         sx={{
//           fontSize: 64,
//         }}
//       >
//         Huge Text
//       </Box>
//     </ThemeProviderNext>
//   )
// }

// export const ConsumeTheme: Story = () => {
//   return (
//     <ThemeProviderNext theme={baseTheme}>
//       <Box
//         sx={{
//           fontSize: 64,
//           bg: 'primary.base',
//           color: 'primary.contrast',
//           borderRadius: 4,
//         }}
//       >
//         Primary Box
//       </Box>
//     </ThemeProviderNext>
//   )
// }

// export const CustomTheme: Story = () => {
//   return (
//     <ThemeProviderNext
//       theme={{
//         ...baseTheme,
//         box: {
//           default: {
//             bg: 'background',
//             color: 'text',
//             padding: 4,
//             margin: 2,
//           },
//           inverted: {
//             bg: 'text',
//             color: 'background',
//             padding: 4,
//             margin: 2,
//           },
//         },
//       }}
//     >
//       <Box
//         sx={{
//           variant: 'box.default',
//         }}
//       >
//         Default Box
//       </Box>
//       <Box
//         sx={{
//           variant: 'box.inverted',
//         }}
//       >
//         Inverted Box
//       </Box>
//     </ThemeProviderNext>
//   )
// }

// export const StyleProps: Story = () => {
//   return (
//     <ThemeProviderNext theme={baseTheme}>
//       <Box
//         bg="primary.base"
//         color="primary.contrast"
//         borderRadius="3"
//         sx={{
//           variant: 'text.headline',
//         }}
//       >
//         Primary Box
//       </Box>
//     </ThemeProviderNext>
//   )
// }

// export const Ref: Story = () => {
//   const ref = useRef<HTMLInputElement>(null)
//   const handleFocus = () => {
//     if (ref.current) {
//       ref.current.focus()
//     }
//   }

//   return (
//     <ThemeProviderNext theme={baseTheme}>
//       <Box ref={ref} borderRadius="3" borderStyle="solid" element="section" />
//       <button onClick={handleFocus}>Focus</button>
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
