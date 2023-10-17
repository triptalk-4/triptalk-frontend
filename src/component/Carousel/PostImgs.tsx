import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Mousewheel, Keyboard, Pagination, Navigation } from 'swiper/modules';
import styled from 'styled-components';
import { MAIN_COLOR } from '../../color/color';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface DetailType {
  userId: number;
  date: string;
  placeResponse: {
    placeName: string;
    roadAddress: string;
    addressName: string;
    latitude: number;
    longitude: number;
  };
  description: string;
  imagesUrl: string[];
}

interface PostImgsProps {
  imagesUrl: string[];
}

export default function PostImgs({ imagesUrl }: PostImgsProps) {
  const { plannerId } = useParams();
  const [, setUserImgCarousels] = useState<DetailType[]>([]);
  const token = useSelector((state: RootState) => state.token.token);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchDetailPage = async () => {
      try {
        const response = await axios.get(`/address/api/plans/${plannerId}/details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.plannerDetailResponse) {
          const plannerDetails: DetailType[] = response.data.plannerDetailResponse;
          setUserImgCarousels(plannerDetails);
        } else {
          console.log(response);
          alert('사용자 정보가 없습니다 상세페이지확인해주세요');
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 오류 확인바람(상세페이지):', error);
      }
    };

    fetchDetailPage();
  }, [token, plannerId]);

  return (
    <StyledPostImgs>
      <StyledSwiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={false}
        keyboard={true}
        modules={[Pagination, Navigation, Mousewheel, Keyboard]}>
        {imagesUrl.map((imageUrl, index) => (
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
