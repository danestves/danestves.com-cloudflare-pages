// Dependencies
import dynamic from 'next/dynamic'

export const Hero = dynamic(() => import('./Hero'))
export const LatestVideos = dynamic(() => import('./LatestVideos'))
