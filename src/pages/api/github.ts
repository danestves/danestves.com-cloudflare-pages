// Dependencies
import { NextApiRequest, NextApiResponse } from 'next'

// Utils
import { contains } from '@/utils'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'GET') {
    const user = await fetch('https://api.github.com/users/danestves', {
      headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
    }).then((res) => res.json())
    const repositories = await fetch('https://api.github.com/users/danestves/repos?per_page=100', {
      headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
    }).then((res) => res.json())

    const includes = ['notes', 'designcodeweb', 'danestves', 'github-readme-stats']
    const mine = repositories.filter((repo: any) => !repo.fork && !contains(repo.name, includes))
    const stars = mine.reduce((accumulator: any, repository: any) => {
      return accumulator + repository['stargazers_count']
    }, 0)

    res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600')

    return res.status(200).json({
      repositories: mine,
      followers: user.followers,
      stars,
    })
  }

  return res.status(400).send('Method not allowed')
}
