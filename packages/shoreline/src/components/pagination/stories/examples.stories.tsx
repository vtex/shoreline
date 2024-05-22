import './style.css'

import { useState } from 'react'

import { Pagination } from '../index'
import { LocaleProvider } from '../../locale'

export default {
  title: 'components/pagination',
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
}

export function Localization() {
  const [pagination, setPagination] = useState({ page: 1, size: 25 })

  return (
    <LocaleProvider locale="pt-BR">
      <div className="pagination-container">
        <Pagination
          page={pagination.page}
          onPageChange={(page) => {
            setPagination((prev) => ({ ...prev, page }))
          }}
          total={100}
        />
      </div>
    </LocaleProvider>
  )
}
