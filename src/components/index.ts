// Dependencies
import dynamic from 'next/dynamic'

export * from './Layout'
export * from './Views'

export const Alert = dynamic(() => import('./Alert').then((mod) => mod.Alert), {
  ssr: false,
})
export const ContentCard = dynamic(() => import('./ContentCard'), {
  ssr: false,
})
export const Flag = dynamic(() => import('./Flag'))
export const GeneralObserver = dynamic(() => import('./GeneralObserver'), {
  ssr: false,
})
export const LanguageSwitcher = dynamic(() => import('./LanguageSwitcher'))
export const Link = dynamic(() => import('./Link'))
export const LocalImage = dynamic(() => import('./LocalImage'))
export const Logo = dynamic(() => import('./Logo/Logo'))
export const Rings = dynamic(() => import('./Logo/Rings'))
export const Search = dynamic(() => import('./Search'))
export const ThemeSwitcher = dynamic(() => import('./ThemeSwitcher'))
