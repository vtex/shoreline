import './style.css'

import React, { useState } from 'react'

import { Pagination } from '../index'
import { LocaleProvider } from '@vtex/shoreline-primitives'

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
      />
    </div>
  )
}

export function SinglePage() {
  const [pagination, setPagination] = useState({ page: 1, size: 25 })

  return (
    <div className="pagination-container">
      <Pagination
        page={pagination.page}
        onPageChange={(page) => {
          setPagination((prev) => ({ ...prev, page }))
        }}
        total={22}
      />
    </div>
  )
}

export function CustomSize() {
  const [pagination, setPagination] = useState({ page: 1, size: 25 })

  return (
    <div className="pagination-container">
      <Pagination
        page={pagination.page}
        onPageChange={(page) => {
          setPagination((prev) => ({ ...prev, page }))
        }}
        total={323}
        size={100}
      />
    </div>
  )
}

export function Loading() {
  return (
    <div className="pagination-container">
      <Pagination page={3} total={55} loading />
    </div>
  )
}

export function Intl() {
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
