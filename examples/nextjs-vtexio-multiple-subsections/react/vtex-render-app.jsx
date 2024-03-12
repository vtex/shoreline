import React from 'react'
import { useNavigation } from '@vtex/raccoon-io'

const generateRandomId = () => {
  return Math.floor(Math.random() * 5)
}

export default function VtexApp() {
  const { navigate } = useNavigation()

  return (
    <div
      style={{
        margin: '3rem',
      }}
    >
      <h1>This is a VTEX IO React page</h1>
      <p>
        You should be able to navigate back and forth with other NextJS pages
        with the same base route using the history API
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <button
          onClick={() => {
            navigate('/admin/nextjs-base-route')
          }}
        >
          Navigate from IO app to NextJS nextjs-base-route
        </button>
        <button
          onClick={() => {
            navigate(`/admin/nextjs-base-route/${generateRandomId()}`)
          }}
        >
          Navigate from IO app to NextJS App nextjs-base-route with dynamic
          parameter
        </button>

        <button
          onClick={() => {
            navigate('/admin/another-nextjs-base-route')
          }}
        >
          Navigate from IO app to NextJS App another-nextjs-base-route
        </button>
        <button
          onClick={() => {
            navigate(`/admin/another-nextjs-base-route/${generateRandomId()}`)
          }}
        >
          Navigate from IO app to NextJS App another-nextjs-base-route with
          dynamic parameter
        </button>
      </div>
    </div>
  )
}
