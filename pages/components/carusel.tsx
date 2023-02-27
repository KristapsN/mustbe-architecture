import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

// export default class NextJsCarousel extends Component {
const NextJsCarousel = () => {
  // render() {
    return (
      <div>
        <Carousel showStatus={false} showThumbs={false}>
          <div>
            <img src="/thumbnail_1.jpg" alt="image1" />
          </div>
          <div>
            <img src="/thumbnail_1.jpg"  alt="image2" />
          </div>
          <div>
            <img src="/thumbnail_1.jpg" alt="image3" />
          </div>
          <div>
            <img src="/thumbnail_1.jpg" alt="image4" />
          </div>
          <div>
            <img src="/thumbnail_1.jpg" alt="image5" />
          </div>
        </Carousel>
      </div>
    );
  }
// };

export default NextJsCarousel