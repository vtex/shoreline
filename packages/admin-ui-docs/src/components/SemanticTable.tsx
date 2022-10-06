import React from 'react'
import {
  useTableState,
  Table,
  TBody,
  TBodyRow,
  TBodyCell,
  THead,
  THeadCell,
  Text,
  createColumns,
  color as getColor,
} from '@vtex/admin-ui'

export function SemanticTable(props: SemanticTableProps) {
  const { items = [] } = props

  const width = 100

  const columns = createColumns<Item>([
    {
      id: 'semantic',
      width,
      resolver: {
        type: 'plain',
        render: (column) => (
          <Text tone="secondary">{column.item?.semantic}</Text>
        ),
      },
    },
    {
      id: 'main',
      header: 'Main',
      width,
      resolver: {
        type: 'root',
        render: (column) => {
          return <Tone tone="main" semantic={column.item?.main} />
        },
      },
    },
    {
      id: 'critical',
      header: 'Critical',
      width,
      resolver: {
        type: 'root',
        render: (column) => {
          return <Tone tone="critical" semantic={column.item?.critical} />
        },
      },
    },
    {
      id: 'warning',
      header: 'Warning',
      width,
      resolver: {
        type: 'root',
        render: (column) => {
          return <Tone tone="warning" semantic={column.item?.warning} />
        },
      },
    },
    {
      id: 'positive',
      header: 'Positive',
      width,
      resolver: {
        type: 'root',
        render: (column) => {
          return <Tone tone="positive" semantic={column.item?.positive} />
        },
      },
    },
    {
      id: 'neutral',
      header: 'Neutral',
      width,
      resolver: {
        type: 'root',
        render: (column) => {
          return <Tone tone="neutral" semantic={column.item?.neutral} />
        },
      },
    },
    {
      id: 'info',
      header: 'Info',
      width,
      resolver: {
        type: 'root',
        render: (column) => {
          return <Tone tone="info" semantic={column.item?.info} />
        },
      },
    },
  ])

  const { data, getBodyCell, getHeadCell, getTable } = useTableState({
    columns,
    items,
  })

  return (
    <Table {...getTable()}>
      <THead>
        {columns.map((column) => (
          <THeadCell {...getHeadCell(column)} />
        ))}
      </THead>
      <TBody>
        {data.map((item, id) => {
          return (
            <TBodyRow key={`semantic-table-row-${id}`}>
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

function Tone(props: ToneProps) {
  const { tone, semantic } = props

  const color = {
    main: 'blue',
    info: 'lightBlue',
    critical: 'red',
    neutral: 'gray',
    warning: 'orange',
    positive: 'green',
  }[tone] as any

  return semantic ? (
    <Text
      csx={{
        color: getColor(`${color}40` as any),
        borderColor: getColor(`${color}40` as any),
        border: 'solid 1px',
        borderRadius: 'pill',
        padding: 2,
        fontSettings: 'medium',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {semantic}
    </Text>
  ) : null
}

interface SemanticTableProps {
  items: Item[]
}

type Item = {
  main?: string
  warning?: string
  positive?: string
  critical?: string
  neutral?: string
  info?: string
  semantic: string
}

interface ToneProps {
  tone: string
  semantic?: string
}
