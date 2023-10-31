import Slider, { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled, { css } from 'styled-components';
import { MAIN_COLOR } from '../../color/color';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

interface PlannerDetails {
  imagesUrl: string[];
}

export default function PostImgs({ imagesUrl }: PlannerDetails) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  function PrevArrow(props: CustomArrowProps) {
    const { onClick } = props;
    return (
      <PrevArrowButton onClick={onClick}>
        <MdOutlineKeyboardArrowLeft />
      </PrevArrowButton>
    );
  }

  function NextArrow(props: CustomArrowProps) {
    const { onClick } = props;
    return (
      <NextArrowButton onClick={onClick}>
        <MdOutlineKeyboardArrowRight />
      </NextArrowButton>
    );
  }

  return (
    <StyledPostImgs>
      <StyledSlider {...settings}>
        {imagesUrl?.map((imageUrl, index) => (
          <StyledSwiperSlide key={index}>
            <SwiperImage src={imageUrl} />
          </StyledSwiperSlide>
        ))}
      </StyledSlider>
    </StyledPostImgs>
  );
}

const StyledPostImgs = styled.div`
  width: 60%;
  height: 400px;
  border-radius: 15px 0 0 15px;
  display: flex;
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #fff;

  .slick-dots {
    bottom: 3px;
    width: auto;
    border-radius: 10.5px;
    z-index: 10;

    li {
      button {
        &::before {
          position: static;
          font-size: 10px;
          color: #fff;
        }
      }
    }
  }
`;

const StyledSwiperSlide = styled.div`
  background-position: center;
  background-size: cover;
  height: 400px;
`;

const SwiperImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const BtnStyle = css`
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  font-size: 40px;
  cursor: pointer;
  color: ${MAIN_COLOR};
`;

const PrevArrowButton = styled.div`
  ${BtnStyle}
`;

const NextArrowButton = styled.div`
  ${BtnStyle}
`;
