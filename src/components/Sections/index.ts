// Dependencies
import dynamic from 'next/dynamic'

export const Hero = dynamic(() => import('./Hero'))
export const LatestPosts = dynamic(() => import('./LatestPosts'))
export const LatestVideos = dynamic(() => import('./LatestVideos'))
