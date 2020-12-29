// Interfaces
import { Repository } from '@/interfaces'

// Lib
import axios from '@/lib/axios'

/**
 * Get GitHub repositories with all the information needed
 */
export const getRepositories = async (): Promise<Repository[]> => {
  const personalRepositories: Repository[] = await axios
    .get('https://api.github.com/users/danestves/repos?per_page=50', {
      headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
    })
    .then(({ data: repositories }: { data: Repository[] }): Repository[] => {
      return repositories
        .sort((a, b) => {
          // eslint-disable-next-line
          // @ts-ignore
          return new Date(b.created_at) - new Date(a.created_at)
        })
        .filter((repository: Repository) => {
          switch (repository.id) {
            case 250953618:
              return repository
            case 252873798:
              return repository
            case 315161253:
              return repository
            case 321155009:
              return repository
            case 245557075:
              return repository
            case 324420971:
              return repository
            case 324068819:
              return repository
            case 323531066:
              return repository
            case 228873079:
              return repository
            default:
              return null
          }
        })
    })

  const organizationRepositories: Repository[] = await axios
    .get('https://api.github.com/users/opengraphimg/repos?per_page=50', {
      headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
    })
    .then(({ data: repositories }: { data: Repository[] }): Repository[] => {
      return repositories
        .sort((a, b) => {
          // eslint-disable-next-line
        // @ts-ignore
          return new Date(b.created_at) - new Date(a.created_at)
        })
        .filter((repository: Repository) => {
          switch (repository.id) {
            case 305029123:
              return repository
            case 304374767:
              return repository
            default:
              return null
          }
        })
    })

  return [...organizationRepositories, ...personalRepositories]
}
