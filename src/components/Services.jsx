import Glide from "@glidejs/glide"
import React, { useState, useEffect } from "react"
import {
  HTMLIcon,
  CSSIcon,
  CodeIcon,
  WordPressIcon,
  ReactIcon,
  ArrowIcon,
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
        <ul className="glide__slides justify-center py-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="glide__slide bg-white rounded-lg shadow-lg flex flex-col justify-between h-auto py-6 px-5"
            >
              {printIcon(service.icon)}
              <h2 className="text-2xl text-center capitalize mt-1">
                {service.title}
              </h2>
              <p className="text-base text-center mt-2">{service.content}</p>
            </div>
          ))}
        </ul>
      </div>

      <div className="glide__arrows" data-glide-el="controls">
        <button
          className="glide__arrow glide__arrow--left rounded-full bg-indigo-700 hover:bg-indigo-500 text-white border-none left-0 transition-all transition-250"
          data-glide-dir="<"
        >
          <ArrowIcon className="fill-current text-white h-5 w-5 rotate-180" />
        </button>
        <button
          className="glide__arrow glide__arrow--right rounded-full bg-indigo-700 hover:bg-indigo-500 text-white border-none right-0 transition-all transition-250"
          data-glide-dir=">"
        >
          <ArrowIcon className="fill-current text-white h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
