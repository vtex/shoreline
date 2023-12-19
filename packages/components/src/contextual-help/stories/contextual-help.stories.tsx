import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import type { ContextualHelpProps } from '../index'
import { ContextualHelp } from '../index'
import { Text } from '../../text'
import { Stack } from '../../stack'
import './contextual-help-stories.css'

type BasePlacement = 'top' | 'bottom' | 'left' | 'right'
type Placement =
  | BasePlacement
  | `${BasePlacement}-start`
  | `${BasePlacement}-end`

const placementOptions: Placement[] = [
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
]

function PlaygroundStory(props: ContextualHelpProps) {
  const { label, children, ...otherProps } = props

  return (
    <Stack className="ch-examples ch-center ch-decorative-box">
      <Text variant="display1">Playground</Text>
      <ContextualHelp label={label} {...otherProps}>
        {children}
      </ContextualHelp>
    </Stack>
  )
}

export function Examples() {
  const [open, setOpen] = useState(true)

  return (
    <div className="ch-examples">
      <Stack className="ch-decorative-box ch-bg-purple">
        <Text variant="display1">Narrow</Text>
        <ContextualHelp label="Message">
          I'm not narrow (default)
        </ContextualHelp>
        <ContextualHelp narrow label="Message">
          I'm slightest narrower!
        </ContextualHelp>
      </Stack>
      <Stack className="ch-center ch-decorative-box ch-bg-green">
        <Text variant="display1">Placement</Text>
        <table>
          <thead>
            <tr>
              <th>Placement</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            {placementOptions.map((placement, index) => {
              return (
                <tr>
                  <th>
                    <span>{placement}</span>
                  </th>
                  <th>
                    <ContextualHelp label="Message" placement={placement}>
                      Check if this product has all the required prices,
                      information, inventory and logistic settings.
                    </ContextualHelp>
                  </th>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Stack>
      <Stack className="ch-decorative-box ch-bg-purple">
        <Text variant="display1">Controlled</Text>
        <Stack>
          <Text variant="caption1">{open ? 'Open' : 'Closed'}</Text>
          <ContextualHelp open={open} setOpen={setOpen} label="Message">
            Some helpful message here to help merchants contextually understand
            the definition of an item
          </ContextualHelp>
        </Stack>
      </Stack>
      <Stack className="ch-decorative-box ch-bg-green">
        <Text variant="display1">Overflow & max height</Text>
        <ContextualHelp label="Catalog indexing">
          <Stack>
            <Text as="p">
              Catalog indexing refers to the process of creating an organized
              and searchable index of information in a catalog. A catalog is a
              systematic list or collection of items, often with details or
              descriptions, and indexing is the method of creating an efficient
              and structured way to access and retrieve information from that
              catalog. In various contexts, catalog indexing can refer to
              different types of catalogs, such as:
            </Text>
            <ol
              style={{
                marginBlockStart: 'var(--sl-space-3)',
                paddingInlineStart: 'var(--sl-space-6)',
              }}
            >
              <Text as="li">
                Library Catalogs: In a library, catalog indexing involves
                creating an index of books, journals, and other materials. This
                index typically includes information like the title, author,
                subject, and other relevant details.
              </Text>
              <Text as="li">
                E-commerce Catalogs: In the context of online shopping, catalog
                indexing involves organizing and indexing product information.
                This can include details like product names, descriptions,
                prices, and other attributes. This process is crucial for
                efficient search functionality on e-commerce websites.
              </Text>
              <Text as="li">
                Database Indexing: In the realm of databases, catalog indexing
                involves creating indexes on database tables to improve the
                speed and efficiency of data retrieval operations. This is
                common in relational database management systems (RDBMS) to
                optimize query performance.
              </Text>
            </ol>
            <Text as="p">
              The goal of catalog indexing is to facilitate quick and accurate
              retrieval of information. By creating an index, users can search
              for specific items or information without having to scan through
              the entire catalog. This is especially important in large datasets
              where finding information quickly can be challenging without an
              efficient indexing system. The process of catalog indexing may
              involve the use of specialized algorithms and data structures to
              create an index that allows for fast and effective searching. It's
              a fundamental aspect of information management in various fields,
              ensuring that users can access the desired information with
              minimal effort.
            </Text>
          </Stack>
        </ContextualHelp>
      </Stack>
    </div>
  )
}

const meta: Meta<typeof ContextualHelp> = {
  title: 'shoreline-components/contextual-help',
  component: PlaygroundStory,
}

export default meta

type Story = StoryObj<typeof ContextualHelp>
export const Playground: Story = {
  argTypes: {
    placement: {
      options: placementOptions,
      control: { type: 'radio' },
      description: 'Popover placement',
      defaultValue: 'bottom',
    },
    label: {
      control: { type: 'text' },
      description: 'aria-abel for the contextual help trigger',
    },
    children: {
      control: { type: 'text' },
      description: 'Content of the contextual help',
    },
  },
  args: {
    label: 'Meaningful label',
    placement: 'bottom-end',
    children: `Some helpful message here to help merchants contextually understand
    the definition of an item`,
  },
}
