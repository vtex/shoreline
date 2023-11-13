import './style.css'

import React, { useState } from 'react'

import { Pagination } from '../index'

export default {
  title: 'shoreline-components/pagination',
}

export function Default() {
  const [pagination, setPagination] = useState({ page: 1, size: 25 })

  return (
    <div className="pagination-container">
      <Pagination
        page={pagination.page}
        onPageChange={(page) => {
          setPagination((prev) => ({ ...prev, page }))
        }}
        total={754}
        sizeOptions={[25, 50, 100]}
        size={pagination.size}
        onSizeChange={(size) => setPagination((prev) => ({ ...prev, size }))}
      />
    </div>
  )
}

export function WithoutPageSize() {
  const [page, setPage] = useState(1)

  return (
    <div className="pagination-container">
      <Pagination
        page={page}
        onPageChange={(page) => {
          setPage(page)
        }}
        total={754}
        size={100}
      />
    </div>
  )
}

export function Loading() {
  return (
    <div className="pagination-container">
      <Pagination
        page={1}
        total={754}
        sizeOptions={[25, 50, 100]}
        size={25}
        loading
      />
    </div>
  )
}
