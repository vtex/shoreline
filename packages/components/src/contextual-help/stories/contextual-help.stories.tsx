import React, { useState } from 'react'

import { ContextualHelp } from '../index'
import { Text } from '../../text'
import { Stack } from '../../stack'
import { usePopoverStore } from '../../popover'
import './contextual-help-stories.css'

type BasePlacement = 'top' | 'bottom' | 'left' | 'right'
type Placement =
  | BasePlacement
  | `${BasePlacement}-start`
  | `${BasePlacement}-end`

const placementOptions: Placement[] = [
  'top',
  'bottom',
  'left',
  'right',
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
  'left-start',
  'left-end',
  'right-start',
  'right-end',
]

export default {
  title: 'shoreline-components/contextual-help',
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
    placement: {
      control: {
        type: 'select',
        options: placementOptions,
      },
    },
    narrow: {
      control: {
        type: 'boolean',
      },
    },
  },
}

export function Playground(props) {
  const { placement, ...rest } = props
  const store = usePopoverStore({
    placement,
  })

  return (
    <ContextualHelp label="Catalog indexing" store={store} {...rest}>
      <Text as="p">
        Catalog indexing refers to the process of creating an organized and
        searchable index of information in a catalog. A catalog is a systematic
        list or collection of items, often with details or descriptions, and
        indexing is the method of creating an efficient and structured way to
        access and retrieve information from that catalog.
      </Text>
    </ContextualHelp>
  )
}

export function Examples() {
  const [open, setOpen] = useState(true)

  const storeTop = usePopoverStore({
    placement: 'top',
  })

  const storeBottom = usePopoverStore({
    placement: 'bottom',
  })

  const storeLeft = usePopoverStore({
    placement: 'left',
  })

  const storeRight = usePopoverStore({
    placement: 'right',
  })

  const storeTopEnd = usePopoverStore({
    placement: 'top-end',
  })

  const storeTopStart = usePopoverStore({
    placement: 'top-start',
  })

  const storeBottomEnd = usePopoverStore({
    placement: 'bottom-end',
  })

  const storeBottomStart = usePopoverStore({
    placement: 'bottom-start',
  })

  const storeLeftEnd = usePopoverStore({
    placement: 'left-end',
  })

  const storeLeftStart = usePopoverStore({
    placement: 'left-start',
  })

  const storeRightEnd = usePopoverStore({
    placement: 'right-end',
  })

  const storeRightStart = usePopoverStore({
    placement: 'right-start',
  })

  const stores = [
    storeTop,
    storeBottom,
    storeLeft,
    storeRight,
    storeTopEnd,
    storeTopStart,
    storeBottomEnd,
    storeBottomStart,
    storeLeftEnd,
    storeLeftStart,
    storeRightEnd,
    storeRightStart,
  ]

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
      <Stack className="ch-placement ch-decorative-box ch-bg-green">
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
                    <ContextualHelp label="Message" store={stores[index]}>
                      Message
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
            Message
          </ContextualHelp>
        </Stack>
      </Stack>
      <Stack className="ch-decorative-box ch-bg-green">
        <Text variant="display1">Overflow</Text>
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
