import Glide from "@glidejs/glide"
import React, { useState, useEffect } from "react"
import {
  HTMLIcon,
  CSSIcon,
  CodeIcon,
  SEOIcon,
  WordPressIcon,
  ReactIcon,
} from "./"

export default ({ element = "glide", services, options }) => {
  const [slider] = useState(new Glide(`.${element}`, options))

  useEffect(() => {
    slider.mount()

    return () => slider.destroy()
  }, [])

  const printIcon = icon => {
    switch (icon) {
      case "html":
        return (
          <HTMLIcon className="h-16 w-16 text-indigo-700 fill-current mx-auto" />
        )
      case "css":
        return (
          <CSSIcon className="h-16 w-16 text-indigo-700 fill-current mx-auto" />
        )
      case "code":
        return (
          <CodeIcon className="h-16 w-16 text-indigo-700 fill-current mx-auto" />
        )
      case "seo":
        return (
          <SEOIcon className="h-16 w-16 text-indigo-700 fill-current mx-auto" />
        )
      case "wordpress":
        return (
          <WordPressIcon className="h-16 w-16 text-indigo-700 fill-current mx-auto" />
        )
      case "react":
        return (
          <ReactIcon className="h-16 w-16 text-indigo-700 fill-current mx-auto" />
        )
      default:
        break
    }
  }

  return (
    <div className={element}>
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides py-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="glide__slide bg-white rounded shadow-md py-6 px-10 flex content-between self-stretch flex-col h-full"
            >
              {printIcon(service.icon)}
              <h2 className="text-2xl text-center capitalize mt-1">
                {service.title}
              </h2>
              <p className="text-base text-center mt-2">{service.content}</p>
            </div>
          ))}
          {/* {children.map((slide, index) => {
            return React.cloneElement(slide, {
              key: index,
              className: `${slide.props.className} glide__slide`,
            })
          })} */}
        </ul>
      </div>

      <div className="glide__arrows" data-glide-el="controls">
        <button
          className="glide__arrow glide__arrow--left rounded-full bg-indigo-700 text-white border-none"
          data-glide-dir="<"
        >
          Prev
        </button>
        <button
          className="glide__arrow glide__arrow--right rounded-full bg-indigo-700 text-white border-none"
          data-glide-dir=">"
        >
          Next
        </button>
      </div>
    </div>
  )
}
