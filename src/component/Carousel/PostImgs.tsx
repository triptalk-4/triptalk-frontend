import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Mousewheel, Keyboard, Pagination, Navigation } from 'swiper/modules';
import styled from 'styled-components';
import { MAIN_COLOR } from '../../color/color';

const postImgUrl = [
  { imgUrl: '/img/Travelimg2.jpg' },
  { imgUrl: '/img/Travelimg1.jpg' },
  { imgUrl: '/img/Travelimg5.jpg' },
  { imgUrl: '/img/Travelimg6.jpg' },
];

export default function PostImgs() {
  return (
    <StyledPostImgs>
      <StyledSwiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={false}
        keyboard={true}
        modules={[Pagination, Navigation, Mousewheel, Keyboard]}>
        {postImgUrl.map((item, index) => (
          <StyledSwiperSlide key={index}>
            <SwiperImage src={item.imgUrl} />
          </StyledSwiperSlide>
        ))}
      </StyledSwiper>
      <style>
        {`
        /* 버튼 스타일 */
        .swiper-button-prev { 
          color: ${MAIN_COLOR};         
        }

        .swiper-button-next {
          color: ${MAIN_COLOR}; 
        }
      `}
      </style>
    </StyledPostImgs>
  );
}

const StyledPostImgs = styled.div`
  width: 60%;
  height: 400px;
  border-radius: 15px 0 0 15px;
  display: flex;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  background-color: #fff;
  background-position: center;
  background-size: cover;
  width: 400px;
  height: 400px;
`;

const SwiperImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
