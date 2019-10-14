import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import styles from "../../styles/components/home";

const useStyles = makeStyles(styles);

export default function Skills({ skills }) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {skills.map(skill => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={skill.title}
          className={classes.skill}
        >
          <Paper className={classes.skillBoxContainer}>
            <i
              className={classNames(
                `de-icons icon-${skill.icon}`,
                classes.iconSkill
              )}
            />
            <div className={classes.titleSkill}>{skill.title}</div>
            <Typography className={classes.contentSkill}>
              {skill.content}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

Skills.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string
    })
  )
};
