// Dependencies
import * as React from 'react';

// Components
import { SEO } from '../components';

const Contact: React.FC = () => {
  // Effects
  React.useEffect(() => {
    setTimeout(() => {
      const kwesScript = document.createElement(`script`);

      kwesScript.setAttribute(`src`, `https://kwes.io/v2/kwes-script.js`);
      kwesScript.setAttribute(`charset`, `utf-8`);

      document.head.appendChild(kwesScript);
    }, 2000);
  }, []);

  // Renders
  return (
    <>
      <SEO
        isTemplate
        title="Contacto"
        description="Página de contacto para cotizar servicios web con Daniel Esteves enfocado en el área de React, NextJS, Gatsby y WordPress para su rápida ejecución. 🚀😎"
      />

      {/* Space for Header */}
      <div className="w-full min-h-20 bg-secondary"></div>

      <div className="flex items-center justify-center w-full min-h-screen bg-secondary">
        <div className="w-full max-w-2xl px-5 py-12 mx-auto">
          <form
            className="kwes-form"
            method="POST"
            action="https://kwes.io/api/foreign/forms/Mm2LUetuNurfSFDKUGRY"
            lang="es"
          >
            <div className="py-2">
              <label htmlFor="name" className="hidden">
                Nombre
              </label>
              <input
                id="name"
                type="name"
                name="name"
                required
                placeholder="Nombre"
                className="w-full px-3 py-2 font-mono placeholder-gray-500 transition-all duration-150 bg-white rounded focus:outline-none focus:bg-white focus:shadow-outline"
              />
            </div>

            <div className="py-2">
              <label htmlFor="email" className="hidden">
                Correo
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="Correo"
                className="w-full px-3 py-2 font-mono placeholder-gray-500 transition-all duration-150 bg-white rounded focus:outline-none focus:bg-white focus:shadow-outline"
              />
            </div>

            <div className="py-2">
              <label htmlFor="subject" className="hidden">
                Asunto
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                required
                placeholder="Asunto"
                className="w-full px-3 py-2 font-mono placeholder-gray-500 transition-all duration-150 bg-white rounded focus:outline-none focus:bg-white focus:shadow-outline"
              />
            </div>

            <div className="py-2">
              <label htmlFor="message" className="hidden">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Mensaje"
                className="w-full px-3 py-2 font-mono placeholder-gray-500 transition-all duration-150 bg-white rounded focus:outline-none focus:shadow-outline focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap mt-4">
              <div className="w-full md:w-1/2 md:pr-2">
                <button
                  type="reset"
                  className="block w-full py-3 font-bold capitalize border rounded text-primary border-primary"
                >
                  limpiar
                </button>
              </div>
              <div className="w-full mt-3 md:w-1/2 md:pl-2 md:mt-0">
                <button
                  type="submit"
                  className="block w-full py-3 font-bold text-white capitalize transition-all duration-200 border rounded bg-primary border-primary"
                >
                  Enviar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
