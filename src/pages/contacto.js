import React from "react"
import { useForm } from "@statickit/react"

import Layout from "../components/layout"

export default () => {
  const [state, submit] = useForm({
    site: process.env.GATSBY_SITE,
    form: process.env.GATSBY_CONTACT,
  })

  return (
  <Layout>
    <h1>Contacto</h1>
  </Layout>
)}
