import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination } from 'swiper/modules';
import { MAIN_COLOR } from '../../../color/color';

export default function SwiperImg() {
  return (
    <>
      <StyledSwiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination]}
        className="mySwiper">
        <StyledSwiperSlide>
          <StyledImage src="img/Travelimg1.jpg" alt="Image 1" />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <StyledImage src="img/Travelimg5.jpg" alt="Image 1" />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <StyledImage src="img/Travelimg2.jpg" alt="Image 1" />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <StyledImage src="img/Travelimg1.jpg" alt="Image 1" />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <StyledImage src="img/Travelimg5.jpg" alt="Image 1" />
        </StyledSwiperSlide>
      </StyledSwiper>
      <style>
        {`
        /* 활성화 */
        .swiper-pagination-bullet-active {
          width: 12px; 
          height: 12px; 
          margin: 0 4px; 
        }
    
        /* 비활성화 */
        .swiper-pagination-bullet {
          background-color:${MAIN_COLOR}; 
          width: 8px;
          height: 8px;
          margin: 0 4px; 
        }
        
      `}
      </style>
    </>
  );
}

const StyledSwiper = styled(Swiper)`
  width: 100%;
`;

const StyledSwiperSlide = styled(SwiperSlide)``;

const StyledImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
