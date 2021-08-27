// Dependencies
import dynamic from 'next/dynamic'

export const Flag = dynamic(() => import('./Flag'))
export const LanguageSwitcher = dynamic(() => import('./LanguageSwitcher'))
export const Layout = dynamic(() => import('./Layout/Layout'))
export const Link = dynamic(() => import('./Link'))
export const LocalImage = dynamic(() => import('./LocalImage'))
export const Logo = dynamic(() => import('./Logo/Logo'))
export const Rings = dynamic(() => import('./Logo/Rings'))
export const Search = dynamic(() => import('./Search'))
export const ThemeSwitcher = dynamic(() => import('./ThemeSwitcher'))
