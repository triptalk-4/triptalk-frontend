import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MainCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <MainContainer>
      <Slider {...settings}>
        <div>
          <Img src="public/img/Carousel.png" />
        </div>
        <div>
          <Img src="public/img/addimg.jpg" />
        </div>
        <div>
          <Img src="public/img/Boast.jpg" />
        </div>
      </Slider>
    </MainContainer>
  );
};

export default MainCarousel;

const MainContainer = styled.div`
  width: 100%;
  height: 400px;
`;

const Img = styled.img`
  width: 100%;
  height: 400px;
  cursor: pointer;
`;
