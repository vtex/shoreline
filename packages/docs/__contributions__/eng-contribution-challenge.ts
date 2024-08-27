export interface Contributor {
  username: string
  image: string
  stats: {
    issues: number
    pulls: number
    comments: number
    merged: number
    rate: number
  }
}

export interface ChallengeStats {
  participantsStats: Contributor[]
  participants: number
  issues: number
  pulls: number
  merged: number
  comments: number
}

export const stats: ChallengeStats = {
  participantsStats: [
    {
      username: 'vaporwavie',
      image:
        'https://avatars.githubusercontent.com/u/11232965?u=f6a8f2a77e73a92ee944e06f34d4fe70c7c4e65a&v=4',
      stats: { pulls: 0, merged: 0, issues: 3, comments: 2, rate: 8 },
    },
    {
      username: 'lucasaarcoverde',
      image:
        'https://avatars.githubusercontent.com/u/20579226?u=22c79f6ca441ee1d933d5b59326348295b6a9844&v=4',
      stats: { pulls: 3, merged: 1, issues: 0, comments: 5, rate: 14 },
    },
    {
      username: 'viniciuslagedo',
      image:
        'https://avatars.githubusercontent.com/u/3369680?u=d926ebade88220c24869b425ecd0c5fb064c0c0d&v=4',
      stats: { pulls: 6, merged: 4, issues: 3, comments: 2, rate: 32 },
    },
    {
      username: 'beatrizmilhomem',
      image: 'https://avatars.githubusercontent.com/u/84085258?v=4',
      stats: { pulls: 0, merged: 0, issues: 2, comments: 2, rate: 6 },
    },
    {
      username: 'davicostalf',
      image:
        'https://avatars.githubusercontent.com/u/8797476?u=209f606081b76c9e4afce6812d94ca789b213ed3&v=4',
      stats: { pulls: 0, merged: 0, issues: 4, comments: 2, rate: 10 },
    },
    {
      username: 'gabriellymoura',
      image:
        'https://avatars.githubusercontent.com/u/33657512?u=1a8383871ef11c572cbb0caf713afc2bd64a35d7&v=4',
      stats: { pulls: 0, merged: 0, issues: 1, comments: 1, rate: 3 },
    },
    {
      username: 'pedromtec',
      image:
        'https://avatars.githubusercontent.com/u/32311264?u=ce3296e8735885e7d6b650de92c044ded9fab1d1&v=4',
      stats: { pulls: 0, merged: 0, issues: 1, comments: 0, rate: 2 },
    },
    {
      username: 'kevinch',
      image:
        'https://avatars.githubusercontent.com/u/2573602?u=7ce617df54906dc3d4dab85291c390f26a1c5950&v=4',
      stats: { pulls: 1, merged: 0, issues: 2, comments: 4, rate: 10 },
    },
    {
      username: 'matheusps',
      image:
        'https://avatars.githubusercontent.com/u/6964311?u=dab11b9f9e4b1b7eb66d86d0f4bf1e0c0d55d3bd&v=4',
      stats: { pulls: 0, merged: 0, issues: 0, comments: 3, rate: 3 },
    },
    {
      username: 'lafray',
      image:
        'https://avatars.githubusercontent.com/u/36760180?u=66a13423e65c88a3fc82201a20ba4282a1f5224a&v=4',
      stats: { pulls: 6, merged: 6, issues: 0, comments: 8, rate: 38 },
    },
    {
      username: 'felipepowlist',
      image:
        'https://avatars.githubusercontent.com/u/64273940?u=ef5500dc49b6caaaf57a0f81d887b8ce9d97d351&v=4',
      stats: { pulls: 0, merged: 0, issues: 0, comments: 1, rate: 1 },
    },
  ],
  participants: 11,
  issues: 16,
  pulls: 16,
  merged: 11,
  comments: 30,
}

export function getWinners() {
  const winners = getContributors().filter(
    (participant) => !maintainers.includes(participant.username)
  )
  winners.sort((a, b) => b.stats.rate - a.stats.rate)

  return winners.slice(0, 3)
}

const maintainers = [
  'matheusps',
  'davicostalf',
  'lucasaarcoverde',
  'beatrizmilhomem',
]

export function getContributors() {
  return stats.participantsStats
}
