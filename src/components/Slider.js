import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import image1 from "../assets/banner/banner6.webp"
import image2 from "../assets/banner/banner5.webp"
import image3 from "../assets/banner/banner4.webp"
import image4 from "../assets/banner/banner2.webp"
import image5 from "../assets/banner/banner3.webp"

const Slider = () => {
  const imageUrls = [image1, image2, image3, image4, image5]

  return (
    <div className="lg:mt-5">
      <Carousel
        showThumbs={false}
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        transitionTime={2}
        autoPlay={true}
      >
        {imageUrls.map((url) => (
          <img
            key={url}
            className={`w-full lg:max-h-[350px] object-contain px-2 py-2`}
            src={url}
            alt="poster"
          />
        ))}
      </Carousel>
    </div>
  )
}

export default Slider
