import styled from 'styled-components';
import TravelCarousel from '../../component/Carousel/TravelCarousel';
import DetailPopUp from './PopUp/DetailPopUp';
import { useState, useEffect } from 'react';

interface travelItem {
  imgUrl: string;
  title: string;
  nickname: string;
  address: string;
  date: string;
  heartCount: number;
  lookUpCount: number;
}

export default function Travel() {
  const [travelsData, setTravelsData] = useState<travelItem[]>([]); // msw
  // const [selectedRegion, setSelectedRegion] = useState(''); // 선택한 지역
  // const [selectedOrder, setSelectedOrder] = useState(''); // 선택한 순서

  useEffect(() => {
    fetch('/api/travels')
      .then(res => res.json())
      .then(data => setTravelsData(data))
      .catch(error => console.error('가짜 API 요청 실패:', error));
  }, []);

  return (
    <TravelContainer>
      <TravelTitleContainer>
        <TravelTitle>국내 다양한 여행지를 둘러보세요.</TravelTitle>
        <TravelSelectBox>
          {/* <TravelSelect /> */}
          <DetailPopUp travelsData={travelsData} setTravelsData={setTravelsData} />
        </TravelSelectBox>
      </TravelTitleContainer>
      <TravelCarouselContainer>
        <TravelCarousel data={travelsData} />
      </TravelCarouselContainer>
    </TravelContainer>
  );
}

const TravelContainer = styled.div`
  width: 80%;
  margin: 65px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TravelTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TravelTitle = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

const TravelSelectBox = styled.div`
  width: 300px;
`;

const TravelCarouselContainer = styled.div``;
