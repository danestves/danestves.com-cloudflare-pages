import React, { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import {
  makeStyles,
  Chip,
  Typography,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import { useRouter } from 'next/router'
import Head from 'next/head'
import removeMd from 'remove-markdown'
import { TimeFive } from 'styled-icons/boxicons-regular/TimeFive'
import { Tag } from 'styled-icons/fa-solid/Tag'
import { ShareAlt } from 'styled-icons/boxicons-solid/ShareAlt'
import { Facebook } from 'styled-icons/boxicons-logos/Facebook'
import { Twitter } from 'styled-icons/boxicons-logos/Twitter'
import { LinkedinSquare } from 'styled-icons/boxicons-logos/LinkedinSquare'
import { Whatsapp } from 'styled-icons/boxicons-logos/Whatsapp'
import { LinkAlt } from 'styled-icons/boxicons-regular/LinkAlt'
import { window, document } from 'browser-monads'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import classNames from 'classnames'
import { DiscussionEmbed } from 'disqus-react'
import {
  HeroBlogpost,
  Image,
  InlineCode,
  Paragraph,
  CodeBlock,
  Loading,
  Link,
  MarkdownLink
} from '../../../components'
import { getSingleBlog } from '../../../graphql'
import { KEYWORDS } from '../../../constants'
import styles from '../../../styles/pages/[slug]-blog'

const useStyles = makeStyles(styles)

const markdownRenderers = {
  code: CodeBlock,
  paragraph: Paragraph,
  inlineCode: InlineCode,
  image: Image,
  link: MarkdownLink
}

export default () => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const router = useRouter()
  const { slug } = router.query
  const { loading, data, ...errors } = getSingleBlog(slug)

  const readingTime = text => {
    const wordsPerMinute = 200
    const noOfWords = text.split(/\s/g).length
    const minutes = noOfWords / wordsPerMinute
    const readTime = Math.ceil(minutes)
    return readTime === 1
      ? `${readTime} minuto de lectura ☕`
      : `${readTime} minutos de lectura ☕☕`
  }

  const webShareAPI = () => {
    if (window.navigator.share) {
      window.navigator
        .share({
          title: document.title,
          url: window.location.href
        })
        .then(() => console.log('Thanks for sharing!'))
        .catch(error => console.log('Error sharing: ', error))
    } else {
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const copyLink = async () => {
    const copyText = document.getElementById('url')

    try {
      await navigator.clipboard.writeText(copyText.value)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'))
  const blog = data && data.blogs[0]

  const disqusConfig = ({ slug, identifier, title }) => ({
    slug,
    identifier,
    title
  })
  const disqusShortname = process.env.DISQUS_SHORTNAME

  return data ? (
    <>
      <Head>
        <title>{blog.title} | Daniel Esteves</title>
        <meta
          name='description'
          content={removeMd(blog.content.substr(0, 154)) + '...'}
          key='description'
        />
        <meta
          name='keywords'
          content={`${blog.tags.map(tag => tag.name).toString()}, ${KEYWORDS}`}
          key='keywords'
        />
        <meta property='og:image' content={blog.ogCover.url} key='og:image' />
        <meta
          property='og:title'
          content={`${blog.title} | Daniel Esteves`}
          key='og:title'
        />
        <meta
          property='og:description'
          content={removeMd(blog.content.substr(0, 154)) + '...'}
          key='og:description'
        />
        <meta
          name='twitter:image'
          content={blog.ogCover.url}
          key='twitter:image'
        />
        <meta
          name='twitter:title'
          content={`${blog.title} | Daniel Esteves`}
          key='twitter:title'
        />
        <meta
          name='twitter:description'
          content={removeMd(blog.content.substr(0, 154)) + '...'}
          key='twitter:description'
        />
        <meta
          name='twitter:image:alt'
          content={`${blog.title} | Daniel Esteves`}
          key='twitter:image:alt'
        />
      </Head>
      <HeroBlogpost img={blog.cover.url} title={blog.title} />
      <div className={classes.container}>
        <div className={classes.metadataBlogpost}>
          {blog.tags && blog.tags.length ? (
            <div className={classes.containerTags}>
              <Typography
                component='h4'
                variant='h6'
                className={classes.titleTags}
              >
                <Tag size='24' /> Tags:
              </Typography>
              {blog.tags.map(tag => (
                <Chip
                  key={tag.name + 'tag'}
                  label={tag.name}
                  variant='outlined'
                  size={matches ? 'small' : 'medium'}
                  // component={Link}
                  // href={`/tags/${tag.name}`}
                  className={classes.chipTag}
                />
              ))}
            </div>
          ) : null}
          <div className={classes.containerReadingTime}>
            <Typography
              component='h4'
              variant='h6'
              className={classes.titleReadingTime}
            >
              <TimeFive size='24' /> {readingTime(blog.content)}
            </Typography>
          </div>
        </div>
        <Markdown
          className='markdown-content'
          source={blog.content}
          renderers={markdownRenderers}
          escapeHtml={false}
        />

        <DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig({
            slug: `https://danestves.com/blog/${slug}`,
            identifier: blog.id,
            title: blog.title
          })}
        />

        <Fab
          onClick={() => webShareAPI()}
          className={classes.fabWebShare}
          size='medium'
        >
          <ShareAlt size='24' />
        </Fab>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='share-title'
          aria-describedby='share-content'
        >
          <DialogTitle id='share-title'>Compártelo en:</DialogTitle>
          <DialogContent>
            <div className={classes.sharerList}>
              <div>
                <Button
                  className={classNames(
                    classes.sharerButton,
                    classes.sharerFacebook
                  )}
                  href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                  target='_blank'
                  fullWidth
                >
                  <Facebook size='24' />
                </Button>
                <Button
                  className={classNames(
                    classes.sharerButton,
                    classes.sharerTwitter
                  )}
                  href={`https://twitter.com/intent/tweet?text=${blog.title}&url=${window.location.href}&via=danestves`}
                  target='_blank'
                  fullWidth
                >
                  <Twitter size='24' />
                </Button>
              </div>

              <div>
                <Button
                  className={classNames(
                    classes.sharerButton,
                    classes.sharerLinkedin
                  )}
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                  target='_blank'
                  fullWidth
                >
                  <LinkedinSquare size='24' />
                </Button>
                <Button
                  className={classNames(
                    classes.sharerButton,
                    classes.sharerWhatsapp
                  )}
                  href={`https://api.whatsapp.com/send?text=*${
                    blog.title
                  }* ${removeMd(
                    blog.content.substr(0, 154)
                  )}... https://danestves.com/blog/${slug}`}
                  target='_blank'
                  fullWidth
                >
                  <Whatsapp size='24' />
                </Button>
              </div>

              <div>
                <TextField
                  id='url'
                  value={window.location.href}
                  disabled
                  fullWidth
                />
                <Button
                  className={classes.sharerLink}
                  fullWidth
                  onClick={copyLink}
                >
                  Copiar link <LinkAlt size='24' />
                </Button>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Listo
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  ) : loading ? (
    <Loading />
  ) : (
    `Error! ${errors}`
  )
}
