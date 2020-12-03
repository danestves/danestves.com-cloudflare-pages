// Interfaces
import { Blog } from '@/interfaces'

export type scale = {
  x: string | number
  y: string | number
  scaleY: string | number
  scaleX: string | number
}

export type TitleT = {
  title: string
  isSelected: boolean
}

export type ImageProps = {
  id: string
  isSelected: boolean
  pointOfInterest: number
  backgroundColor: string
}

export type CardData = Blog
