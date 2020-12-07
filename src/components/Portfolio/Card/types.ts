// Interfaces
import { Asset } from '@/interfaces'

export type scale = {
  x: string | number
  y: string | number
  scaleY: string | number
  scaleX: string | number
}

export type TitleT = {
  title: string
  category: string
  isSelected: boolean
}

export type ImageProps = {
  image: Asset
  title: string
  isSelected: boolean
  pointOfInterest?: number
  backgroundColor?: string
}

export type CardData = any
