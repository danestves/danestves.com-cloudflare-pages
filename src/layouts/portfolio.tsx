// Dependencies
import * as React from 'react'
import Image from 'next/image'
import { BiLinkExternal } from 'react-icons/bi'

// Components
import { SEO } from '@/components'

// Interfaces
import { FrontMatterPortfolio } from '@/interfaces'

interface Props {
  frontMatter: FrontMatterPortfolio
  children: React.ReactNode
}

export default function PortfolioLayout({ frontMatter, children }: Props): JSX.Element {
  return (
    <>
      <SEO
        title={frontMatter.seotitle}
        description={frontMatter.summary}
        shareImage={`https://danestves.com${frontMatter.og}`}
        additionalMetaTags={[
          {
            name: 'twitter:image',
            content: `https://danestves.com${frontMatter.og}`,
          },
        ]}
      />

      <div className="container px-5 py-16 space-y-16">
        <h1 className="mb-10 text-4xl text-center text-white sm:text-5xl md:text-6xl">
          {frontMatter.title}
        </h1>

        <div className="flex w-full max-w-screen-lg mx-auto overflow-hidden rounded-lg">
          <Image
            src={frontMatter.image}
            alt={frontMatter.title}
            width={1888}
            height={1180}
            className="h-full"
          />
        </div>

        <div className="grid max-w-screen-md grid-cols-1 p-5 mx-auto bg-secondary-900 md:grid-cols-3 rounded-xl">
          <div>
            <h2 className="mb-2 font-semibold text-center text-white underline">Industria</h2>
            <p className="text-sm text-center text-white">{frontMatter.industry}</p>
          </div>
          <div>
            <h2 className="mb-2 font-semibold text-center text-white underline">Tecnologías</h2>
            <p className="text-sm text-center text-white">{frontMatter.technologies.join(', ')}</p>
          </div>
          <div>
            <h2 className="mb-2 font-semibold text-center text-white underline">Sitio Web</h2>
            <div className="flex justify-center">
              <a
                href={frontMatter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-sm underline focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary focus:outline-none text-primary"
              >
                <span>Ver</span>
                <BiLinkExternal className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-screen-md mx-auto">
          <div className="max-w-full prose prose-lg">{children}</div>
        </div>
      </div>
    </>
  )
}

// const DynamicPortfolio: NextPage<Props> = ({ portfolio }) => {
//   const router = useRouter()

//   if ((!router.isFallback && !portfolio) || !portfolio) {
//     return <ErrorPage statusCode={404} />
//   }

//   // Loading screen (only possible in preview mode)
//   if (router.isFallback) {
//     return <div className="container">Loading...</div>
//   }

//   return (
//     <>
//       <SEO
//         title={portfolio.seo?.title as string}
//         description={portfolio.seo?.description as string}
//         shareImage={portfolio.seo?.image as any}
//         additionalMetaTags={[
//           {
//             name: 'twitter:image',
//             content: portfolio.seo?.image?.url as string,
//           },
//         ]}
//       />

//       <div className="container px-5 py-16 space-y-16">
//         <h1 className="mb-10 text-4xl text-center text-white sm:text-5xl md:text-6xl">
//           {portfolio.title}
//         </h1>

//         <div className="w-full max-w-screen-lg mx-auto overflow-hidden rounded-lg">
//           <Image
//             image={{
//               handle: portfolio.cover.handle,
//               width: portfolio.cover.width || 0,
//               height: portfolio.cover.height || 0,
//             }}
//             maxWidth={1200}
//             outerWrapperClassName="w-full"
//             alt={portfolio.title}
//           />
//         </div>

//         <div className="grid items-center max-w-screen-md grid-cols-1 p-5 mx-auto bg-white md:grid-cols-3 rounded-xl bg-opacity-20">
//           <div>
//             <h2 className="font-semibold text-center text-white">Industria</h2>
//             <p className="text-lg text-center text-white">{portfolio.industry}</p>
//           </div>
//           <div>
//             <h2 className="font-semibold text-center text-white">Tecnologías</h2>
//             <p className="text-lg text-center text-white">{portfolio.technologies.join(', ')}</p>
//           </div>
//           <div>
//             <h2 className="font-semibold text-center text-white">Sitio Web</h2>
//             <div className="flex justify-center">
//               <a
//                 href={portfolio.external_url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center space-x-1 text-lg underline focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary focus:outline-none text-primary"
//               >
//                 <span>Ver</span>
//                 <BiLinkExternal className="w-4 h-4" />
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-screen-md mx-auto">
//           <Markdown markdown={portfolio.content} />
//         </div>
//       </div>
//     </>
//   )
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   const slugs = await getAllPortfoliosWithSlug()

//   const paths = slugs?.map(({ slug }) => {
//     return {
//       params: { slug },
//     }
//   })

//   return {
//     paths: paths || [],
//     fallback: true,
//   }
// }

// export const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
//   const portfolio = await getPortfolio(params?.slug as string, preview)

//   return {
//     props: {
//       preview,
//       portfolio,
//     },
//   }
// }
