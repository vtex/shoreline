import React, { useEffect, useMemo, useState } from 'react'
import {
  IconCloudArrowUp,
  IconDotsThreeVertical,
  IconPencil,
  IconTrash,
} from '@vtex/shoreline-icons'
import type { ColumnDef } from '@tanstack/react-table'
import { faker } from '@faker-js/faker'
import {
  Menu,
  MenuProvider,
  MenuItem,
  MenuTrigger,
  MenuSeparator,
  Flex,
  Text,
  IconButton,
  Tag,
  VisuallyHidden,
  Pagination,
  Stack,
  MenuPopover,
} from '@vtex/shoreline-components'

import { TsTable } from '../index'

export default {
  title: 'ts-table/ts-table',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

type Product = {
  imageUrl: string
  name: string
  updatedAt: string
  department: string
}

const data: Product[] = [...Array(100).keys()].map((id) => {
  return {
    id: `${id}`,
    imageUrl: faker.image.url(),
    name: faker.commerce.productName(),
    updatedAt: faker.date.past().toDateString(),
    department: faker.commerce.department(),
  }
})

export function ClientPagination() {
  const columns = useMemo<Array<ColumnDef<Product>>>(
    () => [
      {
        id: 'name',
        cell: ({
          row: {
            original: { name, imageUrl },
          },
        }) => {
          return (
            <Flex align="center" gap="var(--sl-space-2)">
              <img
                style={{
                  width: 32,
                }}
                src={imageUrl}
                alt={`product ${name}`}
              />
              <Text variant="body">{name}</Text>
            </Flex>
          )
        },
        header: 'Product',
      },
      {
        accessorKey: 'updatedAt',
        header: 'Last update',
      },
      {
        accessorKey: 'department',
        header: 'Department',
        cell: ({ getValue }) => {
          const value = getValue()

          return <Tag size="normal">{value as any}</Tag>
        },
      },
      {
        id: 'actions',
        header: () => <VisuallyHidden>Actions</VisuallyHidden>,
        cell: ({
          row: {
            original: { name },
          },
        }) => {
          return (
            <MenuProvider>
              <MenuTrigger asChild>
                <IconButton label="Actions" variant="tertiary">
                  <IconDotsThreeVertical />
                </IconButton>
              </MenuTrigger>
              <MenuPopover>
                <MenuItem>
                  <IconPencil /> Edit
                </MenuItem>
                <MenuItem>
                  <IconCloudArrowUp /> Publish
                </MenuItem>
                <MenuSeparator />
                <MenuItem critical onClick={() => alert(`Deleted ${name}`)}>
                  <IconTrash /> Delete
                </MenuItem>
              </MenuPopover>
            </MenuProvider>
          )
        },
      },
    ],
    []
  )

  const [{ page, size }, setPagination] = useState({ page: 1, size: 10 })

  const paginatedData = useMemo(() => {
    const currentIndex = (page - 1) * size

    return data.slice(currentIndex, currentIndex + size)
  }, [page, size])

  return (
    <Stack>
      <Pagination
        page={page}
        onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
        total={data.length}
      />
      <TsTable data={paginatedData} columns={columns} />
    </Stack>
  )
}

function getItems(page: number, size: number) {
  return new Promise<Product[]>((res) => {
    setTimeout(() => {
      const currentIndex = (page - 1) * size

      const paginatedData = data.slice(currentIndex, currentIndex + size)

      res(paginatedData)
    }, 2000)
  })
}

export function ServerPagination() {
  const columns = useMemo<Array<ColumnDef<Product>>>(
    () => [
      {
        id: 'name',
        cell: ({
          row: {
            original: { name, imageUrl },
          },
        }) => {
          return (
            <Flex align="center" gap="var(--sl-space-2)">
              <img
                style={{
                  width: 32,
                }}
                src={imageUrl}
                alt={`product ${name}`}
              />
              <Text variant="body">{name}</Text>
            </Flex>
          )
        },
        header: 'Product',
      },
      {
        accessorKey: 'updatedAt',
        header: 'Last update',
      },
      {
        accessorKey: 'department',
        header: 'Department',
        cell: ({ getValue }) => {
          const value = getValue()

          return <Tag size="normal">{value as any}</Tag>
        },
      },
      {
        id: 'actions',
        header: () => <VisuallyHidden>Actions</VisuallyHidden>,
        cell: ({
          row: {
            original: { name },
          },
        }) => {
          return (
            <MenuProvider>
              <MenuTrigger asChild>
                <IconButton label="Actions" variant="tertiary">
                  <IconDotsThreeVertical />
                </IconButton>
              </MenuTrigger>
              <MenuPopover>
                <MenuItem>
                  <IconPencil /> Edit
                </MenuItem>
                <MenuItem>
                  <IconCloudArrowUp /> Publish
                </MenuItem>
                <MenuSeparator />
                <MenuItem critical onClick={() => alert(`Deleted ${name}`)}>
                  <IconTrash /> Delete
                </MenuItem>
              </MenuPopover>
            </MenuProvider>
          )
        },
      },
    ],
    []
  )

  const [{ page, size }, setPagination] = useState({ page: 1, size: 10 })
  const [loading, setLoading] = useState(true)

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    if (loading) setLoading(true)

    getItems(page, size).then((products: Product[]) => {
      setLoading(false)
      setProducts(products)
    })
  }, [page, size])

  return (
    <Stack>
      <Pagination
        loading={loading}
        page={page}
        onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
        total={data.length}
      />
      <TsTable data={products} columns={columns} />
    </Stack>
  )
}
