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
      <button
        onClick={() => {
          if (window.top.history.state.prevUrl) {
            window.top.history.pushState(
              { prevUrl: window.top.location.href },
              '',
              window.top.history.state.prevUrl
            )
          } else {
            window.top.history.back()
          }
        }}
      >
        Get back from where you came from
      </button>
      <button
        onClick={() => {
          window.top.history.pushState(
            { prevUrl: window.top.location.href },
            '',
            '/admin/rocket/nextjs-internal-route'
          )
        }}
      >
        Navigate from IO app to NextJS app internal route
      </button>
    </div>
  )
}
