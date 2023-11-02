import styled from 'styled-components';
import { GRAY_COLOR } from '../../color/color';
import ReviewMap from '../../component/ReviewMap';
import TravelPosts from './TravelPosts';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface Place {
  plannerDetailId: number;
  nickname: string;
  description: string;
  image: string;
  place: string;
  date: number;
  views: number | null;
  likeCount: number | null;
  lat: number;
  lon: number;
}

export default function TravelMap() {
  const token = useSelector((state: RootState) => state.token.token);
  const [travelLatitude, setTravelLatitude] = useState(37.5665);
  const [travelLongitude, setTravelLongitude] = useState(126.978);
  const [placesData, setPlacesData] = useState<Place[]>([]);
  const [mapPings, setMapPings] = useState([]);

  useEffect(() => {
    const Access_token = localStorage.getItem('token');
    const fetchTravelMap = async () => {
      try {
        const response = await axios.get(
          `/address/api/search/map2?x=${travelLongitude}&y=${travelLatitude}&distance=3km`,
          {
            headers: {
              Authorization: `Bearer ${Access_token}`,
            },
          }
        );

        if (response.data) {
          setPlacesData(response.data);

          const newMapPings = response.data.map((item: Place) => ({
            latitude: item.lat,
            longitude: item.lon,
          }));
          setMapPings(newMapPings);
        } else {
          console.log(response);
          alert('사용자 정보가 없습니다 로그인확인해주세요');
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 오류 확인바람(리뷰맵):', error);
      }
    };

    fetchTravelMap();
  }, [token, travelLatitude, travelLongitude]);

  return (
    <TravelContainer>
      <TravelTitleContainer>
        <TravelTitle>국내 다양한 여행지를 둘러보세요.</TravelTitle>
      </TravelTitleContainer>
      <Map>
        <ReviewMap
          onPlacesSelected={() => {}}
          places={placesData} // 정보
          mapPings={mapPings} // 데이터 좌표
          setTravelLatitude={setTravelLatitude}
          setTravelLongitude={setTravelLongitude}
        />
      </Map>
      <PostBorder></PostBorder>
      <TravelPosts travelDatas={placesData} />
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
