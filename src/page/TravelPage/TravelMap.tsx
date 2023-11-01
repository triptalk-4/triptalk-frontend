import styled from 'styled-components';
import { GRAY_COLOR } from '../../color/color';
import ReviewMap from '../../component/ReviewMap';
import TravelPosts from './TravelPosts';

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
];

export default function TravelMap() {
  return (
    <TravelContainer>
      <TravelTitleContainer>
        <TravelTitle>국내 다양한 여행지를 둘러보세요.</TravelTitle>
      </TravelTitleContainer>
      <Map>
        <ReviewMap onPlacesSelected={() => {}} />
      </Map>
      <PostBorder></PostBorder>
      <TravelPosts travelDatas={defaultTravelsData} />
    </TravelContainer>
  );
}

const TravelContainer = styled.div`
  max-width: 1200px;
  margin: 35px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TravelTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TravelTitle = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

const Map = styled.div`
  width: 100%;
`;

const PostBorder = styled.div`
  border: 1px solid ${GRAY_COLOR};
`;
