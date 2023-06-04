import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import AnimateIn from './animateIn';
import styles from '@/styles/Home.module.css'
import Box from '@mui/material/Box';


const createCarouselItemImage = (image: string, texts: string[], descriptionTitles: string[], imageIndex: number | undefined) => (
  <React.Fragment key={image}>
    <AnimateIn>
      <div>
        <img src={image} />
        {imageIndex === 1 &&
          <div className={styles.project_description}>
            {texts.map((text, index) => (
              <Box marginBottom={2}>
                <>
                  <p className={styles.project_description_title}>
                    {descriptionTitles[index]}
                  </p>
                  <p>
                    {text.toUpperCase()}
                  </p>
                </>
              </Box>
            ))}
          </div>
        }
      </div>
    </AnimateIn>
  </React.Fragment>
);

type CarouselProps = {
  images: string[]
  text: string[][]
  descriptionTitles: string[][]
  index: number
}

const NextJsCarousel = ({ images, text, index, descriptionTitles }: CarouselProps) => {
  console.log(index, (index && text) && text[index])
  const baseChildren = <div>{images &&
    images.map((image, imageIndex) => createCarouselItemImage(image, text[index], descriptionTitles[index], imageIndex))
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