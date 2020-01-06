import React from "react"
import { graphql } from "gatsby"

import { Layout, SEO } from "../components"

export default ({
  data: {
    site: {
      siteMetadata: { title },
    },
    first,
    second,
    third,
    fourth,
    five,
    sixth,
  },
}) => (
  <Layout>
    <SEO
      isTemplate
      title="Dayairis"
      description="Daya, quiero agradecerte por estos ya dos años que has estado junto a
        mi. Se que no ha sido fácil, hemos tenido miles de peleas, muchas
        molestias; pero a pesar de todo eso aún seguimos juntos."
    />

    <div className="container py-5">
      <h2 className="text-3xl text-center">
        Hola amor{" "}
        <span role="img" aria-label="Love face">
          🥰
        </span>
        , tal vez te estés preguntando{" "}
        <span className="italic font-bold">"¿Y esto qué es?"</span> Pues sigue
        viendo la página y encontrarás la respuesta{" "}
        <span role="img" aria-label="Fingers pointing down">
          👇👇
        </span>
      </h2>

      <div className="flex flex-wrap items-center justify-center py-5">
        <div className="w-full px-2 my-2 md:w-1/2">
          <img
            src={first.publicURL}
            alt={title}
            className="block object-cover w-full max-w-sm mx-auto rounded-lg shadow-md dark:shadow-white-md"
            style={{ height: 400, maxWidth: 400 }}
          />
        </div>
        <div className="w-full px-2 my-2 md:w-1/2">
          <p className="mb-6 text-lg text-center">
            Esta fue la primera foto juntos que nos tomamos después de conocer a
            tu familia formalmente, donde me presentaste como tu novio.
          </p>

          <p className="mb-6 text-lg text-center">
            De verdad que a pesar de todos los problemas que han pasado y los
            momentos malos no puedo decir que he dejado de amarte, y no lo voy a
            hacer. Ese día marcó el punto de partida de lo que hoy somos tu y
            yo.
          </p>

          <h2 className="text-4xl font-bold leading-none text-center">
            25/09/2017{" "}
            <span role="img" aria-label="Two hearts">
              💕
            </span>
          </h2>
          <h3 className="text-xl text-center">
            Una fecha para no olvidar{" "}
            <span role="img" aria-label="Smiling face">
              😊
            </span>
          </h3>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center py-5">
        <div className="order-2 w-full px-2 my-2 md:w-1/2 md:order-1">
          <p className="mb-6 text-lg text-center">
            Avanzamos rápidamente a un acontecimiento demasiado importante en tu
            vida:
          </p>

          <h2 className="mb-6 text-5xl text-center">
            Tu graduación{" "}
            <span role="img" aria-label="Graduation woman">
              👩‍🎓
            </span>
          </h2>

          <p className="text-lg text-center">
            El hecho de que me hayas permitido haber estado contigo como pareja
            y en ese acontecimiento tan importante para ti me hizo sentir una
            persona muy especial en tu vida, aún me siento de esta manera y
            nunca quiero dejar de sentirme así.
          </p>
        </div>
        <div className="order-1 w-full px-2 my-2 md:w-1/2 md:order-2">
          <img
            src={second.publicURL}
            alt={title}
            className="block object-cover object-top w-full max-w-sm mx-auto rounded-lg shadow-md dark:shadow-white-md"
            style={{ height: 400, maxWidth: 400 }}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center py-5">
        <h2 className="w-full mb-6 text-2xl text-center">
          Las salidas contigo que espero nunca falten{" "}
          <span role="img" aria-label="Hands up">
            🙌
          </span>
          :
        </h2>

        <div className="w-full px-2 my-2 xs:w-1/2 md:w-1/3">
          <img
            src={third.publicURL}
            alt={title}
            className="block object-cover object-top w-full max-w-sm mx-auto rounded-lg shadow-md dark:shadow-white-md"
            style={{ height: 400, maxWidth: 400 }}
          />
        </div>

        <div className="w-full px-2 my-2 xs:w-1/2 md:w-1/3">
          <img
            src={fourth.publicURL}
            alt={title}
            className="block object-cover object-top w-full max-w-sm mx-auto rounded-lg shadow-md dark:shadow-white-md"
            style={{ height: 400, maxWidth: 400 }}
          />
        </div>

        <div className="w-full px-2 my-2 xs:w-1/2 md:w-1/3">
          <img
            src={five.publicURL}
            alt={title}
            className="block object-cover object-top w-full max-w-sm mx-auto rounded-lg shadow-md dark:shadow-white-md"
            style={{ height: 400, maxWidth: 400 }}
          />
        </div>

        <h2 className="w-full my-6 text-2xl text-center">
          Aún faltan muchas más fotos. Pero quiero decirte que no quiero que
          acaben las salidas, <b>no quiero</b> que acaben las sonrisas y no
          quiero que acabe este amor que siento por ti.
        </h2>
      </div>

      <div className="flex flex-wrap items-center justify-center py-5">
        <div className="w-full px-2 my-2 md:w-1/2">
          <img
            src={sixth.publicURL}
            alt={title}
            className="block object-cover object-top w-full max-w-sm mx-auto rounded-lg shadow-md dark:shadow-white-md"
            style={{ height: 400, maxWidth: 400 }}
          />
        </div>

        <div className="w-full px-2 my-2 md:w-1/2">
          <h2 className="mb-6 text-4xl text-center">
            Mi logro más reciente, mi graduación{" "}
            <span role="img" aria-label="Graduation man">
              👨‍🎓
            </span>
          </h2>

          <p className="mb-6 text-center">
            Estuviste ahí desde principio a fin junto con mi mamá y mi familia
            me apoyaste en todo lo que me propuse. Eso se tradujo recientemente
            a este logro tan importante como lo es haberme graduado de TSU en
            Informática.
          </p>

          <p className="mb-6 text-center">
            Quiero agradecerte tanto a ti como a mi mamá y mi familia que me
            apoyaron en todo momento y que a pesar de que yo no quería me
            ayudaron a darme cuenta que es un título, es mi esfuerzo y esos
            resultados los voy a ver en toda mi vida.
          </p>

          <p className="mb-6 text-center">
            También como acotación al párrafo de arriba, gracias por apoyarme en
            decidir si seguir o no estudiando la ingeniería{" "}
            <span role="img" aria-label="Joy face">
              😅
            </span>
            .
          </p>
        </div>
      </div>

      <hr className="my-6" />

      <p className="max-w-md mx-auto mb-6 text-center">
        Daya, quiero agradecerte por estos ya dos años que has estado junto a
        mi. Se que no ha sido fácil, hemos tenido miles de peleas, muchas
        molestias; pero a pesar de todo eso aún seguimos juntos.
      </p>

      <p className="max-w-md mx-auto mb-6 text-center">
        Se que hay veces en que dices{" "}
        <span className="italic font-bold">
          "Verga, ya no quiero seguir siento que no me ama"
        </span>
        , pero todo lo contrario, creeme que te amo más desde la primera vez,
        cada día mi amor aumenta hacia ti, a pesar de que las cosas estén
        difíciles eso no significa que te voy a dejar de amar o voy a dejar la
        relación asi.
      </p>

      <p className="max-w-md mx-auto mb-6 text-center">
        Ambos requerimos mucha paciencia para estar juntos{" "}
        <span role="img" aria-label="Joy faces">
          🤣🤣
        </span>
        , pero aquí estamos a pesar de todo, dos años y aún no me puedo creer
        que sigas siendo mi novia{" "}
        <span role="img" aria-label="Monkey face">
          🙈
        </span>
        .
      </p>

      <h2 className="text-xl text-center">
        Daya, mi amor, quiero desearte un feliz aniversario y decirte que...
      </h2>

      <h2 className="text-4xl text-center">
        TE AMOOOOO{" "}
        <span role="img" aria-label="Hearts">
          💕💞💘
        </span>
      </h2>
    </div>
  </Layout>
)

export const query = graphql`
  query Dayairis {
    site {
      siteMetadata {
        title
      }
    }

    first: file(relativePath: { eq: "dayairis/1.jpg" }) {
      publicURL
    }

    second: file(relativePath: { eq: "dayairis/2.jpg" }) {
      publicURL
    }

    third: file(relativePath: { eq: "dayairis/3.jpg" }) {
      publicURL
    }

    fourth: file(relativePath: { eq: "dayairis/4.jpg" }) {
      publicURL
    }

    five: file(relativePath: { eq: "dayairis/5.jpg" }) {
      publicURL
    }

    sixth: file(relativePath: { eq: "dayairis/6.jpg" }) {
      publicURL
    }
  }
`
