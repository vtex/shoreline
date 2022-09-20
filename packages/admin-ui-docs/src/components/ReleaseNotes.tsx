import React, { useEffect, useState } from 'react'
import {
  useTableState,
  createColumns,
  Table,
  Anchor,
  Heading,
  Box,
  DataView,
  useDataViewState,
} from '@vtex/admin-ui'

interface ReleaseNote {
  name: string
  published_at: string
  html_url: string
}

export function ReleaseNotes() {
  const [releases, setReleases] = useState<ReleaseNote[]>([])
  const view = useDataViewState({
    loading: true,
    error: null,
    empty: null,
    notFound: false,
  })

  const columns = createColumns<ReleaseNote>([
    {
      id: 'name',
      header: 'Version',
    },
    {
      id: 'published_at',
      header: 'Publish Date',
      resolver: {
        type: 'date',
        locale: 'en-US',
      },
    },
    {
      id: 'html_url',
      header: 'Details',
      resolver: {
        type: 'root',
        render: ({ item }) => {
          return (
            <Anchor href={item.html_url} target="blank">
              Github release
            </Anchor>
          )
        },
      },
    },
  ])

  const table = useTableState({
    items: releases,
    columns,
    view,
  })

  useEffect(() => {
    if (releases.length === 0) return

    view.setStatus({ type: 'ready' })
  }, [releases])

  useEffect(() => {
    fetch('https://api.github.com/repos/vtex/admin-ui/releases')
      .then((response) => response.json())
      .then((response) => {
        setReleases(response)
      })
  }, [])

  return (
    <DataView state={view}>
      <Box
        csx={{
          padding: 'm',
        }}
      >
        <Heading>Releases table</Heading>
        <Table state={table} />
      </Box>
    </DataView>
  )
}
