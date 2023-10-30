import '../../../dist/styles.min.css'
import '../pagination.css'
import './style.css'
import React, { useState } from 'react'

import { Pagination } from '../index'

export default {
  title: 'shoreline-components/pagination',
}

export function Default() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)

  return (
    <div className="pagination-container">
      <Pagination
        page={page}
        onPage={(page) => {
          setPage(page)
        }}
        total={754}
        sizes={[25, 50, 100]}
        pageSize={pageSize}
        onPageSize={(size) => setPageSize(size)}
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
        onPage={(page) => {
          setPage(page)
        }}
        total={754}
        pageSize={100}
      />
    </div>
  )
}
