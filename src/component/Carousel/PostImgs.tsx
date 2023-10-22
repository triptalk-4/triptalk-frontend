import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Mousewheel, Keyboard, Pagination, Navigation } from 'swiper/modules';
import styled from 'styled-components';
import { MAIN_COLOR } from '../../color/color';

interface PlannerDetails {
  imagesUrl: string[];
}

export default function PostImgs({ imagesUrl }: PlannerDetails) {
  return (
    <StyledPostImgs>
      <StyledSwiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={false}
        keyboard={true}
        modules={[Pagination, Navigation, Mousewheel, Keyboard]}>
        {imagesUrl?.map((imageUrl, index) => (
          <StyledSwiperSlide key={index}>
            <SwiperImage src={imageUrl} />
          </StyledSwiperSlide>
        ))}
      </StyledSwiper>
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
  .swiper-button-prev,
  .swiper-button-next {
    color: ${MAIN_COLOR};
  }
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
