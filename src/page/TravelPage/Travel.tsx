import styled from 'styled-components';
import TravelCarousel from './CarouselBox/TravelCarousel';
import DetailPopUp from './PopUp/DetailPopUp';

export default function Travel() {
  return (
    <TravelContainer>
      <TravelTitleContainer>
        <TravelTitle>국내 다양한 여행지를 둘러보세요.</TravelTitle>
        <TravelSelectBox>
          {/* <TravelSelect /> */}
          <DetailPopUp />
        </TravelSelectBox>
      </TravelTitleContainer>
      <TravelCarouselContainer>
        <TravelCarousel />
      </TravelCarouselContainer>
    </TravelContainer>
  );
}

const TravelContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

const TravelTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TravelTitle = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

const TravelSelectBox = styled.div`
  width: 300px;
`;

const TravelCarouselContainer = styled.div``;
