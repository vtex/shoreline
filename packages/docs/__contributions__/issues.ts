interface Author {
  login: string
  avatarUrl: string
}

export interface Issue {
  assignees: { nodes: Omit<Author, 'avatarUrl'>[] }
  url: string
  number: number
  title: string
  createdAt: string
  author: Author
  state: string
  comments: { nodes: { author: Author }[] }
}

export const issuesOnFire: Issue[] = [
  {
    assignees: { nodes: [{ login: 'matheusps' }] },
    url: 'https://github.com/vtex/shoreline/issues/1537',
    number: 1537,
    title: 'Drawer',
    createdAt: '2024-04-02T20:34:35Z',
    author: {
      login: 'matheusps',
      avatarUrl:
        'https://avatars.githubusercontent.com/u/6964311?u=dab11b9f9e4b1b7eb66d86d0f4bf1e0c0d55d3bd&v=4',
    },
    state: 'OPEN',
    comments: {
      nodes: [
        {
          author: {
            login: 'davicostalf',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/8797476?u=209f606081b76c9e4afce6812d94ca789b213ed3&v=4',
          },
        },
        {
          author: {
            login: 'lafray',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/36760180?u=66a13423e65c88a3fc82201a20ba4282a1f5224a&v=4',
          },
        },
        {
          author: {
            login: 'lafray',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/36760180?u=66a13423e65c88a3fc82201a20ba4282a1f5224a&v=4',
          },
        },
        {
          author: {
            login: 'beatrizmilhomem',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/84085258?u=24adfd51781b0d3b86e4fff8f2aabcba8afaa7cc&v=4',
          },
        },
        {
          author: {
            login: 'lafray',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/36760180?u=66a13423e65c88a3fc82201a20ba4282a1f5224a&v=4',
          },
        },
        {
          author: {
            login: 'matheusps',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/6964311?u=dab11b9f9e4b1b7eb66d86d0f4bf1e0c0d55d3bd&v=4',
          },
        },
        {
          author: {
            login: 'matheusps',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/6964311?u=dab11b9f9e4b1b7eb66d86d0f4bf1e0c0d55d3bd&v=4',
          },
        },
        {
          author: {
            login: 'beatrizmilhomem',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/84085258?u=24adfd51781b0d3b86e4fff8f2aabcba8afaa7cc&v=4',
          },
        },
        {
          author: {
            login: 'beatrizmilhomem',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/84085258?u=24adfd51781b0d3b86e4fff8f2aabcba8afaa7cc&v=4',
          },
        },
        {
          author: {
            login: 'beatrizmilhomem',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/84085258?u=24adfd51781b0d3b86e4fff8f2aabcba8afaa7cc&v=4',
          },
        },
        {
          author: {
            login: 'felipepowlist',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/64273940?u=ef5500dc49b6caaaf57a0f81d887b8ce9d97d351&v=4',
          },
        },
        {
          author: {
            login: 'malu-viana',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/90862160?u=54e7a2458bc76b500106dfaea9c09ef0cc548fc8&v=4',
          },
        },
        {
          author: {
            login: 'elleenvs-d',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/175859727?u=dc01f450f095de3af29fbc2d16dc1c2bf3653861&v=4',
          },
        },
      ],
    },
  },
  {
    assignees: { nodes: [] },
    url: 'https://github.com/vtex/shoreline/issues/1504',
    number: 1504,
    title: 'Filter: `setValue` prop',
    createdAt: '2024-02-08T18:34:24Z',
    author: {
      login: 'rafarubim',
      avatarUrl:
        'https://avatars.githubusercontent.com/u/22064061?u=71df2ebc8b1459f453a7a7542f1a8cd8596b0af3&v=4',
    },
    state: 'OPEN',
    comments: {
      nodes: [
        {
          author: {
            login: 'matheusps',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/6964311?u=dab11b9f9e4b1b7eb66d86d0f4bf1e0c0d55d3bd&v=4',
          },
        },
        {
          author: {
            login: 'matheusps',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/6964311?u=dab11b9f9e4b1b7eb66d86d0f4bf1e0c0d55d3bd&v=4',
          },
        },
        {
          author: {
            login: 'rafarubim',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/22064061?u=71df2ebc8b1459f453a7a7542f1a8cd8596b0af3&v=4',
          },
        },
        {
          author: {
            login: 'rafarubim',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/22064061?u=71df2ebc8b1459f453a7a7542f1a8cd8596b0af3&v=4',
          },
        },
        {
          author: {
            login: 'matheusps',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/6964311?u=dab11b9f9e4b1b7eb66d86d0f4bf1e0c0d55d3bd&v=4',
          },
        },
        {
          author: {
            login: 'rafarubim',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/22064061?u=71df2ebc8b1459f453a7a7542f1a8cd8596b0af3&v=4',
          },
        },
      ],
    },
  },
  {
    assignees: { nodes: [] },
    url: 'https://github.com/vtex/shoreline/issues/1705',
    number: 1705,
    title: 'Search placeholder is not localizated',
    createdAt: '2024-07-05T15:32:10Z',
    author: {
      login: 'lafray',
      avatarUrl:
        'https://avatars.githubusercontent.com/u/36760180?u=66a13423e65c88a3fc82201a20ba4282a1f5224a&v=4',
    },
    state: 'OPEN',
    comments: {
      nodes: [
        {
          author: {
            login: 'lucasaarcoverde',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/20579226?u=22c79f6ca441ee1d933d5b59326348295b6a9844&v=4',
          },
        },
        {
          author: {
            login: 'lafray',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/36760180?u=66a13423e65c88a3fc82201a20ba4282a1f5224a&v=4',
          },
        },
        {
          author: {
            login: 'lucasaarcoverde',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/20579226?u=22c79f6ca441ee1d933d5b59326348295b6a9844&v=4',
          },
        },
        {
          author: {
            login: 'davicostalf',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/8797476?u=209f606081b76c9e4afce6812d94ca789b213ed3&v=4',
          },
        },
        {
          author: {
            login: 'beatrizmilhomem',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/84085258?u=24adfd51781b0d3b86e4fff8f2aabcba8afaa7cc&v=4',
          },
        },
      ],
    },
  },
  {
    assignees: { nodes: [{ login: 'felipepowlist' }] },
    url: 'https://github.com/vtex/shoreline/issues/1601',
    number: 1601,
    title: 'Adjust margins and paddings on filter popover',
    createdAt: '2024-05-02T10:30:39Z',
    author: {
      login: 'felipepowlist',
      avatarUrl:
        'https://avatars.githubusercontent.com/u/64273940?u=ef5500dc49b6caaaf57a0f81d887b8ce9d97d351&v=4',
    },
    state: 'OPEN',
    comments: {
      nodes: [
        {
          author: {
            login: 'matheusps',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/6964311?u=dab11b9f9e4b1b7eb66d86d0f4bf1e0c0d55d3bd&v=4',
          },
        },
        {
          author: {
            login: 'beatrizmilhomem',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/84085258?u=24adfd51781b0d3b86e4fff8f2aabcba8afaa7cc&v=4',
          },
        },
        {
          author: {
            login: 'felipepowlist',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/64273940?u=ef5500dc49b6caaaf57a0f81d887b8ce9d97d351&v=4',
          },
        },
        {
          author: {
            login: 'beatrizmilhomem',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/84085258?u=24adfd51781b0d3b86e4fff8f2aabcba8afaa7cc&v=4',
          },
        },
        {
          author: {
            login: 'felipepowlist',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/64273940?u=ef5500dc49b6caaaf57a0f81d887b8ce9d97d351&v=4',
          },
        },
      ],
    },
  },
]
