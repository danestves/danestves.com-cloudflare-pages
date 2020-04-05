// Dependencies
import React from "react"

export default () => {
  return (
    <>
      <div>
        {/* Begin Mailchimp Signup Form */}
        <div
          id="mc_embed_signup"
          className="w-full p-12 bg-blue-100 rounded shadow-md clear-left dark:bg-blue-900"
        >
          <form
            action="https://danestves.us19.list-manage.com/subscribe/post?u=b728e5f2d5135fefe65d627c9&id=8303aabf59"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
            noValidate
          >
            <div id="mc_embed_signup_scroll">
              <label
                htmlFor="mce-EMAIL"
                className="block w-full text-4xl font-bold text-center text-gray-700 dark:text-gray-200"
              >
                Únete al Newsletter
              </label>

              <div className="mb-5 text-xl font-normal text-center text-gray-600 dark:text-gray-500">
                <p>
                  Suscríbete para obtener los últimos blogpost de primera mano
                </p>
              </div>

              <div className="flex items-center">
                <input
                  type="email"
                  name="EMAIL"
                  className="w-full px-3 py-2 placeholder-gray-700 transition-all duration-150 bg-white rounded focus:outline-none focus:shadow-outline dark:bg-gray-400 dark:text-black focus:bg-white"
                  id="mce-EMAIL"
                  placeholder="Correo electrónico"
                  required
                />
                {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
                <div
                  style={{ position: "absolute", left: "-5000px" }}
                  aria-hidden="true"
                >
                  <input
                    type="text"
                    name="b_b728e5f2d5135fefe65d627c9_8303aabf59"
                    tabIndex={-1}
                    value=""
                  />
                </div>
                <div className="-ml-2">
                  <input
                    type="submit"
                    value="Suscríbete"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="px-6 py-2 font-bold text-white bg-blue-600 rounded shadow cursor-pointer focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        {/*End mc_embed_signup*/}
      </div>
    </>
  )
}
