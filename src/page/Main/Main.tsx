import styled from 'styled-components';
import { ImArrowRight } from 'react-icons/im';

const Main = () => {
  return (
    <MainContainer>
      <Title>
        <TopPlan>
          <TopPlanTitle>이달의 인기 PLAN</TopPlanTitle>
          <TopPlanDescription>신선한 가을향이</TopPlanDescription>
          <TopPlanDescription>느껴지는 9월에</TopPlanDescription>
          <TopPlanDescription>
            인기 포스트
            <ArrowIconWrapper>
              <ImArrowRight />
            </ArrowIconWrapper>
          </TopPlanDescription>
        </TopPlan>
        <HotPlace>
          <HotPlaceTitle>
            자주 방문한
            <HotPlaceWithMargin>장소</HotPlaceWithMargin>
          </HotPlaceTitle>
          <HotPlaceDescription>끝나가는 여름</HotPlaceDescription>
          <HotPlaceDescription>마지막 물놀이</HotPlaceDescription>
          <HotPlaceDescriptionWithMargin> 어떠세요?</HotPlaceDescriptionWithMargin>
        </HotPlace>
      </Title>
    </MainContainer>
  );
};

const Title = styled.div``;
const MainContainer = styled.div`
  width: 100%;
  height: 1000px;
`;

const TopPlan = styled.div`
  width: 100%;
  height: 400px;
  margin: 100px 0;
  padding-left: 100px;
  font-weight: bold;
  font-size: 24px;
`;

const HotPlace = styled.div`
  width: 100%;
  height: 400px;
  padding-right: 100px;
  font-weight: bold;
  font-size: 24px;
`;

const TopPlanTitle = styled.div`
  margin-bottom: 20px;
`;

const HotPlaceTitle = styled.div`
  margin-bottom: 20px;
`;

const HotPlaceWithMargin = styled.span`
  display: block;
  margin-left: 66px;
`;

const TopPlanDescription = styled.span`
  display: block;
  font-weight: normal;
  font-size: 16px;
`;

const HotPlaceDescription = styled.span`
  display: block;
  font-weight: normal;
  font-size: 16px;
  margin-left: 20px;
`;

const HotPlaceDescriptionWithMargin = styled.span`
  display: block;
  font-weight: normal;
  font-size: 16px;
  margin-left: 43px;
`;

const ArrowIconWrapper = styled.span`
  vertical-align: middle;
  display: inline-block;
  margin-top: 2px;
  margin-left: 5px;
`;

export default Main;
