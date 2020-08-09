// Dependencies
import * as React from 'react';
import { graphql } from 'gatsby';
import { useForm, ValidationError } from '@statickit/react';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';
import { animated, useTransition, config } from 'react-spring';

// Components
import { Layout, SEO, ProjectList } from '../components';

// Types
import { ProjectCardType } from '../types';

type Props = {
  data: {
    allStrapiProjects: {
      nodes: [ProjectCardType];
    };
  };
};

const Projects: React.FC<Props> = ({
  data: {
    allStrapiProjects: { nodes: projects },
  },
}) => {
  // States
  const [state, submit] = useForm(process.env.GATSBY_CONTACT || ``);
  const [token, setToken] = React.useState(``);
  const succeededTrantisiton = useTransition(state.succeeded, null, {
    from: {
      opacity: 0,
      transform: `scale(${0.9})`,
      transformOrigin: `top`,
    },
    enter: {
      opacity: 1,
      transform: `scale(${1})`,
    },
    leave: {
      opacity: 0,
      transform: `scale(${0.9})`,
    },
    config: config.wobbly,
  });

  // Methods
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (token !== ``) {
      submit(e);
    }
  };

  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.GATSBY_RECAPTCHA} language="es">
      <Layout>
        <SEO
          isTemplate
          title="Proyectos"
          description="Página de proyectos hechos por Daniel Esteves para demostrar sus conocimientos y ganas de aportar al mundo del Open Source. 🚀😎"
        />

        <div className="flex flex-wrap mt-12">
          <div className="w-full md:w-2/3">
            {projects && projects.map(project => <ProjectList key={project.id + project.title} project={project} />)}
          </div>

          <div className="w-full md:w-1/3">
            <h2 className="mb-2 text-2xl font-light text-center text-gray-900 md:text-left dark:text-gray-300">
              Contáctame para desarrollar tu idea
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap">
                <div className="flex w-full py-2 sm:pr-2 sm:w-1/2">
                  <label htmlFor="email" className="sr-only">
                    Correo
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="Correo"
                    className="w-full px-3 py-2 placeholder-gray-700 transition-all duration-150 bg-white rounded dark:bg-gray-400 dark:text-black focus:outline-none focus:bg-white focus:shadow-outline"
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className="text-sm font-bold text-red-600"
                  />
                </div>

                <div className="flex w-full py-2 sm:pl-2 sm:w-1/2">
                  <label htmlFor="subject" className="sr-only">
                    Asunto
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    required
                    placeholder="Asunto"
                    className="w-full px-3 py-2 placeholder-gray-700 transition-all duration-150 bg-white rounded dark:bg-gray-400 dark:text-black focus:outline-none focus:bg-white focus:shadow-outline"
                  />
                  <ValidationError
                    prefix="Subject"
                    field="subject"
                    errors={state.errors}
                    className="text-sm font-bold text-red-600"
                  />
                </div>
              </div>

              <label htmlFor="message" className="sr-only">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Mensaje"
                className="w-full px-3 py-2 mt-2 placeholder-gray-700 transition-all duration-150 bg-white rounded focus:outline-none focus:shadow-outline dark:bg-gray-400 dark:text-black focus:bg-white"
              />

              {state.succeeded ? (
                succeededTrantisiton.map(
                  ({ item, key, props }) =>
                    item && (
                      <animated.div
                        key={key}
                        style={props}
                        className="px-2 py-4 mt-4 bg-green-400 border-2 border-green-700 rounded-lg"
                      >
                        <p className="font-bold text-green-800">Su mensaje ha sido enviado correctamente</p>
                      </animated.div>
                    ),
                )
              ) : (
                <>
                  <GoogleReCaptcha onVerify={token => setToken(token)} />
                  <div className="flex flex-wrap mt-4">
                    <div className="w-full md:w-1/2 md:pr-2">
                      <button
                        type="reset"
                        className="block w-full py-3 font-bold text-indigo-700 capitalize border border-indigo-700 rounded dark:border-gray-400 dark:text-gray-400"
                      >
                        limpiar
                      </button>
                    </div>
                    <div className="w-full mt-3 md:w-1/2 md:pl-2 md:mt-0">
                      <button
                        type="submit"
                        className={`block w-full py-3 font-bold text-white capitalize bg-indigo-700 border border-indigo-700 rounded ${
                          state.submitting && `opacity-50 cursor-not-allowed`
                        } transition-all duration-200`}
                        disabled={state.submitting}
                      >
                        {state.submitting ? `Enviando...` : `Enviar`}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </Layout>
    </GoogleReCaptchaProvider>
  );
};

export const query = graphql`
  query allStrapiProjects {
    allStrapiProjects(sort: { fields: [title], order: [ASC] }) {
      nodes {
        id
        title
        slug
        sort
        cover {
          childImageSharp {
            fluid(maxWidth: 600, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        technologies {
          id
          name
        }
      }
    }
  }
`;

export default Projects;
