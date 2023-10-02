import { useEffect } from 'react';
import styled from 'styled-components';

const KAKAO_API_KEY = '2cc45017695a59169a1f649bdc77f123';

const ScheduleMapLoader = () => {
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
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <Con id="map" style={{ width: '80%', height: '400px' }}></Con>;
};

export default ScheduleMapLoader;

const Con = styled.div`
  margin: 5% auto;
`;
