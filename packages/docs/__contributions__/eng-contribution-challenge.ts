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
      username: 'lafray',
      image:
        'https://avatars.githubusercontent.com/u/36760180?u=66a13423e65c88a3fc82201a20ba4282a1f5224a&v=4',
      stats: { pulls: 9, merged: 6, issues: 3, comments: 12, rate: 54 },
    },
    {
      username: 'riccoutinho',
      image:
        'https://avatars.githubusercontent.com/u/44474987?u=6eb25971ea6e45c93be67934739d9a6b2e6ddf91&v=4',
      stats: { pulls: 0, merged: 0, issues: 1, comments: 0, rate: 2 },
    },
    {
      username: 'lucasaarcoverde',
      image:
        'https://avatars.githubusercontent.com/u/20579226?u=22c79f6ca441ee1d933d5b59326348295b6a9844&v=4',
      stats: { pulls: 3, merged: 1, issues: 0, comments: 6, rate: 15 },
    },
    {
      username: 'caineblood',
      image: 'https://avatars.githubusercontent.com/u/79236147?v=4',
      stats: { pulls: 0, merged: 0, issues: 0, comments: 1, rate: 1 },
    },
    {
      username: 'vaporwavie',
      image:
        'https://avatars.githubusercontent.com/u/11232965?u=f6a8f2a77e73a92ee944e06f34d4fe70c7c4e65a&v=4',
      stats: { pulls: 0, merged: 0, issues: 3, comments: 2, rate: 8 },
    },
    {
      username: 'viniciuslagedo',
      image:
        'https://avatars.githubusercontent.com/u/3369680?u=d926ebade88220c24869b425ecd0c5fb064c0c0d&v=4',
      stats: { pulls: 6, merged: 4, issues: 3, comments: 3, rate: 33 },
    },
    {
      username: 'beatrizmilhomem',
      image: 'https://avatars.githubusercontent.com/u/84085258?v=4',
      stats: { pulls: 0, merged: 0, issues: 2, comments: 13, rate: 17 },
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
      stats: { pulls: 1, merged: 1, issues: 2, comments: 4, rate: 13 },
    },
    {
      username: 'matheusps',
      image:
        'https://avatars.githubusercontent.com/u/6964311?u=dab11b9f9e4b1b7eb66d86d0f4bf1e0c0d55d3bd&v=4',
      stats: { pulls: 0, merged: 0, issues: 0, comments: 3, rate: 3 },
    },
    {
      username: 'BeatrizAlbino',
      image:
        'https://avatars.githubusercontent.com/u/64042309?u=5081e29d8ee28a25d1e259d079e883622ffb590b&v=4',
      stats: { pulls: 0, merged: 0, issues: 0, comments: 1, rate: 1 },
    },
    {
      username: 'felipepowlist',
      image:
        'https://avatars.githubusercontent.com/u/64273940?u=ef5500dc49b6caaaf57a0f81d887b8ce9d97d351&v=4',
      stats: { pulls: 0, merged: 0, issues: 0, comments: 1, rate: 1 },
    },
  ],
  participants: 14,
  issues: 20,
  pulls: 19,
  merged: 12,
  comments: 49,
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
