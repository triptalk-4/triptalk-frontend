import styled from 'styled-components';
import TravelCarousel from '../../component/Carousel/TravelCarousel';
import DetailPopUp from './PopUp/DetailPopUp';
import { useState } from 'react';

const defaultTravelsData = [
  // 서울
  {
    imgUrl: 'img/Travelimg1.jpg',
    title: '서울 여행 1',
    nickname: '모험가',
    address: '서울시 강남구 강남대로 123번길 45',
    date: '10/01/2023',
    heartCount: 5,
    lookUpCount: 5,
  },
  {
    imgUrl: 'img/Travelimg2.jpg',
    title: '서울 여행 2',
    nickname: '여행가2',
    address: '서울시 강북구 강북로 789번길 10',
    date: '10/05/2023',
    heartCount: 10,
    lookUpCount: 7,
  },
  {
    imgUrl: 'img/Travelimg3.jpg',
    title: '서울 힐링 여행',
    nickname: '힐링객',
    address: '서울시 마포구 마포로 56',
    date: '10/10/2023',
    heartCount: 8,
    lookUpCount: 12,
  },
  {
    imgUrl: 'img/Travelimg4.jpg',
    title: '서울 문화 탐방',
    nickname: '문화인',
    address: '서울시 종로구 종로 1010',
    date: '11/05/2023',
    heartCount: 9,
    lookUpCount: 15,
  },
  {
    imgUrl: 'img/Travelimg5.jpg',
    title: '서울 도심 힐링',
    nickname: '도시탐험',
    address: '서울시 중구 명동길 567',
    date: '11/15/2023',
    heartCount: 12,
    lookUpCount: 9,
  },
  // 부산
  {
    imgUrl: 'img/Travelimg6.jpg',
    title: '부산 해변 휴식 1',
    nickname: '해변휴식',
    address: '부산 해운대구 해운대해변로 123',
    date: '10/15/2023',
    heartCount: 10,
    lookUpCount: 14,
  },
  {
    imgUrl: 'img/Travelimg7.jpg',
    title: '부산 바닷가 휴가 2',
    nickname: '바닷객2',
    address: '부산 해운대구 해운대해변로 456',
    date: '11/01/2023',
    heartCount: 13,
    lookUpCount: 10,
  },
  {
    imgUrl: 'img/Travelimg8.jpg',
    title: '부산 자연 탐방',
    nickname: '자연탐험',
    address: '부산 서구 서로 789',
    date: '11/10/2023',
    heartCount: 11,
    lookUpCount: 15,
  },
  {
    imgUrl: 'img/Travelimg9.jpg',
    title: '부산 힐링 여행 2',
    nickname: '부산힐러2',
    address: '부산 남구 남로 101',
    date: '11/20/2023',
    heartCount: 16,
    lookUpCount: 11,
  },
  {
    imgUrl: 'img/Travelimg10.jpg',
    title: '부산 시티 투어',
    nickname: '도시탐험2',
    address: '부산 동구 동로 345',
    date: '11/25/2023',
    heartCount: 17,
    lookUpCount: 18,
  },
  // 대구
  {
    imgUrl: 'img/Travelimg11.jpg',
    title: '대구 랜드마크 탐방',
    nickname: '대구탐험가',
    address: '대구 중구 대구로 1234번길 56',
    date: '12/01/2023',
    heartCount: 10,
    lookUpCount: 11,
  },
  {
    imgUrl: 'img/Travelimg12.jpg',
    title: '대구 국립박물관 투어',
    nickname: '역사탐험가',
    address: '대구 동구 동로 789',
    date: '12/10/2023',
    heartCount: 8,
    lookUpCount: 12,
  },
  // 인천
  {
    imgUrl: 'img/Travelimg13.jpg',
    title: '인천 해안산책',
    nickname: '바다감상가',
    address: '인천 중구 인천로 567',
    date: '12/15/2023',
    heartCount: 12,
    lookUpCount: 9,
  },
  {
    imgUrl: 'img/Travelimg14.jpg',
    title: '인천 하늘공원 피크닉',
    nickname: '피크닉러',
    address: '인천 남구 남로 101',
    date: '12/20/2023',
    heartCount: 14,
    lookUpCount: 10,
  },
  // 광주
  {
    imgUrl: 'img/Travelimg15.jpg',
    title: '광주 예술의 거리',
    nickname: '예술감상가',
    address: '광주 남구 예술로 123',
    date: '01/05/2023',
    heartCount: 15,
    lookUpCount: 8,
  },
  {
    imgUrl: 'img/Travelimg16.jpg',
    title: '광주 밤의 문화 투어',
    nickname: '밤문화탐험가',
    address: '광주 동구 밤로 567',
    date: '01/10/2023',
    heartCount: 11,
    lookUpCount: 16,
  },
  {
    imgUrl: 'img/Travelimg17.jpg',
    title: '광주 동물원 탐방',
    nickname: '동물감상가',
    address: '광주 서구 동물원로 123',
    date: '04/01/2023',
    heartCount: 16,
    lookUpCount: 10,
  },
  // 대전
  {
    imgUrl: 'img/Travelimg17.jpg',
    title: '대전 과학 박물관 탐방',
    nickname: '과학기술인',
    address: '대전 중구 과학로 1234',
    date: '02/15/2023',
    heartCount: 14,
    lookUpCount: 7,
  },
  {
    imgUrl: 'img/Travelimg18.jpg',
    title: '대전 미술관 투어',
    nickname: '미술감상가',
    address: '대전 동구 미술로 567',
    date: '02/20/2023',
    heartCount: 9,
    lookUpCount: 13,
  },
  //울산
  {
    imgUrl: 'img/Travelimg19.jpg',
    title: '울산 해양 생물관 구경',
    nickname: '해양탐험가',
    address: '울산 중구 바다로 123',
    date: '03/01/2023',
    heartCount: 17,
    lookUpCount: 10,
  },
  {
    imgUrl: 'img/Travelimg20.jpg',
    title: '울산 자연 공원 하이킹',
    nickname: '하이킹러',
    address: '울산 동구 산로 567',
    date: '03/10/2023',
    heartCount: 12,
    lookUpCount: 18,
  },
  {
    imgUrl: 'img/Travelimg21.jpg',
    title: '울산 힐링 스파 여행',
    nickname: '힐링러',
    address: '울산 남구 스파로 123',
    date: '04/15/2023',
    heartCount: 12,
    lookUpCount: 9,
  },
  // 세종
  {
    imgUrl: 'img/Travelimg21.jpg',
    title: '세종 시립 도서관 방문',
    nickname: '독서감상가',
    address: '세종특별자치시 도서로 123',
    date: '04/05/2023',
    heartCount: 8,
    lookUpCount: 7,
  },
  {
    imgUrl: 'img/Travelimg22.jpg',
    title: '세종 호수공원 피크닉',
    nickname: '피크닉러',
    address: '세종특별자치시 호수로 567',
    date: '04/10/2023',
    heartCount: 14,
    lookUpCount: 9,
  },
  // 경기도
  {
    imgUrl: 'img/Travelimg23.jpg',
    title: '경기도 천문대 관람',
    nickname: '천문학가',
    address: '경기도 수원시 천문로 123',
    date: '05/15/2023',
    heartCount: 20,
    lookUpCount: 11,
  },
  {
    imgUrl: 'img/Travelimg24.jpg',
    title: '경기도 동물원 투어',
    nickname: '동물감상가',
    address: '경기도 안양시 동물로 567',
    date: '05/20/2023',
    heartCount: 16,
    lookUpCount: 14,
  },
  //강원도
  {
    imgUrl: 'img/Travelimg25.jpg',
    title: '강원도 스키장 휴가',
    nickname: '스키감상가',
    address: '강원도 평창군 스키로 123',
    date: '06/01/2023',
    heartCount: 18,
    lookUpCount: 12,
  },
  {
    imgUrl: 'img/Travelimg26.jpg',
    title: '강원도 동해안 드라이브',
    nickname: '드라이브러',
    address: '강원도 삼척시 바다로 567',
    date: '06/10/2023',
    heartCount: 9,
    lookUpCount: 15,
  },
  //충북
  {
    imgUrl: 'img/Travelimg27.jpg',
    title: '충북 한옥마을 투어',
    nickname: '한옥감상가',
    address: '충북 충주시 한옥로 123',
    date: '07/15/2023',
    heartCount: 10,
    lookUpCount: 14,
  },
  {
    imgUrl: 'img/Travelimg28.jpg',
    title: '충북 백제문화마을 탐방',
    nickname: '역사탐험가',
    address: '충북 제천시 백제로 567',
    date: '07/20/2023',
    heartCount: 13,
    lookUpCount: 11,
  },
  // 충남
  {
    imgUrl: 'img/Travelimg29.jpg',
    title: '충남 한우 먹방',
    nickname: '음식탐험가',
    address: '충남 아산시 한우로 123',
    date: '08/01/2023',
    heartCount: 12,
    lookUpCount: 15,
  },
  {
    imgUrl: 'img/Travelimg30.jpg',
    title: '충남 낙동강 자전거 여행',
    nickname: '자전거탐험가',
    address: '충남 서산시 낙동강로 567',
    date: '08/10/2023',
    heartCount: 11,
    lookUpCount: 9,
  },
  // 전북
  {
    imgUrl: 'img/Travelimg31.jpg',
    title: '전북 전주 한옥마을 투어',
    nickname: '한옥감상가',
    address: '전북 전주시 한옥로 123',
    date: '09/15/2023',
    heartCount: 14,
    lookUpCount: 16,
  },
  {
    imgUrl: 'img/Travelimg32.jpg',
    title: '전북 민속마을 탐방',
    nickname: '민속문화탐험가',
    address: '전북 완주군 민속로 567',
    date: '09/20/2023',
    heartCount: 12,
    lookUpCount: 18,
  },
  // 전남
  {
    imgUrl: 'img/Travelimg33.jpg',
    title: '전남 해수욕장 휴가',
    nickname: '바닷가휴식러',
    address: '전남 여수시 해수욕로 123',
    date: '10/01/2023',
    heartCount: 10,
    lookUpCount: 11,
  },
  {
    imgUrl: 'img/Travelimg34.jpg',
    title: '전남 섬 여행',
    nickname: '섬탐험가',
    address: '전남 완도군 섬로 567',
    date: '10/10/2023',
    heartCount: 11,
    lookUpCount: 12,
  },
  // 경북
  {
    imgUrl: 'img/Travelimg35.jpg',
    title: '경북 한옥마을 투어',
    nickname: '한옥감상가',
    address: '경북 경주시 한옥로 123',
    date: '11/15/2023',
    heartCount: 14,
    lookUpCount: 15,
  },
  {
    imgUrl: 'img/Travelimg36.jpg',
    title: '경북 경주 유적지 탐방',
    nickname: '역사탐험가',
    address: '경북 경주시 유적로 567',
    date: '11/20/2023',
    heartCount: 10,
    lookUpCount: 14,
  },
  // 경남
  {
    imgUrl: 'img/Travelimg37.jpg',
    title: '경남 바닷가 휴식',
    nickname: '바닷가휴식러',
    address: '경남 통영시 바닷가로 123',
    date: '12/01/2023',
    heartCount: 12,
    lookUpCount: 11,
  },
  {
    imgUrl: 'img/Travelimg38.jpg',
    title: '경남 산림욕 투어',
    nickname: '산림힐링러',
    address: '경남 밀양시 산림로 567',
    date: '12/10/2023',
    heartCount: 15,
    lookUpCount: 12,
  },
  // 제주도
  {
    imgUrl: 'img/Travelimg39.jpg',
    title: '제주도 해변 휴식',
    nickname: '제주해변',
    address: '제주도 제주시 성산읍 123-45',
    date: '01/05/2024',
    heartCount: 10,
    lookUpCount: 14,
  },
  {
    imgUrl: 'img/Travelimg40.jpg',
    title: '제주도 자연 탐방 2',
    nickname: '제주탐험2',
    address: '제주도 제주시 중문로 678',
    date: '01/10/2024',
    heartCount: 14,
    lookUpCount: 9,
  },
];

interface travelItem {
  imgUrl: string;
  title: string;
  nickname: string;
  address: string;
  date: string;
  heartCount: number;
  lookUpCount: number;
}

export default function TravelMap() {
  //const [travelsData, setTravelsData] = useState<travelItem[]>(defaultTravelsData); // msw
  const travelsData = defaultTravelsData;
  const [carouselData, setCarouselData] = useState<travelItem[]>(defaultTravelsData);

  // useEffect(() => {
  //   axios
  //     .get('/api/travels')
  //     .then(response => {
  //       const data = response.data;
  //       setTravelsData(data);
  //       setCarouselData(data);
  //     })
  //     .catch(error => console.error('가짜 API 요청 실패:', error));
  // }, []);

  return (
    <TravelContainer>
      <TravelTitleContainer>
        <TravelTitle>국내 다양한 여행지를 둘러보세요.</TravelTitle>
        <TravelSelectBox>
          <DetailPopUp travelsData={travelsData} setCarouselData={setCarouselData} />
        </TravelSelectBox>
      </TravelTitleContainer>
      <TravelCarouselContainer>
        <TravelCarousel data={carouselData} />
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
