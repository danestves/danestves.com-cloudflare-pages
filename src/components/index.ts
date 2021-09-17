// Dependencies
import dynamic from 'next/dynamic'

export * from './Alert'
export * from './ContentCard'
export * from './GeneralObserver'
export * from './GraphImage'
export * from './Link'
export * from './Logo'

export const Flag = dynamic(() => import('./Flag'))
export const LanguageSwitcher = dynamic(() => import('./LanguageSwitcher'))
export const Layout = dynamic(() => import('./Layout/Layout'))
export const Search = dynamic(() => import('./Search/Search'))
export const ThemeSwitcher = dynamic(() => import('./ThemeSwitcher'))
export const Views = dynamic(() => import('./Views'))
