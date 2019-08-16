import { useGraphQL } from 'graphql-react'

export default () => {
  const { loading, cacheValue = {} } = useGraphQL({
    fetchOptionsOverride (options) {
      options.url = 'https://danestves.herokuapp.com/graphql'
    },
    operation: {
      query: /* GraphQL */ `
        {
          blogs {
            title
          }
        }
      `
    }
  })
  console.log(process.env.GITHUB_PERSONAL_ACCESS_TOKEN)

  const { data } = cacheValue
  return data ? (
    <>
      <h1>Hola {data.blogs[0].title}</h1>
      <div style={{ display: 'none' }}>{process.env.GITHUB_PERSONAL_ACCESS_TOKEN}</div>
    </>
  ) : loading ? (
    <p>Loading…</p>
  ) : (
    <p>Error!</p>
  )
}

// import React from 'react'
// import Container from '@material-ui/core/Container'
// import Typography from '@material-ui/core/Typography'
// import Box from '@material-ui/core/Box'
// import MuiLink from '@material-ui/core/Link'
// import { useGraphQL } from 'graphql-react'
// import ProTip from '../src/ProTip'
// import Link from '../src/Link'

// function Copyright () {
//   return (
//     <Typography variant='body2' color='textSecondary' align='center'>
//       {'Copyright © '}
//       <MuiLink color='inherit' href='https://material-ui.com/'>
//         Your Website
//       </MuiLink>{' '}
//       {new Date().getFullYear()}
//       {'. Built with '}
//       <MuiLink color='inherit' href='https://material-ui.com/'>
//         Material-UI.
//       </MuiLink>
//     </Typography>
//   )
// }

// export default function Index () {
//   const { loading, cacheValue: { data, ...errors } = {} } = useGraphQL({
//     fetchOptionsOverride (options) {
//       options.url = 'https://api.github.com/graphql'
//       options.headers = {
//         Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
//       }
//     },
//     operation: {
//       query: /* GraphQL */ `
//         {
//           viewer {
//             login
//           }
//         }
//       `
//     }
//   })

//   return (
//     <h1>Hola {data && data.viewer.login}</h1>
//   )

//   // return (
//   //   <Container maxWidth='sm'>
//   //     <Box my={4}>
//   //       <Typography variant='h4' component='h1' gutterBottom>
//   //         Next.js example
//   //       </Typography>
//   //       <Link href='/about' color='secondary'>
//   //         Go to the about page
//   //       </Link>
//   //       <ProTip />
//   //       <Copyright />
//   //     </Box>
//   //   </Container>
//   // )
// }
