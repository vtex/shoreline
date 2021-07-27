import { useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

export function useConfig() {
  const data = useStaticQuery(graphql`
    query {
      adminUiConfig(id: { eq: "gatsby-plugin-admin-ui-config" }) {
        appName
      }
    }
  `)

  const config = useMemo(() => data.adminUiConfig, [])

  return config
}
