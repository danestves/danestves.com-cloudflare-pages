import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component'
import { Check } from 'styled-icons/boxicons-regular/Check'
import { TimeFive } from 'styled-icons/boxicons-regular/TimeFive'
import styles from '../../styles/components/curriculum'

const useStyles = makeStyles(styles)

export default function Timeline (props) {
  const classes = useStyles()
  const { items } = props

  return (
    <VerticalTimeline className={classes.containerTimeline}>
      {items.map((item, index) => (
        <VerticalTimelineElement
          key={index}
          className={classes.timelineElement}
          date={item.date}
          iconStyle={
            item.finished
              ? { background: 'rgb(16, 204, 82)', color: '#fff' }
              : { background: 'rgb(33, 150, 243)', color: '#fff' }
          }
          icon={item.finished ? <Check size='1.5rem' /> : <TimeFive size='1.5rem' />}>
          <Typography
            className={classes.timelineTitle}
            component='h2'
            variant='h6'>
            {item.title}
          </Typography>
          <Typography
            className={classes.timelineSubtitle}
            component='h3'
            variant='subtitle1'>
            {item.subtitle}
          </Typography>
          <p>{item.content}</p>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  )
}
