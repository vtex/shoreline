import '../../../dist/styles.min.css'
import '../simple-table.css'
import React, { useEffect, useMemo, useState } from 'react'
import {
  IconCloudArrowUp,
  IconDotsThreeVertical,
  IconPencil,
  IconTrash,
} from '@vtex/shoreline-icons'
import type { ColumnDef } from '@tanstack/react-table'
import { faker } from '@faker-js/faker'

import { Flex } from '../../flex'
import { Text } from '../../text'
import { IconButton } from '../../icon-button'
import { Tag } from '../../tag'
import {
  Menu,
  MenuProvider,
  MenuItem,
  MenuTrigger,
  MenuSeparator,
} from '../../menu'
import { VisuallyHidden } from '../../visually-hidden'
import { Pagination } from '../../pagination'
import { SimpleTable } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'shoreline-components/simple-table',
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
            <Flex align="center" columnGap="var(--sl-space-2)">
              <img
                style={{
                  width: 32,
                }}
                src={imageUrl}
                alt={`product ${name}`}
              />
              <Text>{name}</Text>
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
              <Menu>
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
              </Menu>
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
        size={size}
        sizeOptions={[10, 25, 50]}
        onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
        onSizeChange={(size) => setPagination((prev) => ({ ...prev, size }))}
        total={data.length}
      />
      <SimpleTable data={paginatedData} columns={columns} />
    </Stack>
  )
}

function getItems(page: number, size: number) {
  return new Promise<Product[]>((res) => {
    setTimeout(() => {
      const currentIndex = (page - 1) * size

      const paginatedData = data.slice(currentIndex, currentIndex + size)

      res(paginatedData)
    }, 200)
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
            <Flex align="center" columnGap="var(--sl-space-2)">
              <img
                style={{
                  width: 32,
                }}
                src={imageUrl}
                alt={`product ${name}`}
              />
              <Text>{name}</Text>
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
              <Menu>
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
              </Menu>
            </MenuProvider>
          )
        },
      },
    ],
    []
  )

  const [{ page, size }, setPagination] = useState({ page: 1, size: 10 })

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    getItems(page, size).then((products: Product[]) => {
      setProducts(products)
    })
  }, [page, size])

  return (
    <Stack>
      <Pagination
        page={page}
        size={size}
        sizeOptions={[10, 25, 50]}
        onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
        onSizeChange={(size) => setPagination((prev) => ({ ...prev, size }))}
        total={data.length}
      />
      <SimpleTable data={products} columns={columns} />
    </Stack>
  )
}
