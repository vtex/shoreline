import React from 'react'
import type { Meta } from '@storybook/react'

import { createSystem } from '../../createSystem'
import { createComponent, createHook, useElement } from '../../system'
import {
  MenuButton as ReakitMenuButton,
  useMenuState,
  Menu as ReakitMenu,
  MenuItem as ReakitMenuItem,
} from 'reakit'

const [SystemProvider] = createSystem({
  key: 'admin-ui-react',
})

export default {
  title: 'admin-ui-react/system/composition',
  decorators: [
    (Story) => (
      <SystemProvider>
        <Story />
      </SystemProvider>
    ),
  ],
} as Meta

const useButton = createHook<'button'>((props) => {
  return props
})

const Button = createComponent<'button'>((props) => {
  const buttonProps = useButton(props)

  return useElement('button', buttonProps)
})

Button.displayName = 'Button'

export function AsPropComponent() {
  const menu = useMenuState()

  return (
    <div>
      <Button as={ReakitMenuButton} {...menu}>
        Open Menu
      </Button>
      <ReakitMenu state={menu}>
        <ReakitMenuItem state={menu}>Item 1</ReakitMenuItem>
      </ReakitMenu>
    </div>
  )
}

// export function RenderProps() {
//   const useLink = createHook<{}, 'a'>((props) => {
//     return props
//   })

//   const Link = createComponent<{}, 'a'>((props) => {
//     const linkProps = useLink(props)

//     return useElement('a', linkProps)
//   })

//   Link.displayName = 'Link'

//   return (
//     <Link href="https://admin-ui.com" target="blank">
//       {(props) => <a href={props.href}>Go to admin-ui site</a>}
//     </Link>
//   )
// }
