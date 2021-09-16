// Dependencies
import dynamic from 'next/dynamic'

export * from './Alert'
export * from './ContentCard'
export * from './GeneralObserver'
export * from './GraphImage'
export * from './Link'
export * from './Logo'

export const Flag = dynamic(() => import('./Flag'), { ssr: false })
export const LanguageSwitcher = dynamic(() => import('./LanguageSwitcher'), {
  ssr: false,
})
export const Layout = dynamic(() => import('./Layout/Layout'), { ssr: false })
export const Search = dynamic(() => import('./Search/Search'), { ssr: false })
export const ThemeSwitcher = dynamic(() => import('./ThemeSwitcher'), {
  ssr: false,
})
export const Views = dynamic(() => import('./Views'), { ssr: false })
