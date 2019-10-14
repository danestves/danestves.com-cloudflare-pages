import { makeStyles, Typography, Grid } from '@material-ui/core'
import styles from '../styles/pages/dayairis'

const useStyles = makeStyles(styles)

export default () => {
  const classes = useStyles()

  return (
    <div className="container">
      <Typography variant='h5' align='center' className={classes.title}>
        Hola amor 🥰, tal vez te estés preguntando{' '}
        <b>
          <i>"¿Y esto qué es?"</i>
        </b>{' '}
        Pues sigue viendo la página y encontrarás la respuesta 👇👇
      </Typography>

      <Grid
        container
        spacing={2}
        alignItems='center'
        align='center'
        justify='center'
      >
        <Grid item xs='12' md='6'>
          <img src='/static/dayairis/first.jpg' className={classes.image} />
        </Grid>

        <Grid item xs='12' md='6'>
          <Typography paragraph>
            Esta fue la primera foto juntos que nos tomamos después de conocer a
            tu familia formalmente, donde me presentaste como tu novio.
          </Typography>

          <Typography paragraph>
            De verdad que a pesar de todos los problemas que han pasado y los
            momentos malos no puedo decir que he dejado de amarte, y no lo voy a
            hacer. Ese día marcó el punto de partida de lo que hoy somos tu y
            yo.
          </Typography>

          <Typography variant='h4'>
            <b>25/09/2017 💕</b>
          </Typography>
          <Typography variant='h6'>Una fecha para no olvidar 😊</Typography>
        </Grid>

        <Grid item xs='12' md='6'>
          <Typography paragraph>
            Avanzamos rápidamente a un acontecimiento demasiado importante en tu
            vida:
          </Typography>

          <Typography variant='h4' paragraph>
            <b>Tu graduación 👩‍🎓</b>
          </Typography>

          <Typography gutterBottom paragraph>
            El hecho de que me hayas permitido haber estado contigo como pareja
            y en ese acontecimiento tan importante para ti me hizo sentir una
            persona muy especial en tu vida, aún me siento de esta manera y
            nunca quiero dejar de sentirme así.
          </Typography>
        </Grid>

        <Grid item xs='12' md='6'>
          <img src='/static/dayairis/second.jpg' className={classes.image} />
        </Grid>

        <Grid item xs='12'>
          <Typography variant='h5' paragraph>
            Las salidas contigo que espero nunca falten 🙌:
          </Typography>
        </Grid>

        <Grid item xs='12' sm='6' md='4'>
          <img src='/static/dayairis/third.jpg' className={classes.image} />
        </Grid>

        <Grid item xs='12' sm='6' md='4'>
          <img src='/static/dayairis/fourth.jpg' className={classes.image} />
        </Grid>

        <Grid item xs='12' sm='6' md='4'>
          <img src='/static/dayairis/fifth.jpg' className={classes.image} />
        </Grid>

        <Grid item xs='12'>
          <Typography variant='h5' paragraph>
            Aún faltan muchas más fotos. Pero quiero decirte que no quiero que
            acaben las salidas, no quiero que acaben las sonrisas y{' '}
            <b>no quiero</b> que acabe este amor que siento por ti.
          </Typography>
        </Grid>

        <Grid item xs='12' md='6'>
          <img src='/static/dayairis/sixth.jpg' className={classes.image} />
        </Grid>

        <Grid item xs='12' md='6'>
          <Typography variant='h4' paragraph>
            <b>Mi logro más reciente, mi graduación 👨‍🎓</b>
          </Typography>

          <Typography paragraph>
            Estuviste ahí desde principio a fin junto con mi mamá y mi familia
            me apoyaste en todo lo que me propuse. Eso se tradujo recientemente
            a este logro tan importante como lo es haberme graduado de TSU en
            Informática.
          </Typography>

          <Typography paragraph>
            Quiero agradecerte tanto a ti como a mi mamá y mi familia que me
            apoyaron en todo momento y que a pesar de que yo no quería me
            ayudaron a darme cuenta que es un título, es mi esfuerzo y esos
            resultados los voy a ver en toda mi vida.
          </Typography>

          <Typography paragraph>
            También como acotación al párrafo de arriba, gracias por apoyarme en
            decidir si seguir o no estudiando la ingeniería 😅.
          </Typography>
        </Grid>

        <Grid item xs='12'>
          <hr />
        </Grid>

        <Grid item xs='12' md='6'>
          <Typography paragraph>
            Daya, quiero agradecerte por estos ya dos años que has estado junto
            a mi. Se que no ha sido fácil, hemos tenido miles de peleas, muchas
            molestias; pero a pesar de todo eso aún seguimos juntos.
          </Typography>

          <Typography paragraph>
            Se que hay veces en que dices{' '}
            <i>
              <b>"Verga, ya no quiero seguir siento que no me ama"</b>
            </i>
            , pero todo lo contrario, creeme que te amo más desde la primera
            vez, cada día mi amor aumenta hacia ti, a pesar de que las cosas
            estén difíciles eso no significa que te voy a dejar de amar o voy a
            dejar la relación asi.
          </Typography>

          <Typography paragraph>
            Ambos requerimos mucha paciencia para estar juntos 🤣🤣, pero aquí
            estamos a pesar de todo, dos años y aún no me puedo creer que sigas
            siendo mi novia 🙈.
          </Typography>
        </Grid>

        <Grid item xs='12'>
          <Typography variant='h5' paragraph>
            Daya, mi amor, quiero desearte un feliz aniversario y decirte que...
          </Typography>

          <Typography variant='h3' paragraph>
            TE AMOOOOO 💕💞💘
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}
