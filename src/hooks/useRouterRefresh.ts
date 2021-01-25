// Dependencies
import { useCallback } from 'react'
import { useRouter } from 'next/dist/client/router'

export default function useRouterRefresh(): () => void {
  const { asPath, ...router } = useRouter()
  const refresh = useCallback(() => router.replace(asPath), [asPath])

  return refresh
}
