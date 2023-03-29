import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

// export default class NextJsCarousel extends Component {


const createCarouselItemImage = (image: string) => (
  <div key={image}>
    <img src={image} />
  </div>
);

type CarouselProps = {
  images: string[]
}


const NextJsCarousel = ({images}: CarouselProps) => {

  const baseChildren = <div>{images.map((image) => createCarouselItemImage(image))}</div>;
  return (
    <>
      <Carousel showStatus={false} showThumbs={false} emulateTouch>
        {baseChildren.props.children}
      </Carousel>
    </>
  );
}

export default NextJsCarousel