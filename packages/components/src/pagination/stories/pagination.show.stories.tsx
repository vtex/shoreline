import './style.css'

import React, { useState } from 'react'

import { Pagination } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'components/pagination',
}

export function Show() {
  const [pagination, setPagination] = useState({ page: 1, size: 25 })

  return (
    <Stack fluid>
      <div className="pagination-container">
        <Pagination
          page={pagination.page}
          onPageChange={(page) => {
            setPagination((prev) => ({ ...prev, page }))
          }}
          total={754}
        />
      </div>
      <div className="pagination-container">
        {/* Single page */}
        <Pagination
          page={pagination.page}
          onPageChange={(page) => {
            setPagination((prev) => ({ ...prev, page }))
          }}
          total={22}
        />
      </div>
      <div className="pagination-container">
        {/* Custom size */}
        <Pagination
          page={pagination.page}
          onPageChange={(page) => {
            setPagination((prev) => ({ ...prev, page }))
          }}
          total={323}
          size={100}
        />
      </div>
      <div className="pagination-container">
        <Pagination page={3} total={55} loading />
      </div>
    </Stack>
  )
}
