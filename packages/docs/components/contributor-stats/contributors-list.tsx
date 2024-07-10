import useSWR from 'swr'
import styles from './contributors.module.css'

const fetcher = (url) => fetch(url).then((r) => r.json())

export function ContributorList() {
  const { data, error, isLoading } = useSWR('/api/contributors', fetcher)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  console.log({ data })

  return (
    <div className={styles.container}>
      {data?.data.map((contributor) => (
        <img
          key={contributor.username}
          src={contributor.image}
          alt={contributor.name}
          className={styles.avatar}
        />
      ))}
    </div>
  )
}
