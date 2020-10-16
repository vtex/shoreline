/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import { darken } from '@theme-ui/color'
import { Story, Meta } from '@storybook/react'

import { unstableButton as Button } from './index'
import { ThemeProviderNext } from '../../system-next'
import { baseTheme } from '../../themes-next'
import { IconAppStore } from '../../icons'

export default {
  title: 'system-next/button',
} as Meta

export const Styles: Story = () => {
  return (
    <ThemeProviderNext theme={baseTheme}>
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
    </ThemeProviderNext>
  )
}

export const Palette: Story = () => {
  return (
    <ThemeProviderNext theme={baseTheme}>
      <div sx={{ 'button + button': { marginLeft: 4 } }}>
        <Button>Primary Button</Button>
        <Button palette="danger">Danger Button</Button>
      </div>
    </ThemeProviderNext>
  )
}

export const Size: Story = () => {
  return (
    <ThemeProviderNext theme={baseTheme}>
      <div sx={{ 'button + button': { marginLeft: 4 } }}>
        <Button>Regular Button</Button>
        <Button size="small">Small</Button>
      </div>
    </ThemeProviderNext>
  )
}

export const Variant: Story = () => {
  return (
    <ThemeProviderNext theme={baseTheme}>
      <div sx={{ 'button + button': { marginLeft: 4 } }}>
        <Button variant="filled">Filled Button</Button>
        <Button variant="subtle">Subtle Button</Button>
        <Button variant="text">Text Button</Button>
      </div>
    </ThemeProviderNext>
  )
}

export const WithIcon: Story = () => {
  return (
    <ThemeProviderNext theme={baseTheme}>
      <div sx={{ 'button + button': { marginLeft: 4 } }}>
        <Button icon={<IconAppStore />} variant="filled">
          Icon Start
        </Button>
        <Button icon={<IconAppStore />} iconPosition="end" variant="subtle">
          IconEnd
        </Button>
        <Button icon={<IconAppStore title="Icon only" />} variant="text" />
      </div>
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
