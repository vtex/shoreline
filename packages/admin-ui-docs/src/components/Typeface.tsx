import React from 'react'
import {
  useDataGridState,
  DataGrid,
  createColumns,
  Text,
  Set,
  get,
  theme,
} from '@vtex/admin-ui'

export function Typeface() {
  const columns = createColumns<TypefaceItem>([
    {
      id: 'example',
      header: 'Example',
      resolver: {
        type: 'plain',
        render: (column) => (
          <Text as="p" variant={column.item.token}>
            {column.item?.description}
          </Text>
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
            <Set orientation="vertical">
              <Text
                csx={{ fontWeight: 'bold' }}
              >{`$${column.item?.token}`}</Text>
              {keys.map((key, index) => {
                return (
                  <Text
                    tone="secondary"
                    key={index}
                  >{`${key}: ${cleanTokens[key]}`}</Text>
                )
              })}
            </Set>
          )
        },
      },
    },
  ])

  const state = useDataGridState<TypefaceItem>({
    density: 'regular',
    columns,
    items,
  })

  return (
    <DataGrid
      csx={{
        tr: {
          bg: 'white !important',
          td: { padding: 6, verticalAlign: 'initial' },
        },
      }}
      state={state}
    />
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
