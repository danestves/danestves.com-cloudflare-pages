// Dependencies
import React from "react"

export default () => {
  return (
    <>
      <script src="https://f.convertkit.com/ckjs/ck.5.js"></script>

      <form
        action="https://app.convertkit.com/forms/1297561/subscriptions"
        className="bg-blue-100 rounded-lg shadow-md dark:bg-gray-700 seva-form formkit-form"
        method="post"
        data-sv-form={1297561}
        data-uid="d5a52e3a27"
        data-version={5}
        data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"facebook":null,"segment":null,"pinterest":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://convertkit.com?utm_source=dynamic&utm_medium=referral&utm_campaign=poweredby&utm_content=form"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
        min-width="400 500 600 700 800"
      >
        <div className="formkit-background" style={{ opacity: 1 }} />
        <div data-style="minimal">
          <div
            className="text-4xl font-bold text-center text-gray-700 dark:text-gray-200"
            data-element="header"
          >
            <h1>Únete al Newsletter</h1>
          </div>
          <div
            className="text-xl text-center text-gray-600 dark:text-gray-500"
            data-element="subheader"
          >
            <p>Suscríbete para obtener los últimos blogpost de primera mano</p>
          </div>
          <ul
            className="formkit-alert formkit-alert-error"
            data-element="errors"
            data-group="alert"
          />
          <div
            data-element="fields"
            data-stacked="false"
            className="seva-fields formkit-fields"
          >
            <div className="formkit-field">
              <input
                className="transition-all duration-150 dark:placeholder-gray-600 formkit-input focus:shadow-outline"
                name="email_address"
                placeholder="Correo"
                required
                type="email"
                style={{
                  borderColor: "rgb(227, 227, 227)",
                  borderRadius: "4px",
                  fontWeight: 400,
                }}
              />
            </div>
            <button
              data-element="submit"
              className="transition-all duration-150 bg-blue-600 shadow formkit-submit focus:outline-none focus:shadow-outline"
            >
              <div className="formkit-spinner">
                <div />
                <div />
                <div />
              </div>
              <span>Subscríbete</span>
            </button>
          </div>
          <div
            className="text-sm text-center text-gray-600 dark:text-gray-500"
            data-element="guarantee"
          >
            <p>No te enviamos SPAM. Dáte de baja en cualquier momento.</p>
          </div>
          <a
            href="https://convertkit.com?utm_source=dynamic&utm_medium=referral&utm_campaign=poweredby&utm_content=form"
            className="block mt-4 text-sm font-bold text-center text-gray-600 dark:text-gray-500 formkit-powered-by"
            data-element="powered-by"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered By ConvertKit
          </a>
        </div>
      </form>
    </>
  )
}
