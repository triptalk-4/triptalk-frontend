import styled from 'styled-components';
import { GRAY_COLOR } from '../../color/color';
import ReviewMap from '../../component/ReviewMap';
import TravelPosts from './TravelPosts';

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
      <TravelPosts />
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
