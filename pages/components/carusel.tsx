import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import AnimateIn from './animateIn';
import styles from '@/styles/Home.module.css'
import Box from '@mui/material/Box';


const createCarouselItemImage = (image: string, texts: string[] | undefined, imageIndex: number | undefined) => (
  <React.Fragment key={image}>
    <AnimateIn>
      <div>
        <img src={image} />
        {imageIndex === 1 &&
          <div className={styles.project_description}>
            <Box marginBottom={2}>
              <p className={styles.project_description_title}>
                Autors:
              </p>
              <p>
                {texts ? texts[0] : '-'}
              </p>
            </Box>
            <Box marginBottom={2}>
              <p className={styles.project_description_title}>
                Vizuālizācijas:
              </p>
              <p>
                {texts ? texts[1] : '-'}
              </p>
            </Box>
            <Box marginBottom={2}>
              <p className={styles.project_description_title}>
                Adrese:
              </p>
              <p>
                {texts ? texts[2] : '-'}
              </p>
            </Box>
            <Box marginBottom={2}>
              <p className={styles.project_description_title}>
                Vizuālizācijas:
              </p>
              <p>
                {texts ? texts[3] : '-'}
              </p>
            </Box>
            <Box marginBottom={2}>
              <p className={styles.project_description_title}>
                Statuss:
              </p>
              <p>
                {texts ? texts[4] : '-'}
              </p>
            </Box>
            <Box marginBottom={2}>
              <p className={styles.project_description_title}>
                Statuss:
              </p>
              <p>
                {texts ? texts[5] : '-'}
              </p>
            </Box>
            <Box marginBottom={2}>
              <p className={styles.project_description_title}>
                Statuss:
              </p>
              <p>
                {texts ? texts[6] : '-'}
              </p>
            </Box>
            <Box marginBottom={2}>
              <p className={styles.project_description_title}>
                Statuss:
              </p>
              <p>
                {texts ? texts[6] : '-'}
              </p>
            </Box>
          </div>
        }
      </div>
    </AnimateIn>
  </React.Fragment>
);

type CarouselProps = {
  images: string[]
  text: string[][]
  index: number
}

const NextJsCarousel = ({ images, text, index }: CarouselProps) => {
  console.log(index, (index && text) && text[index])
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