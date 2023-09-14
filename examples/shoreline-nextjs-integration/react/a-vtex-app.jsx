import React from 'react'

export default function VtexApp() {
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
      <button onClick={() => window.top.history.go(-2)}>Try now!</button>
    </div>
  )
}
