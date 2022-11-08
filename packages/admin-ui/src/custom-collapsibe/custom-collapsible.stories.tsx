import React from 'react'
import type { Meta } from '@storybook/react'

import {
  CardTitle,
  CardImage,
  Card,
  CardContent,
  CardHeader,
  CardInfo,
} from '../card'
import { Tag } from '../tag'
import {
  IconImageSquare,
  IconCaretDown,
  IconCaretRight,
} from '@vtex/phosphor-icons'
import { useCollapsible } from './use-collapsible'
import { Box } from '../box'
import { Divider } from '../components/Divider'

export default {
  title: 'admin-ui/CollapsibleCard',
  component: Card,
} as Meta

const CardWrapper = ({ children, csx }: any) => {
  return (
    <Box
      csx={{
        bg: '$primary',
        color: '$primary',
        border: '$neutral',
        borderRadius: 'default',
        size: '100%',
        boxSizing: 'border-box',
        ...csx,
      }}
    >
      {children}
    </Box>
  )
}

export const SingleCollapsible = () => {
  const {
    getToggleProps,
    getCollapseProps,
    visible: isExpanded,
  } = useCollapsible()

  return (
    <CardWrapper
      csx={{
        width: '500px',
        margin: '$space-4',
      }}
    >
      <CardHeader
        {...getToggleProps()}
        csx={{
          cursor: 'pointer',
          padding: '$space-6 $space-7',
          ':hover': {
            bg: '$action.neutral.tertiaryHover',
          },
        }}
      >
        <CardInfo>
          {isExpanded ? (
            <IconCaretDown size="small" />
          ) : (
            <IconCaretRight size="small" />
          )}
          <CardImage
            src="https://vtex.com/wp-content/uploads/2020/04/VTEX-Brand.svg"
            alt="Image description"
          />
          <CardTitle>Title</CardTitle>
          <Tag label="Short text" />
        </CardInfo>
      </CardHeader>
      <Box csx={{ width: '100%' }} {...getCollapseProps()}>
        <CardContent
          csx={{
            padding: '$space-6 $space-7',
          }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </CardContent>
      </Box>
    </CardWrapper>
  )
}

const AccordionItem = ({ title, children }: any) => {
  const {
    getToggleProps,
    getCollapseProps,
    visible: isExpanded,
  } = useCollapsible()

  return (
    <>
      <CardHeader
        {...getToggleProps()}
        csx={{
          cursor: 'pointer',
          padding: '$space-6 $space-7',
          ':hover': {
            bg: '$action.neutral.tertiaryHover',
          },
        }}
      >
        <CardInfo>
          {isExpanded ? (
            <IconCaretDown size="small" />
          ) : (
            <IconCaretRight size="small" />
          )}
          <IconImageSquare />
          <CardTitle>{title}</CardTitle>
          <Tag label="Short text" />
        </CardInfo>
      </CardHeader>
      <Box csx={{ width: '100%' }} {...getCollapseProps()}>
        <CardContent
          csx={{
            padding: '$space-6 $space-7',
          }}
        >
          {children}
        </CardContent>
      </Box>
    </>
  )
}

export const Accordion = () => {
  return (
    <CardWrapper
      csx={{
        width: '500px',
        margin: '$space-4',
      }}
    >
      <AccordionItem title="item1">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </AccordionItem>
      <Divider />
      <AccordionItem title="item2">
        ublishing software like Aldus PageMaker including versions of Lorem
        Ipsum.
      </AccordionItem>
      <Divider />
      <AccordionItem title="item3">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </AccordionItem>
      <Divider />
      <AccordionItem title="item2">
        It was popularised in the 1960s with the release of Letraset sheets
        containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem
        Ipsum.
      </AccordionItem>
    </CardWrapper>
  )

  // return (
  //   <AccordionItem id="single" state={state}>
  //     <AccordionHeader>
  //       <CardImage
  //         src="https://vtex.com/wp-content/uploads/2020/04/VTEX-Brand.svg"
  //         alt="Image description"
  //       />
  //       <CardTitle>Title</CardTitle>
  //       <Tag label="Short texto" />
  //       <FlexSpacer />

  //       <MenuButton
  //         variant="neutralTertiary"
  //         state={menu}
  //         onClick={(e) => e.stopPropagation()}
  //         labelHidden
  //         bleedY
  //       />
  //       <Menu state={menu}>
  //         <MenuItem label="abca" />
  //       </Menu>
  //     </AccordionHeader>
  //     <AccordionContent>
  //       It’s all about being ready to grow and reach new levels. Have a solid
  //       foundation, modular thinking and flexible essence, and you’re building
  //       for scale. We are global but we’re audacious enough to aim for the
  //       stars.
  //     </AccordionContent>
  //   </AccordionItem>
  // )
}

// export const InitiallyVisible = () => {
//   // const state = useAccordionState({ visible: true })
//   const state = useAccordionStateGlobal()

//   return (
//     <AccordionItem initiallyVisible id="dosd" state={state}>
//       <AccordionHeader>
//         <CardTitle>Title</CardTitle>
//       </AccordionHeader>
//       <AccordionContent>
//         It’s all about being ready to grow and reach new levels. Have a solid
//         foundation, modular thinking and flexible essence, and you’re building
//         for scale. We are global but we’re audacious enough to aim for the
//         stars.
//       </AccordionContent>
//     </AccordionItem>
//   )
// }

// export const Nested = () => {
//   const root = useAccordionStateGlobal()

//   return (
//     <AccordionItem id="raa" state={root}>
//       <AccordionHeader>
//         <CardTitle>Root Accordion</CardTitle>
//       </AccordionHeader>
//       <AccordionContent>
//         <Card>
//           <CardHeader>
//             <CardInfo>
//               <CardTitle>Title</CardTitle>
//             </CardInfo>
//           </CardHeader>
//           <CardContent csx={{ width: '100%', height: 250, bg: '$secondary' }} />
//         </Card>
//       </AccordionContent>
//     </AccordionItem>
//   )
// }

// export const Group = () => {
//   const state = useAccordionStateGlobal()

//   return (
//     <>
//       <Button onClick={() => state.toggle('2')}>Open first</Button>
//       <AccordionGroup csx={{ width: 400 }}>
//         <AccordionItem id="1" state={state} initiallyVisible>
//           <AccordionHeader>
//             <CardTitle>Title</CardTitle>
//           </AccordionHeader>
//           <AccordionContent>Some content</AccordionContent>
//         </AccordionItem>
//         <AccordionItem id="2" state={state}>
//           <AccordionHeader>
//             <CardTitle>Title</CardTitle>
//           </AccordionHeader>
//           <AccordionContent>Some content</AccordionContent>
//         </AccordionItem>
//         <AccordionItem id="3" state={state}>
//           <AccordionHeader>
//             <CardTitle>Title</CardTitle>
//           </AccordionHeader>
//           <AccordionContent>Some content</AccordionContent>
//         </AccordionItem>
//       </AccordionGroup>
//     </>
//   )
// }
