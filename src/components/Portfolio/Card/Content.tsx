// Dependencies
import * as React from 'react'
import { motion, useInvertedScale } from 'framer-motion'
import Markdown from 'react-markdown'

function ContentPlaceholder({ body }: { body: string }): JSX.Element {
  const inverted = useInvertedScale()

  // Render
  return (
    <motion.div className="content-container" style={{ ...inverted, originY: 0, originX: 0 }}>
      <Markdown
        className="max-w-full py-5 text-lg prose text-justify text-primary"
        source={body}
        escapeHtml={false}
      />
    </motion.div>
  )
}

export default React.memo(ContentPlaceholder)
