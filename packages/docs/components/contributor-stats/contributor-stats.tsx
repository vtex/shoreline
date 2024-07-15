export function ContributorStats(props: ContributorStatsProps) {
  const {
    contributor: { stats, username, image },
  } = props

  return (
    <div>
      <div>
        <img src={image} alt={username} />
        <div>{username}</div>
      </div>
      <div>
        <div>Issues: {stats.issues}</div>
        <div>Pulls: {stats.pulls}</div>
        <div>Reviews: {stats.reviews}</div>
        <div>Comments: {stats.comments}</div>
        <div>Merged: {stats.merged}</div>
        <div>Assigns: {stats.assigns}</div>
        <div>Rate: {stats.rate}</div>
      </div>
    </div>
  )
}

interface ContributorStatsProps {
  contributor: {
    username: string
    image: string
    stats: {
      issues: number
      pulls: number
      reviews: number
      comments: number
      merged: number
      assigns: number
      rate: number
    }
  }
}
