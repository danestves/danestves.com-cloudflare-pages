// Dependencies
import Image from 'next/image'
import { useRouter } from 'next/router'

// Internals
import { Link } from '@/components'
import { YoutubeIcon } from '@/components/Icons'
import { fromNow } from '@/utils'
import type { Videos } from '@/interfaces'

export const LatestVideos = (props: Videos): JSX.Element => {
  const router = useRouter()

  return (
    <section
      className="relative w-full pl-4 mt-5 lg:mt-0 lg:px-4"
      id="danestves-section-latest-videos"
    >
      <h2 className="w-full max-w-[977px] mx-auto text-[26px] font-black text-[#071D49] uppercase lg:pl-8">
        <span>últimos vídeos</span>{' '}
        <YoutubeIcon className="inline-block w-8 h-[22px] ml-3" />
      </h2>

      <div className="overflow-x-auto">
        <div className="w-[977px] mt-3 mx-auto p-5 bg-secondary/80 rounded-[20px] backdrop-blur-sm lg:py-8 lg:px-12">
          <ul className="grid grid-cols-4 gap-5">
            {props.items?.map((video) => (
              <li key={video.id}>
                <Link
                  className="block"
                  href={`/youtube/${video.id}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="relative overflow-hidden rounded-xl aspect-w-16 aspect-h-9">
                    <div className="absolute">
                      <Image
                        alt={video.snippet?.title || 'YouTube Video'}
                        className="absolute"
                        height={
                          video.snippet?.thumbnails?.medium?.height as number
                        }
                        loading="lazy"
                        objectFit="cover"
                        objectPosition="center"
                        src={video.snippet?.thumbnails?.medium?.url as string}
                        width={
                          video.snippet?.thumbnails?.medium?.width as number
                        }
                      />
                    </div>
                  </div>
                  <h3 className="text-xs font-bold text-white sr-only font-roboto lg:line-clamp-2 lg:not-sr-only lg:mt-3">
                    {video.snippet.title}
                  </h3>
                  <p className="text-xs font-bold text-white sr-only font-roboto lg:not-sr-only lg:mt-2">
                    {video.statistics.viewCount} views •{' '}
                    {fromNow({
                      date: video.snippet.publishedAt,
                      locale: router.locale,
                    })}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default LatestVideos
