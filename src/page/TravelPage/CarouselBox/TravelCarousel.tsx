import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import styled, { css } from 'styled-components';
import { MAIN_COLOR } from '../../../color/color';
import { Link } from 'react-router-dom';

const travelData = [
  {
    imageUrl: 'img/Travelimg2.jpg',
    title: '성심당 빵 털기',
    nickname: '도토리1',
    address: '대전광역시 중구 대종로480번길 15',
    date: '23.09.25',
  },
  {
    imageUrl: 'img/Travelimg1.jpg',
    title: '서울 궁궐',
    nickname: '도토리2',
    address: '대전광역시 중구 대종로480번길 15',
    date: '23.09.26',
  },
  {
    imageUrl: 'img/Travelimg5.jpg',
    title: '뚜벅이',
    nickname: '도토리3',
    address: '대전광역시 중구 대종로480번길 15',
    date: '23.09.27',
  },
  {
    imageUrl: 'img/Travelimg1.jpg',
    title: '꿈돌이',
    nickname: '도토리4',
    address: '대전광역시 중구 대종로480번길 15',
    date: '23.09.28',
  },
  {
    imageUrl: 'img/Travelimg2.jpg',
    title: '서울 궁궐',
    nickname: '도토리5',
    address: '대전광역시 중구 대종로480번길 15',
    date: '23.09.29',
  },
  {
    imageUrl: 'img/Travelimg5.jpg',
    title: '힐링',
    nickname: '도토리6',
    address: '대전광역시 유성구 봉명동 574',
    date: '23.09.30',
  },
  {
    imageUrl: 'img/Travelimg1.jpg',
    title: '비건 맛집',
    nickname: '도토리7',
    address: '대전 유성구 농대로 15 신협3층',
    date: '23.10.01',
  },
  {
    imageUrl: 'img/Travelimg2.jpg',
    title: '글루텐프리빵집들~',
    nickname: '도토리8',
    address: '대전광역시 유성구 지족동 917-5',
    date: '23.10.02',
  },
  {
    imageUrl: 'img/Travelimg5.jpg',
    title: '서울 대전 빵털기',
    nickname: '도토리9',
    address: '대전 유성구 온천북로33번길 22-3 101호',
    date: '23.10.03',
  },
];

export default function TravelCarousel() {
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
        {travelData.map((item, index) => (
          <StyledSwiperSlide key={index}>
            <Link to="/schedule">
              <SwiperImage src={item.imageUrl} />
              {/* 나중에 SwiperImg컨포넌트 추가 예정 */}
              <SwiperText>
                <SwiperTopText>
                  <SwiperTitle>{item.title}</SwiperTitle>
                  <SwiperNickname>
                    <MyProfile></MyProfile>
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
`;

const MyProfile = styled.div`
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
