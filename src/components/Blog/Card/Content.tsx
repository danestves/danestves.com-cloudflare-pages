// Dependencies
import * as React from 'react'
import { motion, useInvertedScale } from 'framer-motion'

function ContentPlaceholder(): JSX.Element {
  const inverted = useInvertedScale()

  // Render
  return (
    <motion.div className="content-container" style={{ ...inverted, originY: 0, originX: 0 }}>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias sint, earum sapiente iure
        voluptate, odio consequuntur facere molestias aut odit, modi nisi voluptas aliquam tempora
        maxime nostrum qui recusandae voluptatibus.
      </p>

      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias sint, earum sapiente iure
        voluptate, odio consequuntur facere molestias aut odit, modi nisi voluptas aliquam tempora
        maxime nostrum qui recusandae voluptatibus.
      </p>

      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias sint, earum sapiente iure
        voluptate, odio consequuntur facere molestias aut odit, modi nisi voluptas aliquam tempora
        maxime nostrum qui recusandae voluptatibus.
      </p>

      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias sint, earum sapiente iure
        voluptate, odio consequuntur facere molestias aut odit, modi nisi voluptas aliquam tempora
        maxime nostrum qui recusandae voluptatibus.
      </p>

      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias sint, earum sapiente iure
        voluptate, odio consequuntur facere molestias aut odit, modi nisi voluptas aliquam tempora
        maxime nostrum qui recusandae voluptatibus.
      </p>
    </motion.div>
  )
}

export default React.memo(ContentPlaceholder)
