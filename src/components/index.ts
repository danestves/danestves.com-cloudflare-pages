// Dependencies
import dynamic from 'next/dynamic'

export * from './Link'
export * from './Logo'
export * from './Seo'

export const Alert = dynamic(() => import('./Alert'))
export const ContentCard = dynamic(() => import('./ContentCard'))
export const Flag = dynamic(() => import('./Flag'))
export const GeneralObserver = dynamic(() => import('./GeneralObserver'))
export const GraphImage = dynamic(() => import('./GraphImage/GraphImage'))
export const LanguageSwitcher = dynamic(() => import('./LanguageSwitcher'))
export const Layout = dynamic(() => import('./Layout/Layout'))
export const Search = dynamic(() => import('./Search/Search'))
export const ThemeSwitcher = dynamic(() => import('./ThemeSwitcher'))
export const Views = dynamic(() => import('./Views'))
