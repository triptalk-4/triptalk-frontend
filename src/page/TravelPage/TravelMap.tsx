import styled from 'styled-components';
import ScheduleMapLoader from '../../component/ScheduleMap';
import { GRAY_COLOR } from '../../color/color';

export default function TravelMap() {
  return (
    <TravelContainer>
      <TravelTitleContainer>
        <TravelTitle>국내 다양한 여행지를 둘러보세요.</TravelTitle>
      </TravelTitleContainer>
      <Map>
        <ScheduleMapLoader onPlacesSelected={() => {}} />
      </Map>
      <PostBorder></PostBorder>
      <TravelCarouselContainer></TravelCarouselContainer>
    </TravelContainer>
  );
}

const TravelContainer = styled.div`
  max-width: 1200px;
  margin: 65px auto;
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

const TravelCarouselContainer = styled.div``;
