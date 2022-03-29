import 'jest-location-mock'

export function jestWindowMock() {
  let history: string[] = [window.location.pathname]
  let index = 0
  let popstateCallback = () => {}

  Object.defineProperties(window.history, {
    pushState: {
      value: (data: { path: string }) => {
        history = [...history.splice(0, index + 1), data.path]
        index += 1

        window.location.assign(data.path)
        popstateCallback()
      },
    },
    back: {
      value: () => {
        if (index <= 0) return

        index -= 1
        window.location.assign(history[index])
        popstateCallback()
      },
    },
    forward: {
      value: () => {
        if (index >= history.length) return

        index += 1
        window.location.assign(history[index])
        popstateCallback()
      },
    },
  })
  Object.defineProperties(window, {
    addEventListener: {
      value: (name: string, fn: () => void) => {
        if (name === 'popstate') {
          popstateCallback = fn
        }
      },
    },
  })
}

export function setQueryParam(query: Record<string, string | undefined>) {
  const queryParams = new URLSearchParams(window.location.search)

  Object.entries(query).forEach((element: [string, string | undefined]) => {
    if (!element[1]) {
      queryParams.delete(element[0])

      return
    }

    queryParams.set(element[0], element[1])
  })

  window.location.assign(`?${queryParams.toString()}`)
}

export function getCurrentQuery() {
  const queryParams = new URLSearchParams(window.location.search)

  return Object.fromEntries(queryParams.entries())
}

export function cleanQueryParam() {
  window.location.assign('')
}
