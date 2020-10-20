/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import { darken } from '@theme-ui/color'
import { Story, Meta } from '@storybook/react'

import { unstableThemeProvider as ThemeProvider } from '../unstableThemeProvider'
import { unstableButton as Button } from './index'
import { IconAppStore } from '../../icons'

export default {
  title: 'system-next/button',
} as Meta

export const Styles: Story = () => {
  return (
    <ThemeProvider>
      <Button
        styles={{
          bg: 'text',
          ':hover': {
            bg: darken('text', 0.05),
          },
          ':active': {
            bg: darken('text', 0.1),
          },
        }}
      >
        Trust Button
      </Button>
    </ThemeProvider>
  )
}

export const Palette: Story = () => {
  return (
    <ThemeProvider>
      <div sx={{ 'button + button': { marginLeft: 4 } }}>
        <Button sx={{ bg: 'black' }}>Primary Button</Button>
        <Button palette="danger">Danger Button</Button>
      </div>
    </ThemeProvider>
  )
}

export const Size: Story = () => {
  return (
    <ThemeProvider>
      <div sx={{ 'button + button': { marginLeft: 4 } }}>
        <Button>Regular Button</Button>
        <Button size="small">Small</Button>
      </div>
    </ThemeProvider>
  )
}

export const Variant: Story = () => {
  return (
    <ThemeProvider>
      <div sx={{ 'button + button': { marginLeft: 4 } }}>
        <Button variant="filled">Filled Button</Button>
        <Button variant="subtle">Subtle Button</Button>
        <Button variant="text">Text Button</Button>
      </div>
    </ThemeProvider>
  )
}

export const WithIcon: Story = () => {
  return (
    <ThemeProvider>
      <div sx={{ 'button + button': { marginLeft: 4 } }}>
        <Button icon={<IconAppStore />} variant="filled">
          Icon Start
        </Button>
        <Button icon={<IconAppStore />} iconPosition="end" variant="subtle">
          IconEnd
        </Button>
        <Button icon={<IconAppStore title="Icon only" />} variant="text" />
      </div>
    </ThemeProvider>
  )
}

// export const Sx: Story = () => {
//   return (
//     <ThemeProvider >
//       <Box
//         sx={{
//           fontSize: 64,
//         }}
//       >
//         Huge Text
//       </Box>
//     </ThemeProvider>
//   )
// }

// export const ConsumeTheme: Story = () => {
//   return (
//     <ThemeProvider >
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
//     </ThemeProvider>
//   )
// }

// export const CustomTheme: Story = () => {
//   return (
//     <ThemeProvider
//       theme={{
//         ...unstableTheme,
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
//     </ThemeProvider>
//   )
// }

// export const StyleProps: Story = () => {
//   return (
//     <ThemeProvider >
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
//     </ThemeProvider>
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
//     <ThemeProvider >
//       <Box ref={ref} borderRadius="3" borderStyle="solid" element="section" />
//       <button onClick={handleFocus}>Focus</button>
//     </ThemeProvider>
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
//     <ThemeProvider theme={theme}>
//       <Box
//         ref={ref}
//         borderRadius={4}
//         borderStyle="solid"
//         fontSize={18}
//         use={Input}
//         type="text"
//       />
//       <button onClick={handleFocus}>Focus</button>
//     </ThemeProvider>
//   )
// }

// export const Flexbox: Story = () => {
//   return (
//     <ThemeProvider theme={theme}>
//       <Box display="flex" width="100%" direction="column">
//         <Box width="20%" height={120} bg="primary" />
//         <Box width="20%" height={120} bg="secondary" />
//       </Box>
//     </ThemeProvider>
//   )
// }
