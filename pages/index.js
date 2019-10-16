import React, { useState, createRef } from "react";
import { Typography, Button, makeStyles, Grid } from "@material-ui/core";
import clsx from "clsx";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import nprogress from "nprogress";
import { Link, Skills, Loading, Dialog, Snackbar } from "../components";
import styles from "../styles/pages/home";
import { getSkills } from "../graphql";

const useStyles = makeStyles(styles);
const config = {
  headers: {
    "Content-Type": "application/json"
  }
};
const ReCAPTCHARef = createRef();

export default function Index() {
  const classes = useStyles();
  const { loading, data: skills } = getSkills();
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    subject: " ",
    message: ""
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleChange = e => {
    e.persist();
    setInputs(inputs => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    nprogress.start();

    await ReCAPTCHARef.current.execute();
    await axios
      .post(
        "/api/cotization",
        {
          ...inputs
        },
        config
      )
      .then(res => {
        nprogress.done();
        setOpenSnackbar(true);
        setOpen(false);
      })
      .catch(error => {
        nprogress.start();
        console.log(error);
      });
  };

  const { name, email, subject, message } = inputs;

  return (
    <>
      <Snackbar
        open={openSnackbar}
        handleClose={handleCloseSnackbar}
        message="Su mensaje ha sido enviado con éxito."
        variant="success"
      />
      <div className={classes.bannerContainer}>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography component="h1" variant="h2" className={classes.title}>
              Daniel Esteves
            </Typography>
            <Typography
              component="h2"
              variant="h4"
              className={classes.subtitle}
            >
              Desarrollador Web Frontend
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Button
                  component={Link}
                  href="/portafolio"
                  variant="outlined"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  saber más
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  component={Link}
                  href="/contacto"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  className={classes.bannerActionButtonContact}
                >
                  hablemos
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <img
              src="/static/banner.svg"
              alt="Daniel Esteves"
              className={classes.bannerImage}
            />
          </Grid>
        </Grid>
      </div>
      <div className="container">
        <Typography
          variant="h4"
          component="h2"
          align="center"
          className={classes.description}
        >
          Tengo una gran experiencia en el diseño y construcción de sitios web,
          personalización y optimización. Manejo tecnologías, lenguajes y
          librerías como:
        </Typography>

        {skills ? (
          <div className={classes.containerSkills}>
            <Skills skills={skills.skills} />
          </div>
        ) : loading ? (
          <Loading />
        ) : (
          "Error!"
        )}

        <Button
          component={Link}
          href="/curriculum"
          variant="outlined"
          size="large"
          className={classes.knowMore}
        >
          ¡Quiero saber más!
        </Button>

        <Typography
          variant="h4"
          component="h2"
          align="center"
          className={classes.titlePricing}
        >
          Hice unos planes especiales para ti que te podrían interesar 🤘
        </Typography>

        <div className={clsx(classes.panel, classes.pricingTable)}>
          <div className="pricing-plan">
            <img
              src="/static/startup-onepage.png"
              alt=""
              className="pricing-img"
            />
            <h2 className="pricing-header">Startup OnePage</h2>
            <ul className="pricing-features">
              <li className="pricing-features-item">
                website con la información en una página
              </li>
              <li className="pricing-features-item">diseño moderno</li>
              <li className="pricing-features-item">
                imágenes de ejemplo incluidas
              </li>
              <li className="pricing-features-item">
                diseño adaptable a todos los dispositivos
              </li>
              <li className="pricing-features-item">incluye blog</li>
              <li className="pricing-features-item">formulario de contacto</li>
            </ul>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={handleClickOpen}
            >
              más información
            </Button>
          </div>

          <div className="pricing-plan">
            <img src="/static/startup.png" alt="" className="pricing-img" />
            <h2 className="pricing-header">Startup</h2>
            <ul className="pricing-features">
              <li className="pricing-features-item">
                website con hasta cinco pestañas (Ej: Inicio, Sobre, Servicios,
                Blog, Contacto)
              </li>
              <li className="pricing-features-item">diseño moderno</li>
              <li className="pricing-features-item">
                imágenes de ejemplo incluidas
              </li>
              <li className="pricing-features-item">
                diseño adaptable a todos los dispositivos
              </li>
              <li className="pricing-features-item">incluye blog</li>
              <li className="pricing-features-item">formulario de contacto</li>
            </ul>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleClickOpen}
            >
              más información
            </Button>
          </div>

          <div className="pricing-plan">
            <img src="/static/online-shop.png" alt="" className="pricing-img" />
            <h2 className="pricing-header">Tienda Virtual</h2>
            <ul className="pricing-features">
              <li className="pricing-features-item">
                website con hasta cinco pestañas (Ej: Inicio, Sobre, Servicios,
                Blog, Contacto)
              </li>
              <li className="pricing-features-item">
                Hasta 20 productos iniciales
              </li>
              <li className="pricing-features-item">diseño moderno</li>
              <li className="pricing-features-item">
                imágenes de ejemplo incluidas
              </li>
              <li className="pricing-features-item">
                diseño adaptable a todos los dispositivos
              </li>
              <li className="pricing-features-item">incluye blog</li>
              <li className="pricing-features-item">formulario de contacto</li>
            </ul>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={handleClickOpen}
            >
              más información
            </Button>
          </div>
        </div>
        <Dialog
          open={open}
          handleClose={handleClose}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          name={name}
          email={email}
          subject={subject}
          message={message}
        />

        <ReCAPTCHA
          sitekey={process.env.RECAPTCHA_SITEKEY}
          size="invisible"
          ref={ReCAPTCHARef}
        />
      </div>
    </>
  );
}
