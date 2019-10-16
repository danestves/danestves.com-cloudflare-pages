import React, { forwardRef } from "react";
import {
  makeStyles,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import { Close as CloseIcon } from "styled-icons/evil/Close";

const useStyles = makeStyles(theme => ({
  gridContainer: {
    margin: theme.spacing(8, -1)
  },
  defaultValueSelect: {
    color:
      theme.palette.type === "light"
        ? "rgba(0, 0, 0, 0.54)"
        : "rgba(255, 255, 255, 0.54)"
  },
  helperGoogle: {
    color:
      theme.palette.type === "light"
        ? "rgba(0, 0, 0, 0.54)"
        : "rgba(255, 255, 255, 0.54)",

    "& a": {
      textDecoration: "none",
      color: "#00A9E0"
    }
  },
  actionButtons: {
    display: "flex",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),

    "& button": {
      flex: 1,

      "&:first-child": {
        marginRight: 4
      },

      "&:last-child": {
        marginLeft: 4
      }
    }
  }
}));
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ({
  open,
  handleClose,
  handleChange,
  handleSubmit,
  name,
  email,
  subject,
  message
}) => {
  const classes = useStyles();
  const isValidated =
    name.length > 0 &&
    email.length > 0 &&
    subject.length > 3 &&
    message.length > 0;

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon size="32px" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Más información sobre los planes
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="container">
        <Grid
          container
          spacing={2}
          justify="center"
          className={classes.gridContainer}
        >
          <Grid item xs={10} sm={8} md={6}>
            <form name="moreInformation" onSubmit={handleSubmit}>
              <TextField
                label="Nombre"
                name="name"
                autoComplete="name"
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                fullWidth
                required
              />

              <TextField
                label="Correo"
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                fullWidth
                required
              />

              <FormControl
                variant="filled"
                className={classes.formControl}
                margin="normal"
                fullWidth
                required
              >
                <InputLabel htmlFor="subject">Asunto</InputLabel>
                <Select
                  value={subject}
                  onChange={handleChange}
                  inputProps={{
                    name: "subject",
                    id: "subject"
                  }}
                  required
                >
                  <MenuItem value=" " disabled selected>
                    <span
                      className={classes.defaultValueSelect}
                      id="helperSelect"
                    >
                      Ninguno
                    </span>
                  </MenuItem>
                  <MenuItem value="Startup Basic">Startup Onepage</MenuItem>
                  <MenuItem value="Startup">Startup</MenuItem>
                  <MenuItem value="Tienda Virtual">Tienda Virtual</MenuItem>
                  <MenuItem value="Otro">Otro</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Mensaje"
                name="message"
                multiline
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                fullWidth
                rows="4"
                required
              />
              <Typography
                variant="caption"
                component="small"
                className={classes.helperGoogle}
                id="helperGoogle"
              >
                This site is protected by reCAPTCHA and the Google{" "}
                <a href="https://policies.google.com/privacy">Privacy Policy</a>{" "}
                and{" "}
                <a href="https://policies.google.com/terms">Terms of Service</a>{" "}
                apply.
              </Typography>

              <div className={classes.actionButtons}>
                <Button variant="outlined" color="primary" type="reset">
                  Limpiar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!isValidated}
                >
                  Enviar
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
};
