import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { catamaranLight } from '..';
import AnimateIn from './animateIn';

const createCarouselItemImage = (image: string, text: string, imageIndex: number) => (
  <React.Fragment key={image}>
    <AnimateIn>
      <div>
        <img src={image} />
        {imageIndex === 1 &&
          <p
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              margin: '0 auto',
              top: 10,
              padding: 20
            }}
            className={`${catamaranLight.className}`}>
            {text}
          </p>
        }
      </div>
    </AnimateIn>
  </React.Fragment>
);

type CarouselProps = {
  images: string[]
  text: string[]
  index: number
}

const NextJsCarousel = ({ images, text, index }: CarouselProps) => {

  const baseChildren = <div>{images &&
    images.map((image, imageIndex) => createCarouselItemImage(image, text[index], imageIndex))
  }</div>;

  return (
    <>
      <Carousel
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        showArrows={true}
        infiniteLoop={true}
        swipeable={false}
        transitionTime={500}
        animationHandler='fade'
        emulateTouch
      >
        {baseChildren.props.children}
      </Carousel>
    </>
  );
}

export default NextJsCarousel