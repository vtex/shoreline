import React from 'react'
import {
  useTableState,
  Table,
  TBody,
  TBodyRow,
  TBodyCell,
  THead,
  THeadCell,
  createColumns,
  Text,
  Stack,
  get,
  theme,
  csx,
} from '@vtex/admin-ui'

export function Typeface() {
  const columns = createColumns<TypefaceItem>([
    {
      id: 'example',
      header: 'Example',
      resolver: {
        type: 'plain',
        render: (column) => (
          <Text variant={column.item.token}>{column.item?.description}</Text>
        ),
      },
    },
    {
      id: 'token',
      header: 'Token',
      width: 300,
      resolver: {
        type: 'plain',
        render: (column) => {
          const { fontFamily, ...cleanTokens } = get(
            theme,
            `text.${column.item?.token}`
          )

          const keys = Object.keys(cleanTokens)

          return (
            <Stack>
              <Text
                className={csx({ fontWeight: 'bold' })}
              >{`$${column.item?.token}`}</Text>
              {keys.map((key, index) => {
                return (
                  <Text
                    tone="secondary"
                    key={index}
                  >{`${key}: ${cleanTokens[key]}`}</Text>
                )
              })}
            </Stack>
          )
        },
      },
    },
  ])

  const { data, getBodyCell, getHeadCell, getTable } = useTableState({
    columns,
    items,
  })

  return (
    <Table
      {...getTable()}
      className={csx({
        tr: {
          bg: 'white !important',
          td: { padding: '$space-6', verticalAlign: 'initial' },
        },
      })}
    >
      <THead>
        {columns.map((column) => (
          <THeadCell {...getHeadCell(column)} />
        ))}
      </THead>
      <TBody>
        {data.map((item) => {
          return (
            <TBodyRow key={item.token}>
              {columns.map((column) => {
                return <TBodyCell {...getBodyCell(column, item)} />
              })}
            </TBodyRow>
          )
        })}
      </TBody>
    </Table>
  )
}

interface TypefaceItem {
  description: string
  token:
    | 'detail'
    | 'action1'
    | 'action2'
    | 'pageTitle'
    | 'display'
    | 'title1'
    | 'title2'
    | 'body'
}

const items: TypefaceItem[] = [
  {
    token: 'body',
    description:
      'Text in tables, modals, toasts, alerts, cards; Text in form fields and controls; Placeholder text in form fields.',
  },
  {
    token: 'title1',
    description:
      'Tab title; Table line title; Card title; Modal title. Totalizer percentage.',
  },
  {
    token: 'title2',
    description: 'Nested card title.',
  },
  {
    token: 'detail',
    description:
      'Text in tag, tooltip and table pagination; Form error and help text. Labels in form field placeholders and select inline.',
  },
  {
    token: 'display',
    description: 'Totalizer value.',
  },
  {
    token: 'action1',
    description: 'Text in regular and small buttons; Account name in top bar.',
  },
  {
    token: 'action2',
    description: 'Text in left nav and action menu items; Links.',
  },
  {
    token: 'pageTitle',
    description: 'Page header title',
  },
]
