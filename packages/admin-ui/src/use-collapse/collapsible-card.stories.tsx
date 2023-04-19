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
import { useCollapse } from './use-collapse'
import { Divider } from '../divider'
import { csx } from '@vtex/admin-ui-core'

export default {
  title: 'admin-ui/CollapsibleCard',
  component: Card,
} as Meta

export const SingleCollapsible = () => {
  const { getToggleProps, getCollapseProps, visible } = useCollapse()

  return (
    <Card
      className={csx({
        width: '500px',
        margin: '$space-4',
      })}
    >
      <CardHeader
        {...getToggleProps()}
        className={csx({
          cursor: 'pointer',
          ':hover': {
            bg: '$action.neutral.tertiaryHover',
          },
        })}
      >
        <CardInfo>
          {visible ? <IconCaretDown /> : <IconCaretRight />}
          <CardImage
            src="https://vtex.com/wp-content/uploads/2020/04/VTEX-Brand.svg"
            alt="Image description"
          />
          <CardTitle>Title</CardTitle>
          <Tag label="Short text" />
        </CardInfo>
      </CardHeader>
      <div className={csx({ width: '100%' })} {...getCollapseProps()}>
        <CardContent
          className={csx({
            paddingTop: '$space-6',
          })}
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
      </div>
    </Card>
  )
}

const AccordionItem = ({ title, children }: any) => {
  const { getToggleProps, getCollapseProps, visible } = useCollapse()

  return (
    <>
      <CardHeader
        {...getToggleProps()}
        className={csx({
          cursor: 'pointer',
          ':hover': {
            bg: '$action.neutral.tertiaryHover',
          },
        })}
      >
        <CardInfo>
          {visible ? <IconCaretDown /> : <IconCaretRight />}
          <IconImageSquare />
          <CardTitle>{title}</CardTitle>
        </CardInfo>
      </CardHeader>
      <div className={csx({ width: '100%' })} {...getCollapseProps()}>
        <CardContent
          className={csx({
            paddingTop: '$space-6',
          })}
        >
          {children}
        </CardContent>
      </div>
    </>
  )
}

export const Accordion = () => {
  return (
    <Card
      className={csx({
        width: '500px',
        margin: '$space-4',
      })}
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
    </Card>
  )
}
