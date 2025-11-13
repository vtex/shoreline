import { useState } from 'react'
import { Pagination } from '@vtex/shoreline'

export function DefaultPagination() {
  const [page, setPage] = useState(1)

  return (
    <Pagination
      page={page}
      total={100}
      size={25}
      onPageChange={(newPage) => setPage(newPage)}
    />
  )
}

export function LoadingPagination() {
  const [page, setPage] = useState(1)

  return (
    <Pagination
      page={page}
      total={100}
      size={25}
      loading
      onPageChange={(newPage) => setPage(newPage)}
    />
  )
}

export function SmallPageSizePagination() {
  const [page, setPage] = useState(1)

  return (
    <Pagination
      page={page}
      total={100}
      size={10}
      onPageChange={(newPage) => setPage(newPage)}
    />
  )
}

export function LargePageSizePagination() {
  const [page, setPage] = useState(1)

  return (
    <Pagination
      page={page}
      total={250}
      size={50}
      onPageChange={(newPage) => setPage(newPage)}
    />
  )
}
