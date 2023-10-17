import { useEffect, useState } from 'react';

import styled from 'styled-components';
import { MAIN_COLOR } from '../color/color';

const KAKAO_API_KEY = '2cc45017695a59169a1f649bdc77f123';

interface PlaceInfo {
  position: {
    lat: number;
    lng: number;
  };
  addressName: string;
  placeName: string;
  roadAddressName: string;
}

interface SchduleMapLoaderProps {
  onPlacesSelected: (PlaceInfo: PlaceInfo[]) => void;
}

const ScheduleMapLoader: React.FC<SchduleMapLoaderProps> = ({ onPlacesSelected }) => {
  const [searchPlace, setSearchPlace] = useState('');
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [selectedPlaceInfos, setSelectedPlaceInfos] = useState<PlaceInfo[]>([]);

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services`;
    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById('map') as HTMLElement; // 맵을 표시할 DOM 엘리먼트
        const options = {
          center: new kakao.maps.LatLng(37.5665, 126.978), // 초기 지도 중심 좌표
          level: 5, // 지도 확대 레벨
        };
        const newMap = new kakao.maps.Map(container, options);
        setMap(newMap);
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    console.log(selectedPlaceInfos);
  }, [selectedPlaceInfos]);

  const handleSearch = () => {
    if (map) {
      const ps = new kakao.maps.services.Places();

      // 입력한 키워드로 장소를 검색
      ps.keywordSearch(searchPlace, (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          const newPlaceInfos: PlaceInfo[] = [];
          for (let i = 0; i < 1; i++) {
            const place = data[i];

            if (place) {
              const selectedPlaceInfo = {
                position: {
                  lat: Number(place.y),
                  lng: Number(place.x),
                },
                addressName: place.address_name,
                placeName: place.place_name,
                roadAddressName: place.road_address_name,
              };

              newPlaceInfos.push(selectedPlaceInfo);
            }

            // 마커를 생성하고 지도에 표시
            const marker = new kakao.maps.Marker({
              map,
              position: new kakao.maps.LatLng(Number(place.y), Number(place.x)),
            });
            kakao.maps.event.addListener(marker, 'click', () => {
              // 마커 클릭 이벤트
              const infowindow = new kakao.maps.InfoWindow({
                content: `<div style="padding: 5px; font-size:12px">${place.place_name}</div>`,
              });
              infowindow.open(map, marker);
              const position = marker.getPosition();
              console.log('마커 클릭 위치:', position.getLat(), position.getLng());
            });

            bounds.extend(new kakao.maps.LatLng(Number(place.y), Number(place.x)));
          }

          setSelectedPlaceInfos([...selectedPlaceInfos, ...newPlaceInfos]);

          onPlacesSelected(selectedPlaceInfos);
          console.log(selectedPlaceInfos);
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정
          map.setBounds(bounds);
        }
      });
    }
  };

  return (
    <>
      <Con id="map" style={{ width: '80%', height: '400px' }}></Con>
      <Input type="text" placeholder="장소 검색" onChange={e => setSearchPlace(e.target.value)} />
      <Button onClick={handleSearch}>검색</Button>
    </>
  );
};

export default ScheduleMapLoader;

const Con = styled.div`
  margin: 5% auto;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
  outline: none;
  margin-bottom: 4px;
  &:focus {
    border-color: ${MAIN_COLOR};
  }
`;
const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
  outline: none;
  &:focus {
    border-color: ${MAIN_COLOR};
  }
`;
