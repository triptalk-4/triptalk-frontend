import styled from 'styled-components';
import MainCarousel from '../../component/Carousel/MainCarousel';

const Main = () => {
  return (
    <MainContainer>
      <TopPosts>
        <TopTitle>좋아요 TOP6</TopTitle>
        <MainCarousel />
      </TopPosts>
      <MainImgContainer>
        <MainImageWrapper>
          <MainImage src="img/Carousel.png" alt="" />
          <MainImageCaption>여행지를 자랑해주세요</MainImageCaption>
        </MainImageWrapper>
      </MainImgContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const TopPosts = styled.div`
  width: 80%;
  height: 400px;
  margin: 0 auto;
`;

const TopTitle = styled.div`
  padding-left: 40%;
  margin: 5% 0;
  font-size: 30px;
  font-weight: 700;
`;

const MainImgContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 20%;
`;

const MainImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
`;

const MainImageCaption = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px;
  font-size: 16px;
  transform: translate(-50%, -50%);
`;

export default Main;
