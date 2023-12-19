import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import AnimateIn from './animateIn';
import styles from '@/styles/Home.module.css'
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';


const createCarouselItemImage = (
  image: string,
  texts: string[] | undefined,
  descriptionTitles: string[] | undefined,
  imageIndex: number | undefined,
  lastImageIndex: number | undefined
) => (
  <React.Fragment key={image}>
    <AnimateIn>
      <Box>
        <Box className={`${imageIndex === lastImageIndex && styles.project_image_last} ${styles.project_image}`} sx={{ backgroundImage: `url(${image})` }} />
        {imageIndex === lastImageIndex &&
          <div className={styles.project_description}>
            {texts?.map((text, index) => (
              <Box marginBottom={2} key={index} sx={{ height: '100%' }}>
                <>
                  <Divider sx={{ background: 'black'}}/>
                  <Box sx={{ marginTop: '10px'}}>
                    <h2>
                      {descriptionTitles === undefined ? '' : descriptionTitles[index]}
                    </h2>
                    <p className={styles.contact_subtitle}>
                      {text === undefined ? '' : text.toUpperCase()}
                    </p>
                  </Box>
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
    images.map((image, imageIndex) => createCarouselItemImage(
      image,
      text[index],
      descriptionTitles[index],
      imageIndex,
      images.length - 1
    ))
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