import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import styled, { css } from 'styled-components';
import { MAIN_COLOR } from '../../../color/color';
import { Link } from 'react-router-dom';

interface TravelCarouselProps {
  data: travelItem[];
}

interface travelItem {
  imgUrl: string;
  title: string;
  nickname: string;
  address: string;
  date: string;
  heartCount: number;
  lookUpCount: number;
}

export default function TravelCarousel({ data }: TravelCarouselProps) {
  return (
    <>
      <StyledSwiper
        effect={'coverflow'}
        grabCursor={false}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: -100,
          depth: 500,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={false}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}>
        {data.map((item, index) => (
          <StyledSwiperSlide key={index}>
            <Link to="/schedule">
              <SwiperImage src={item.imgUrl} />
              {/* 나중에 SwiperImg컨포넌트 추가 예정 */}
              <SwiperText>
                <SwiperTopText>
                  <SwiperTitle> {item.title.length > 10 ? item.title.slice(0, 10) + '...' : item.title}</SwiperTitle>
                  <SwiperNickname>
                    <UserProfile src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                    {item.nickname}
                  </SwiperNickname>
                </SwiperTopText>
                <SwiperBottomText>
                  <SwiperAddress>{item.address}</SwiperAddress>
                  <SwiperDate>{item.date}</SwiperDate>
                </SwiperBottomText>
              </SwiperText>
            </Link>
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
    </>
  );
}

const StyledSwiper = styled(Swiper)`
  width: 100%;
  padding-top: 55px;
  padding-bottom: 200px;
  margin-bottom: 40px;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  background-position: center;
  background-size: cover;
  width: 400px;
  height: 400px;
`;

const SwiperImage = styled.img`
  display: block;
  width: 100%;
  cursor: pointer;
  position: relative;
`;

const SwiperText = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  bottom: -200px;
  width: 100%;
  height: 100%;
  padding: 0 15px 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 100) 0%, rgba(0, 0, 0, 0) 100%);
`;

const SwiperTopText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SwiperBottomText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextColor = css`
  color: #fff;
`;

const SwiperTitle = styled.div`
  ${TextColor}
  font-size: 25px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const UserProfile = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background-color: #fff;
  margin-right: 10px;
`;

const SwiperNickname = styled.div`
  ${TextColor}
  display: flex;
  align-items: center;
`;

const SwiperAddress = styled.div`
  ${TextColor}
  font-weight: 300;
`;

const SwiperDate = styled.div`
  ${TextColor}
  font-size: 15px;
  font-weight: 300;
`;
