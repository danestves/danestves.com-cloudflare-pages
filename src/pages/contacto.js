// Dependencies
import React, { useEffect, useState } from "react"
import { useForm, ValidationError } from "@statickit/react"
import { animated, useTransition, config } from "react-spring"
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3"
import { window } from "browser-monads"

// Components
import { Layout, SEO } from "../components"

// Icons
import { ContactIcon } from "../icons"

export default () => {
  // States
  const [state, submit] = useForm(process.env.GATSBY_CONTACT)
  const [token, setToken] = useState("")
  const succeededTrantisiton = useTransition(state.succeeded, null, {
    from: {
      opacity: 0,
      transform: `scale(${0.9})`,
      transformOrigin: "top",
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
  })

  // Effects
  useEffect(() => {
    if (state.succeeded) {
      setTimeout(() => {
        window.location.reload()
      }, 6000)
    }
  }, [state.succeeded])

  // Functions
  const handleSubmit = (e) => {
    e.preventDefault()

    if (token !== "") {
      submit(e)
    }
  }

  // Renders
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.GATSBY_RECAPTCHA}
      language="es"
    >
      <Layout>
        <SEO
          isTemplate
          title="Contacto"
          description="Página de contacto para cotizar servicios web con Daniel Esteves enfocado en el área de React, NextJS, Gatsby y WordPress para su rápida ejecución. 🚀😎"
        />

        <div className="py-10">
          <h1 className="mb-5 text-3xl text-center md:text-left">
            ¿Tienes alguna pregunta o quieres solicitar un trabajo?
          </h1>

          <div className="flex flex-wrap items-center">
            <div className="order-2 w-full md:pr-2 md:w-1/2 md:order-1">
              <h2 className="mb-2 text-2xl font-light text-center text-gray-500 md:text-left">
                Contáctame y te responderé lo más pronto posible
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap">
                  <div className="flex w-full py-2 sm:pr-2 sm:w-1/2">
                    <label htmlFor="email" className="hidden">
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
                    <label htmlFor="subject" className="hidden">
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

                <label htmlFor="message" className="hidden">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  type="text"
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
                          <p className="font-bold text-green-800">
                            Su mensaje ha sido enviado correctamente
                          </p>
                        </animated.div>
                      )
                  )
                ) : (
                  <>
                    <GoogleReCaptcha onVerify={(token) => setToken(token)} />
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
                            state.submitting && "opacity-50 cursor-not-allowed"
                          } transition-all duration-200`}
                          disabled={state.submitting}
                        >
                          {state.submitting ? "Enviando..." : "Enviar"}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </form>
            </div>

            <div className="order-1 w-full md:pl-2 md:w-1/2 md:order-2">
              <ContactIcon className="w-full h-64 h-full max-w-md max-h-full pb-8 mx-auto" />
            </div>
          </div>
        </div>
      </Layout>
    </GoogleReCaptchaProvider>
  )
}
