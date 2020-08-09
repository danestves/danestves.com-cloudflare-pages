// Dependencies
import * as React from 'react';

// Components
import { SEO, Layout } from '../components';

// Hooks
import { usePlatziData } from '../hooks';

const Certificaciones: React.FC = () => {
  // States
  const { loading, courses, careers } = usePlatziData();

  const fakeData = [{ fake: `fake` }, { fake: `fake` }, { fake: `fake` }];

  // Render
  return (
    <Layout>
      <SEO
        isTemplate
        title="Certificaciones"
        description="Cursos y carreras que Daniel Esteves ha realizado para especializarse en el area del desarrollo web así como también para obtener conocimientos varios."
      />

      {loading ? (
        <div className="flex flex-wrap items-center justify-center py-5">
          <div className="w-full my-4">
            <div className="w-full max-w-xs mx-auto">
              <div className="h-8 rounded title loading" />
            </div>
          </div>

          {fakeData.map((fake, index) => (
            <div className="w-full px-2 my-2 sm:w-1/2 md:w-1/3" key={index}>
              <div className="block p-3 transition-all duration-200 bg-white border border-transparent rounded-lg shadow dark:bg-gray-700 hover:shadow-lg hover:border-indigo-700 dark:hover:border-white">
                <div className="flex items-center justify-center">
                  <div className="w-1/4">
                    <div style={{ height: 75, width: 75 }} className="block mx-auto rounded-full loading" />
                  </div>
                  <div className="w-3/4 px-3">
                    <div className="mb-4 rounded title loading" />
                    <div className="rounded description loading" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : courses && careers ? (
        <div className="flex flex-wrap items-center justify-center">
          {careers && (
            <div className="w-full">
              <h2 className="my-4 text-3xl text-center">Carreras</h2>
            </div>
          )}

          {careers &&
            careers.map(career => (
              <div className="w-full px-2 my-2 sm:w-1/2 md:w-1/3" key={career.id}>
                <a
                  href={`https://platzi.com${career.diploma_link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 transition-all duration-200 bg-white border border-transparent rounded-lg shadow dark:bg-gray-800 hover:shadow-lg hover:border-indigo-700 dark:hover:border-white"
                >
                  <div className="flex items-center justify-center">
                    <div className="w-1/4">
                      <img
                        src={career.golden_achievement}
                        alt={`${career.title} | Daniel Esteves`}
                        height="75px"
                        width="75px"
                        className="block mx-auto"
                      />
                    </div>
                    <div className="w-3/4 px-3">
                      <h3 className="text-xl font-semibold">{career.title}</h3>
                    </div>
                  </div>
                </a>
              </div>
            ))}

          <p className="mt-6 text-gray-600">
            Si quieres ver más sobre mis certificaciones puedes ver mi perfil en{` `}
            <a
              href="https://platzi.com/@danestves/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline"
            >
              Platzi
            </a>
          </p>
        </div>
      ) : (
        `Error!`
      )}
    </Layout>
  );
};

export default Certificaciones;
