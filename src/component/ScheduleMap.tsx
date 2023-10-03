import { useEffect } from 'react';
import { useSelector } from 'react-redux/es/exports';
import { RootState } from '../store/mapStore';

import styled from 'styled-components';

const KAKAO_API_KEY = '2cc45017695a59169a1f649bdc77f123';

const ScheduleMapLoader = () => {
  // redux에서 정보가져오기
  const { address } = useSelector((state: RootState) => state.address);



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
        const map = new kakao.maps.Map(container, options);

        // 주소 정보를 이용하여 지도에 마커 표시
        if (address && address.length > 0) {
          const geocoder = new kakao.maps.services.Geocoder();

          address.forEach((address) => {
            geocoder.addressSearch(address, function (result, status) {
              if (status === kakao.maps.services.Status.OK) {
                const y = parseFloat(result[0].y);
                const x = parseFloat(result[0].x);

                const coords = new kakao.maps.LatLng(y, x);
                const marker = new kakao.maps.Marker({
                  map: map,
                  position: coords
                });

                marker.setPosition(coords)
                // 검색된 주소로 이동
                map.setCenter(coords)
              }
            })
          })
        }
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [address]);

  return <Con id="map" style={{ width: '80%', height: '400px' }}></Con>;
};

export default ScheduleMapLoader;

const Con = styled.div`
  margin: 5% auto;
`;
