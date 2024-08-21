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
      username: 'felipepowlist',
      image:
        'https://avatars.githubusercontent.com/u/64273940?u=ef5500dc49b6caaaf57a0f81d887b8ce9d97d351&v=4',
      stats: { pulls: 0, merged: 0, issues: 3, comments: 4, rate: 10 },
    },
    {
      username: 'davicostalf',
      image:
        'https://avatars.githubusercontent.com/u/8797476?u=209f606081b76c9e4afce6812d94ca789b213ed3&v=4',
      stats: { pulls: 2, merged: 1, issues: 13, comments: 19, rate: 52 },
    },
    {
      username: 'luarakerlen',
      image:
        'https://avatars.githubusercontent.com/u/26902816?u=d846a5be1fe5bff2c2421e09e2b501e4fff22bb2&v=4',
      stats: { pulls: 0, merged: 0, issues: 1, comments: 0, rate: 2 },
    },
    {
      username: 'ArthurFerrao',
      image:
        'https://avatars.githubusercontent.com/u/15989443?u=b53df474c002b6c761fad5795ceddcd8444294c4&v=4',
      stats: { pulls: 0, merged: 0, issues: 0, comments: 1, rate: 1 },
    },
    {
      username: 'lucasaarcoverde',
      image:
        'https://avatars.githubusercontent.com/u/20579226?u=22c79f6ca441ee1d933d5b59326348295b6a9844&v=4',
      stats: { pulls: 2, merged: 2, issues: 1, comments: 4, rate: 16 },
    },
    {
      username: 'matheusps',
      image:
        'https://avatars.githubusercontent.com/u/6964311?u=dab11b9f9e4b1b7eb66d86d0f4bf1e0c0d55d3bd&v=4',
      stats: { pulls: 6, merged: 6, issues: 4, comments: 9, rate: 47 },
    },
    {
      username: 'viniciuslagedo',
      image:
        'https://avatars.githubusercontent.com/u/3369680?u=d926ebade88220c24869b425ecd0c5fb064c0c0d&v=4',
      stats: { pulls: 0, merged: 0, issues: 2, comments: 1, rate: 5 },
    },
    {
      username: 'rafarubim',
      image:
        'https://avatars.githubusercontent.com/u/22064061?u=71df2ebc8b1459f453a7a7542f1a8cd8596b0af3&v=4',
      stats: { pulls: 0, merged: 0, issues: 2, comments: 0, rate: 4 },
    },
    {
      username: 'beatrizmilhomem',
      image: 'https://avatars.githubusercontent.com/u/84085258?v=4',
      stats: { pulls: 1, merged: 1, issues: 18, comments: 20, rate: 61 },
    },
    {
      username: 'elleenvs-d',
      image:
        'https://avatars.githubusercontent.com/u/175859727?u=b2e3221eaa3949489c941c1fe84d5cc0a63bf6cd&v=4',
      stats: { pulls: 0, merged: 0, issues: 1, comments: 2, rate: 4 },
    },
    {
      username: 'BeatrizAlbino',
      image:
        'https://avatars.githubusercontent.com/u/64042309?u=5081e29d8ee28a25d1e259d079e883622ffb590b&v=4',
      stats: { pulls: 0, merged: 0, issues: 2, comments: 3, rate: 7 },
    },
    {
      username: 'malu-viana',
      image:
        'https://avatars.githubusercontent.com/u/90862160?u=54e7a2458bc76b500106dfaea9c09ef0cc548fc8&v=4',
      stats: { pulls: 0, merged: 0, issues: 1, comments: 3, rate: 5 },
    },
    {
      username: 'renatamottam',
      image:
        'https://avatars.githubusercontent.com/u/11613011?u=a6f5c7c7bbc7efb46813da9e644649e9e30e29ca&v=4',
      stats: { pulls: 0, merged: 0, issues: 2, comments: 5, rate: 9 },
    },
    {
      username: 'JessieMeguro',
      image: 'https://avatars.githubusercontent.com/u/77702122?v=4',
      stats: { pulls: 0, merged: 0, issues: 1, comments: 0, rate: 2 },
    },
    {
      username: 'pedroalexandria',
      image:
        'https://avatars.githubusercontent.com/u/40396442?u=0c9abb3c8dc234d481d89b4c2c8c375d70aa6a11&v=4',
      stats: { pulls: 0, merged: 0, issues: 1, comments: 1, rate: 3 },
    },
    {
      username: 'Luizfmcosta',
      image:
        'https://avatars.githubusercontent.com/u/131171714?u=3a57726e05e7a9bf9abb736a5dcaea748ad85924&v=4',
      stats: { pulls: 0, merged: 0, issues: 1, comments: 1, rate: 3 },
    },
    {
      username: 'ju-gc',
      image:
        'https://avatars.githubusercontent.com/u/32114752?u=d4c15d2968b3073cfa2e9455f3e6baf7d5d06c5d&v=4',
      stats: { pulls: 0, merged: 0, issues: 1, comments: 0, rate: 2 },
    },
    {
      username: 'danilomcampos',
      image:
        'https://avatars.githubusercontent.com/u/55562946?u=c50b24ae43572090963ccc9b6ae4a2549485e374&v=4',
      stats: { pulls: 0, merged: 0, issues: 1, comments: 0, rate: 2 },
    },
    {
      username: 'rhebeca',
      image:
        'https://avatars.githubusercontent.com/u/65421322?u=c277b01f46391800b1b04ccd70d7aca3a8ea0b0d&v=4',
      stats: { pulls: 0, merged: 0, issues: 1, comments: 1, rate: 3 },
    },
    {
      username: 'amandavcp',
      image:
        'https://avatars.githubusercontent.com/u/177753096?u=b5c26a20ad48438e672d579723d2af485c3185a2&v=4',
      stats: { pulls: 0, merged: 0, issues: 1, comments: 1, rate: 3 },
    },
    {
      username: 'nikolaspereira',
      image: 'https://avatars.githubusercontent.com/u/149801492?v=4',
      stats: { pulls: 0, merged: 0, issues: 1, comments: 1, rate: 3 },
    },
    {
      username: 'biaoliveira28',
      image:
        'https://avatars.githubusercontent.com/u/175982266?u=3d003435fe27d860fc51d000cf34e3316e81058e&v=4',
      stats: { pulls: 0, merged: 0, issues: 1, comments: 2, rate: 4 },
    },
    {
      username: 'gabriel-niemeyer',
      image:
        'https://avatars.githubusercontent.com/u/176613933?u=63bfed08eb14deefdbcb6e87bf65c6aa83190168&v=4',
      stats: { pulls: 0, merged: 0, issues: 1, comments: 3, rate: 5 },
    },
    {
      username: 'fernandacolodetti',
      image:
        'https://avatars.githubusercontent.com/u/126823938?u=c70330c37f2d5279b9671d18e9c9259ff12de881&v=4',
      stats: { pulls: 0, merged: 0, issues: 0, comments: 1, rate: 1 },
    },
    {
      username: 'lafray',
      image:
        'https://avatars.githubusercontent.com/u/36760180?u=66a13423e65c88a3fc82201a20ba4282a1f5224a&v=4',
      stats: { pulls: 3, merged: 3, issues: 2, comments: 3, rate: 22 },
    },
    {
      username: 'dinizo-v2',
      image:
        'https://avatars.githubusercontent.com/u/177033402?u=17fa8926bf617c8b8f4e8eb6aba6a98892e3dbe4&v=4',
      stats: { pulls: 0, merged: 0, issues: 0, comments: 1, rate: 1 },
    },
    {
      username: 'myllenaalves',
      image:
        'https://avatars.githubusercontent.com/u/21042186?u=e56f83f1f5ad0eaf46550afe6dca709b2899ffd3&v=4',
      stats: { pulls: 0, merged: 0, issues: 0, comments: 1, rate: 1 },
    },
    {
      username: 'kevinch',
      image:
        'https://avatars.githubusercontent.com/u/2573602?u=7ce617df54906dc3d4dab85291c390f26a1c5950&v=4',
      stats: { pulls: 2, merged: 1, issues: 0, comments: 1, rate: 8 },
    },
    {
      username: 'emersonlaurentino',
      image:
        'https://avatars.githubusercontent.com/u/10627086?u=56ea53389fac42c263ee78146d833b002f33c43c&v=4',
      stats: { pulls: 1, merged: 1, issues: 0, comments: 0, rate: 5 },
    },
    {
      username: 'anitavincent',
      image:
        'https://avatars.githubusercontent.com/u/8623116?u=d3d7497144ad5f12e204cc48b5a7f82bd6a250bc&v=4',
      stats: { pulls: 1, merged: 1, issues: 0, comments: 0, rate: 5 },
    },
    {
      username: 'SeanAverS',
      image:
        'https://avatars.githubusercontent.com/u/110581427?u=42b7c5f45f716b560ac30d6ea9fc3c5989202d10&v=4',
      stats: { pulls: 1, merged: 0, issues: 0, comments: 0, rate: 2 },
    },
    {
      username: 'phershbe',
      image:
        'https://avatars.githubusercontent.com/u/25594870?u=6635a7d95827737b4d9db03cbfd2ab9dcdf2da5b&v=4',
      stats: { pulls: 1, merged: 1, issues: 0, comments: 0, rate: 5 },
    },
  ],
  participants: 57,
  issues: 62,
  pulls: 20,
  merged: 17,
  comments: 88,
}

export function getWinners() {
  const winners = getContributors()
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
  return stats.participantsStats.filter(
    (participant) =>
      !maintainers.includes(participant.username) && participant.stats.rate > 0
  )
}
