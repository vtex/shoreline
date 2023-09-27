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
            navigate('/admin/rocket')
          }}
        >
          Navigate from IO app to NextJS App Base Route
        </button>
        <button
          onClick={() => {
            navigate('/admin/rocket/nextjs-internal-route')
          }}
        >
          Navigate from IO app to NextJS App Internal Static Route
        </button>
        <button
          onClick={() => {
            navigate(
              `/admin/rocket/nextjs-internal-route/${generateRandomId()}`
            )
          }}
        >
          Navigate from IO app to NextJS App Internal Dynamic Route
        </button>
      </div>
    </div>
  )
}
