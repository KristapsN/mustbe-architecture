import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import AnimateIn from './animateIn';
import styles from '@/styles/Home.module.css'
import Box from '@mui/material/Box';


const createCarouselItemImage = (image: string, texts: string[] | undefined, descriptionTitles: string[] | undefined, imageIndex: number | undefined) => (
  <React.Fragment key={image}>
    <AnimateIn>
      <Box>
      <Box className={styles.project_image} sx={{ backgroundImage:`url(${image})` }}/>
        {imageIndex === 1 &&
          <div className={styles.project_description}>
            {texts?.map((text, index) => (
              <Box marginBottom={2} key={index}>
                <>
                  <p className={styles.project_description_title}>
                    {descriptionTitles === undefined ? '' : descriptionTitles[index]}
                  </p>
                  <p>
                    {text === undefined ? '' : text.toUpperCase()}
                  </p>
                </>
              </Box>
            ))}
          </div>
        }
      </Box>
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
  const baseChildren = <Box>{images &&
    images.map((image, imageIndex) => createCarouselItemImage(image, text[index], descriptionTitles[index], imageIndex))
  }</Box>;

  return (
    <>
      <Carousel
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        showArrows={true}
        infiniteLoop={true}
        swipeable={false}
        transitionTime={200}
        animationHandler='fade'
        emulateTouch
      >
        {baseChildren.props.children}
      </Carousel>
    </>
  );
}

export default NextJsCarousel