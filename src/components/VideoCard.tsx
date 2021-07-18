// Dependencies
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useWebPSupportCheck } from 'react-use-webp-support-check'

// Internals
import { fromNow } from '@/utils'
import type { YouTubeVideo } from '@/interfaces'

export const VideoCard = ({
  id,
  snippet,
  statistics,
}: YouTubeVideo): JSX.Element => {
  const router = useRouter()
  const supportsWebP = useWebPSupportCheck()

  const imageUrl = supportsWebP
    ? snippet?.thumbnails?.medium?.url
        ?.replace('vi/', 'vi_webp/')
        .replace('.jpg', '.webp')
    : snippet?.thumbnails?.medium?.url

  return (
    <div className="relative font-roboto">
      <span className="sr-only">See {snippet?.title} on YouTube</span>

      <div className="relative flex-none block w-full">
        <a
          className="block h-full mx-auto overflow-hidden no-underline cursor-pointer"
          href={`https://www.youtube.com/watch?v=${id}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            alt={snippet?.title || 'YouTube Video'}
            height={snippet?.thumbnails?.medium?.height as number}
            loading="lazy"
            src={imageUrl as string}
            width={snippet?.thumbnails?.medium?.width as number}
          />
        </a>
      </div>

      <div className="relative flex flex-row mx-3 cursor-pointer">
        <div className="overflow-x-hidden">
          <h3 className="mt-3 mb-[6px]">
            <a
              className="block no-underline cursor-pointer"
              href={`https://www.youtube.com/watch?v=${id}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="max-h-[40px] leading-[20px] text-[14px] font-medium font-roboto text-black overflow-ellipsis line-clamp-2 whitespace-normal dark:text-white">
                {snippet?.title}
              </span>
            </a>
          </h3>

          <div className="font-normal font-roboto leading-[18px] text-[14px] max-w-full overflow-hidden max-h-[36px] flex flex-wrap text-[#606060] dark:text-[#aaaaaa]">
            <span className="inline-block">{statistics?.viewCount} views</span>
            <span className="inline-block mx-[4px]">•</span>
            <div className="inline-block">
              {fromNow(snippet?.publishedAt, router.locale)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
