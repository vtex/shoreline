import { Octokit } from '@octokit/rest'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = { data: Contributor[]; message?: string }

const owner = 'vtex'
const repo = 'shoreline'

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const octokit = new Octokit()

  try {
    const { data: contributors } = await octokit.repos.listContributors({
      owner,
      repo,
      per_page: 100,
    })

    const formattedContributors = contributors.map((contributor) => {
      return {
        name: contributor.name ?? '',
        image: contributor.avatar_url ?? '',
        username: contributor.login ?? '',
      }
    })

    res.status(200).json({
      data: formattedContributors.filter(
        (contributor) =>
          contributor.username && isHumanContributor(contributor.username)
      ),
    })
  } catch (error) {
    console.log({ error })
    res.status(500).json({ message: 'Something went wrong', data: [] })
  }
}

interface Contributor {
  name: string
  image: string
  username: string
}

function isHumanContributor(username: string) {
  return (
    username !== 'dependabot[bot]' &&
    username !== 'renovate[bot]' &&
    username !== 'vtexgithubbot'
  )
}
