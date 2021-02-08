// Dependencies
import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'

// Components
import { Link, BlogCard } from '@/components'

// Interfaces
import { FrontMatterPost } from '@/interfaces'

// Libraries
import { getAllFilesFrontMatter } from '@/lib/mdx'

interface Props {
  posts: FrontMatterPost[]
}

const Index: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <div className="relative flex items-center py-32 lg:py-20">
        <div className="absolute top-0 left-0 w-full h-full bg-secondary">
          <Image
            src="/hero.webp"
            alt="Daniel Esteves - Programador web fullstack en JavaScript"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
          <div className="absolute inset-0 bg-opacity-75 bg-secondary" />
        </div>
        <div className="container z-20 grid items-center grid-cols-12 px-5">
          <div className="col-span-12 md:col-span-5">
            <svg
              viewBox="0 0 1080 1080"
              className="w-48 h-48 mx-auto mb-4 md:mb-0 md:w-56 lg:w-64 md:h-56 lg:h-64 text-primary"
            >
              <path
                d="M1061.237 540.246c-.105 288.558-237.61 520.991-526.204 520.991H207.654A188.891 188.891 0 0118.763 872.346V705.883a23.728 23.728 0 0123.71-23.727h24.166a46.911 46.911 0 0146.894 46.929V872.24a94.209 94.209 0 0094.226 94.226h327.608c235.697 0 430.275-189.278 431.1-424.975C967.292 305.25 776.013 113.533 540 113.533H207.76a94.226 94.226 0 00-94.227 94.191v143.227a46.911 46.911 0 01-46.894 46.893H42.473a23.71 23.71 0 01-23.71-23.692V207.654A188.927 188.927 0 01207.654 18.763H540c287.944 0 521.36 233.416 521.237 521.483z"
                id="prefix__path3982"
                fill="currentColor"
                strokeWidth={1.755}
              />
              <path
                d="M871.696 542.527c-1.368 182.907-152.984 329.17-335.855 329.17H255.232a46.929 46.929 0 01-46.928-46.894V706.04a23.886 23.886 0 0123.868-23.885h46.77a24.114 24.114 0 0124.132 24.149v58.582a12.04 12.04 0 0012.04 12.039h221.885c130.625 0 238.927-104.458 239.927-235.066A236.926 236.926 0 00540 303.074H315.113a12.04 12.04 0 00-12.039 12.04v58.599a24.131 24.131 0 01-24.131 24.131h-46.771a23.903 23.903 0 01-23.868-23.85V255.232a46.946 46.946 0 0146.928-46.928H540c184.065 0 333.1 149.877 331.696 334.223z"
                id="prefix__path3984"
                fill="currentColor"
                strokeWidth={1.755}
              />
              <path
                d="M587.385 542.352c-1.228 25.482-23.201 45.033-48.701 45.033H42.332a23.552 23.552 0 01-23.57-23.534v-47.649a23.552 23.552 0 0123.57-23.587h497.651a47.385 47.385 0 0147.402 49.737z"
                id="prefix__path3986"
                fill="currentColor"
                strokeWidth={1.755}
              />
            </svg>
          </div>
          <div className="col-span-12 md:col-span-7">
            <h1 className="mb-2 text-6xl font-bold leading-none text-center md:text-left text-primary">
              Daniel Esteves
            </h1>
            <h2 className="font-mono text-xl text-center md:text-left text-primary">
              Desarrollador Web Frontend
            </h2>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="container relative z-10 px-5 pb-32 -mt-24">
          <div className="z-30 w-48 h-48 mx-auto border-white rounded-full border-10">
            <Image
              src="/me.jpg"
              alt="Daniel Esteves"
              width={192}
              height={192}
              className="rounded-full"
            />
          </div>

          <h2 className="mt-4 font-mono text-4xl text-center">{`<Hola Mundo />`}</h2>

          <p className="max-w-4xl px-5 mx-auto mt-4 font-mono text-xl text-center">
            Siempre he estado interesado en cómo funciona la tecnología y todo lo que la conforma.
            Desde cómo los personajes se mueven dentro de los videojuegos, hasta el funcionamiento
            de las redes sociales y los sitios web.
          </p>

          <p className="max-w-4xl px-5 mx-auto mt-8 font-mono text-xl text-center">
            Es por eso que decidí convertirme en programador fullstack. Capaz de construir
            aplicaciones, desde la parte visual hasta las bases de datos.
          </p>

          <div className="flex justify-center max-w-4xl mx-auto mt-5">
            <Link
              href="/sobre-mi"
              className="block px-5 py-2 rounded-full bg-secondary text-primary"
            >
              ¡Conóceme más!
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full py-12">
        <div className="container max-w-screen-xl px-5">
          <h2 className="text-3xl font-bold text-center text-primary">Últimos posts:</h2>

          <div className="gap-6 mt-24 md:grid md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full py-12 bg-primary">
        <div className="max-w-4xl px-5 mx-auto">
          <h2 className="text-3xl font-bold text-center text-secondary">
            Manejo de tecnologías como:
          </h2>

          <div className="grid grid-cols-2 gap-8 mt-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto">
                <Image src="/static/react.svg" width={128} height={128} alt="React logo" />
              </div>
              <h2 className="font-mono text-xl font-bold text-secondary">
                React / NextJS / Gatsby
              </h2>
            </div>
            <div className="text-center">
              <div className="mx-auto">
                <Image src="/static/nodejs.svg" width={128} height={128} alt="NodeJS logo" />
              </div>
              <h2 className="font-mono text-xl font-bold text-secondary">NodeJS</h2>
            </div>
            <div className="text-center">
              <div className="mx-auto">
                <Image src="/static/graphql.svg" width={128} height={128} alt="GraphQL logo" />
              </div>
              <h2 className="font-mono text-xl font-bold text-secondary">GraphQL</h2>
            </div>
            <div className="text-center">
              <div className="mx-auto">
                <Image src="/static/wordpress.svg" width={128} height={128} alt="WordPress logo" />
              </div>
              <h2 className="font-mono text-xl font-bold text-secondary">WordPress</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllFilesFrontMatter('blog')
  const sortedPosts = posts.sort((a: FrontMatterPost, b: FrontMatterPost) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })

  return {
    props: {
      posts: sortedPosts.slice(0, 3),
    },
  }
}

export default Index
