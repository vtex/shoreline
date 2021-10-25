import { useEffect, useState } from 'react'
import { globalHistory } from '@reach/router'

export function useLocation() {
  const [location, setLocation] = useState(globalHistory.location)

  useEffect(
    () =>
      globalHistory.listen((params) => {
        setLocation(params.location)
      }),
    [setLocation]
  )

  return location
}
