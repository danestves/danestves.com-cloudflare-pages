// Dependencies
import endent from 'endent';
import type { SEOHandle } from '@balavishnuvj/remix-seo';
import type { MetaFunction } from '@remix-run/server-runtime';

// Internals
import { BlurrableImage } from '~/components/blurrable-image';
import { getImageBuilder, getImgProps, images } from '~/images';
import { getSeoMeta } from '~/utils/seo';

export let handle: SEOHandle = {
  getSitemapEntries: () => null,
};

export let meta: MetaFunction = () => {
  let title = 'María Emilia Marcano Mora, ¿quieres ser mi novia?';
  let description = endent`
    Hola cariño, hice este regalo porque quiero expresarte a mi manera lo que yo siento por ti.
  `;
  let og = getImgProps(getImageBuilder(images.ogMaria.id, images.ogMaria.alt), {
    sizes: ['1280px'],
    widths: [1280],
  }).src;

  return {
    ...getSeoMeta({
      title: title,
      description: description,
      openGraph: {
        images: [
          {
            alt: title,
            url: og,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        image: {
          alt: title,
          url: og,
        },
      },
    }),
    robots: 'noindex,nofollow',
    googlebot: 'noindex,nofollow',
  };
};

export default function MariaPage() {
  return (
    <main className="pt-32">
      <h1 className="text-center text-4xl font-bold text-primary">
        Hola, Cariño
      </h1>

      <div className="container mt-6 max-w-md space-y-4 text-justify text-[#989898] dark:text-[#B1B1B1]">
        <p>
          Hice este regalo porque quiero expresarte a mi manera lo que yo siento
          por ti.
        </p>
        <p>
          En este punto ya sabes bien lo mucho que te quiero y lo mucho que te
          adoro, pero quiero que exploremos desde el primer momento en que
          empezamos a hablar, ¿te parece? 💙
        </p>

        <BlurrableImage
          img={
            <img
              className="rounded-[18px]"
              {...getImgProps(
                getImageBuilder(images.firstChat.id, images.firstChat.alt),
                {
                  widths: [328],
                  sizes: ['(min-width: 768px) 328px'],
                }
              )}
              height={455}
              width={328}
            />
          }
        />

        <p>
          17 de octubre de 2021, nuestro primer chat. Empezamos a hablar por
          responderte una historia sobre una publicidad de tu tienda en TikTok,
          ¿quieres que te diga algo? Me costó un mundo poder hacerlo, pero me
          gustó mucho y me encantó.
        </p>

        <BlurrableImage
          img={
            <img
              className="rounded-[18px]"
              {...getImgProps(
                getImageBuilder(
                  images.firstWhatsappChat.id,
                  images.firstWhatsappChat.alt
                ),
                {
                  widths: [828],
                  sizes: ['(min-width: 768px) 828px'],
                }
              )}
              height={1792}
              width={828}
            />
          }
        />

        <p>
          29 de octubre de 2021, nuestro segundo chat por WhatsApp. Ese día muy
          ilusionado porque obtuve tu número, la persona que me llamaba la
          atención.
        </p>

        <p>
          Después de mucho hablar, compartir fotos lindas, conocernos un poco
          más; ya en enero sabíamos que ambos nos atraíamos, pero nunca dijimos
          nada.
        </p>

        <hr />

        <p>
          Luego de hablar bastante y tratar de concretar algo el 30 de enero de
          2021 fue nuestra primera cita, fuimos al cine y fue una experiencia
          maravillosa.
        </p>

        <BlurrableImage
          img={
            <img
              className="rounded-[18px]"
              {...getImgProps(
                getImageBuilder(images.firstDate1.id, images.firstDate1.alt),
                {
                  widths: [504],
                  sizes: ['(min-width: 768px) 504px'],
                }
              )}
              height={378}
              width={504}
            />
          }
        />

        <BlurrableImage
          img={
            <img
              className="rounded-[18px]"
              {...getImgProps(
                getImageBuilder(images.firstDate2.id, images.firstDate2.alt),
                {
                  widths: [504],
                  sizes: ['(min-width: 768px) 504px'],
                }
              )}
              height={378}
              width={504}
            />
          }
        />

        <BlurrableImage
          img={
            <img
              className="rounded-[18px]"
              {...getImgProps(
                getImageBuilder(images.firstDate3.id, images.firstDate3.alt),
                {
                  widths: [504],
                  sizes: ['(min-width: 768px) 504px'],
                }
              )}
              height={378}
              width={504}
            />
          }
        />

        <p>
          Ese día ambos estábamos muy nerviosos, ¿pero sabes que paso ese día?
          Fue el día en el que nos agarramos de manos, y nos sentimos muy
          felices. A pesar de que estabas tan nerviosa, creo que te pude
          transmitir mi calma y la tranquilidad que tenía yo.
        </p>

        <p>
          Luego de eso nuestras conversaciones fueron incrementando aún más,
          empezamos a tener un poco más de confianza el uno del otro y empezamos
          a hablar de todo lo que nos pasó.
        </p>

        <hr />

        <p>
          Poco después, el 20 de febrero de 2021, nuestra segunda cita, el día
          que conocia a la locura de Tina 😂.
        </p>

        <BlurrableImage
          img={
            <img
              className="rounded-[18px]"
              {...getImgProps(
                getImageBuilder(images.secondDate1.id, images.secondDate1.alt),
                {
                  widths: [579],
                  sizes: ['(min-width: 768px) 579px'],
                }
              )}
              height={772}
              width={579}
            />
          }
        />
        <BlurrableImage
          img={
            <img
              className="rounded-[18px]"
              {...getImgProps(
                getImageBuilder(images.secondDate2.id, images.secondDate2.alt),
                {
                  widths: [579],
                  sizes: ['(min-width: 768px) 579px'],
                }
              )}
              height={772}
              width={579}
            />
          }
        />
        <BlurrableImage
          img={
            <img
              className="rounded-[18px]"
              {...getImgProps(
                getImageBuilder(images.secondDate3.id, images.secondDate3.alt),
                {
                  widths: [579],
                  sizes: ['(min-width: 768px) 579px'],
                }
              )}
              height={772}
              width={579}
            />
          }
        />
        <BlurrableImage
          img={
            <img
              className="rounded-[18px]"
              {...getImgProps(
                getImageBuilder(images.secondDate4.id, images.secondDate4.alt),
                {
                  widths: [579],
                  sizes: ['(min-width: 768px) 579px'],
                }
              )}
              height={772}
              width={579}
            />
          }
        />
        <BlurrableImage
          img={
            <img
              className="rounded-[18px]"
              {...getImgProps(
                getImageBuilder(images.secondDate5.id, images.secondDate5.alt),
                {
                  widths: [579],
                  sizes: ['(min-width: 768px) 579px'],
                }
              )}
              height={772}
              width={579}
            />
          }
        />

        <p>
          Ese día estuvimos un poco más juntos, muchos besos en el cachete,
          muchos abrazos, nos reímos muchísimo jugando a Mario Kart y en la
          maquinita que nunca me dió el peluche 😠.
        </p>

        <p>
          También ese día conocí a Tina tu prima, lo que no sabía es que también
          la iba a llegar a querer, a pesar de estar bien loquita es una amiga
          bien genial y fue bueno conocerla. Nos reímos muchísimo ese día.
        </p>

        <p>
          Luego de nuestra segunda cita empezamos a tocar temas mas profundos,
          te hablé sobre mi ansiedad, mi TDAH y los periodos de depresión que
          tenía; lo mucho que me hacía falta mi papá y lo que me dolía recordar
          que ya no está aquí, ¿sabes que obtuve de ti? Muchísimo apoyo,
          muchísimo amor, comprendiste todo lo que te dije y en ese momento
          entendí que <strong>eras tu</strong>, tu eras{' '}
          <strong>la indicada</strong> y la persona que estaba buscando.
        </p>

        <hr />

        <p>
          Nuestra tercera cita fue una de las más especiales. Ese día pasaron
          varias cosas: <strong>nos besamos por primera vez</strong>, hablamos
          de cómo queríamos una relación y aprendiste a usar los palillos chinos
          🍾🎉🎊🥳
        </p>

        <BlurrableImage
          img={
            <img
              className="rounded-[18px]"
              {...getImgProps(
                getImageBuilder(images.thirdDate1.id, images.thirdDate1.alt),
                {
                  widths: [378],
                  sizes: ['(min-width: 768px) 378px'],
                }
              )}
              height={504}
              width={378}
            />
          }
        />
        <BlurrableImage
          img={
            <img
              className="rounded-[18px]"
              {...getImgProps(
                getImageBuilder(images.thirdDate2.id, images.thirdDate2.alt),
                {
                  widths: [378],
                  sizes: ['(min-width: 768px) 378px'],
                }
              )}
              height={504}
              width={378}
            />
          }
        />
        <BlurrableImage
          img={
            <img
              className="rounded-[18px]"
              {...getImgProps(
                getImageBuilder(images.thirdDate3.id, images.thirdDate3.alt),
                {
                  widths: [378],
                  sizes: ['(min-width: 768px) 378px'],
                }
              )}
              height={504}
              width={378}
            />
          }
        />
        <BlurrableImage
          img={
            <img
              className="rounded-[18px]"
              {...getImgProps(
                getImageBuilder(images.thirdDate4.id, images.thirdDate4.alt),
                {
                  widths: [378],
                  sizes: ['(min-width: 768px) 378px'],
                }
              )}
              height={504}
              width={378}
            />
          }
        />
        <BlurrableImage
          img={
            <img
              className="rounded-[18px]"
              {...getImgProps(
                getImageBuilder(images.thirdDate5.id, images.thirdDate5.alt),
                {
                  widths: [504],
                  sizes: ['(min-width: 768px) 504px'],
                }
              )}
              height={378}
              width={504}
            />
          }
        />
        <BlurrableImage
          img={
            <img
              className="rounded-[18px]"
              {...getImgProps(
                getImageBuilder(images.thirdDate6.id, images.thirdDate6.alt),
                {
                  widths: [504],
                  sizes: ['(min-width: 768px) 504px'],
                }
              )}
              height={378}
              width={504}
            />
          }
        />

        <p>
          Esa tercera cita fue demasiado hermosa, y creo que fue el escalón que
          necesitábamos para saber que podíamos confiar más el uno del otro, nos
          sentimos más compaginados sobre lo que queríamos en una relación y nos
          hizo acercarnos aún más el uno del otro.
        </p>

        <p>
          Para mi fue un día extremadamente especial, porque fue el día de
          nuestro primer beso y uno de los sellos para saber que queríamos algo
          en serio.
        </p>

        <hr />

        <p>
          Ahora se viene la cita por la cual se selló por completo que queríamos
          tener una relación juntos, el 13 de marzo de 2021, el día que nos
          fuimos a la Colonia Tovar.
        </p>

        <p>
          Este día fue crucial para nosotros, tuvimos muchísimos puntos en el
          que estuvimos solos y pudimos sentarnos a hablar y a partir de allí
          supimos que queríamos tener una relación, nos ibamos a seguir
          conociendo, pero ya sabíamos que nos gustábamos y queríamos tener algo
          juntos.
        </p>

        <BlurrableImage
          img={
            <img
              className="rounded-[18px]"
              {...getImgProps(
                getImageBuilder(images.fourthDate1.id, images.fourthDate1.alt),
                {
                  widths: [579],
                  sizes: ['(min-width: 768px) 579px'],
                }
              )}
              height={772}
              width={579}
            />
          }
        />
        <BlurrableImage
          img={
            <img
              className="rounded-[18px]"
              {...getImgProps(
                getImageBuilder(images.fourthDate2.id, images.fourthDate2.alt),
                {
                  widths: [756],
                  sizes: ['(min-width: 768px) 756px'],
                }
              )}
              height={1008}
              width={756}
            />
          }
        />
        <BlurrableImage
          img={
            <img
              className="rounded-[18px]"
              {...getImgProps(
                getImageBuilder(images.fourthDate3.id, images.fourthDate3.alt),
                {
                  widths: [1008],
                  sizes: ['(min-width: 768px) 1008px'],
                }
              )}
              height={756}
              width={1008}
            />
          }
        />
        <BlurrableImage
          img={
            <img
              className="rounded-[18px]"
              {...getImgProps(
                getImageBuilder(images.fourthDate4.id, images.fourthDate4.alt),
                {
                  widths: [756],
                  sizes: ['(min-width: 768px) 756px'],
                }
              )}
              height={1008}
              width={756}
            />
          }
        />
        <BlurrableImage
          img={
            <img
              className="rounded-[18px]"
              {...getImgProps(
                getImageBuilder(images.fourthDate5.id, images.fourthDate5.alt),
                {
                  widths: [1008],
                  sizes: ['(min-width: 768px) 1008px'],
                }
              )}
              height={756}
              width={1008}
            />
          }
        />
        <BlurrableImage
          img={
            <img
              className="rounded-[18px]"
              {...getImgProps(
                getImageBuilder(images.fourthDate6.id, images.fourthDate6.alt),
                {
                  widths: [756],
                  sizes: ['(min-width: 768px) 756px'],
                }
              )}
              height={1008}
              width={756}
            />
          }
        />

        <p>
          Este día fue el día en el que de verdad nos sentimos una pareja,
          riendo, compartiendo, tomando fotos o simplemente estar abrazados
          viendo las hermosas vistas de la montaña y disfrutar el tiempo juntos.
        </p>

        <p>
          Se que aún faltan otras citas que pasamos y otras fotos, pero pienso
          dentro de mi que estas citas fue lo que en realidad forjó lo que somos
          hoy en día, la forma en la que nos tratamos y lo que queremos juntos.
        </p>

        <p>
          Hace poco pasó lo de tu papá, y en ese momento empecé a hacerte sentir
          que yo estaba ahí para apoyarte, para ayudarte en lo que necesites,
          mover contactos, estar despierto contigo, lo que fuera, con tal de que
          te sintieras completamente acompañada.
        </p>

        <p>
          Porque no solamente yo voy a estar en los momentos buenos, porque en
          los momentos buenos está cualquiera, también en los malos que es donde
          te das cuenta de verdad quien tienes a tu lado.
        </p>

        <p>
          Por ti empecé a hacer ejercicio y mejorar mi salud tanto mental como
          física, y es una de las cosas más maravillosas que me ha pasado; en
          serio no puedo creer que por mi propia voluntad me pare a las 7-8AM a
          salir a caminar 😳
        </p>

        <p>
          También hemos empezado a vernos más seguido haciendo ejercicio en las
          mañanas en el parque y compartir juntos, y creo que ese punto es lo
          que nos ha vuelto más unidos y hemos estado más felices, amo de verdad
          vivir tan cerca de ti.
        </p>

        <p>
          Por esto y mucho más que solo tu y yo sabemos{' '}
          <strong>Maria Emilia Marcano Mora</strong>, quiero preguntarte lo
          siguiente:
        </p>

        <h2 className="text-center text-4xl font-bold text-primary">
          Maria Emilia Marcano Mora,{' '}
          <span className="text-secondary">¿quieres ser mi novia?</span>
        </h2>

        <h2 className="mt-4 text-center text-4xl font-bold italic text-primary">
          Porque contigo quiero todo, y nada a medias 💙
        </h2>
      </div>
    </main>
  );
}
