import styled from 'styled-components';
import MainCarousel from '../../component/Carousel/MainCarousel';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate(); // useNavigate를 사용하여 navigate 함수를 가져옴

  const handleMainImgClick = () => {
    // MainImgContainer를 클릭할 때 페이지 이동 처리
    navigate('/schedule'); // 원하는 경로로 이동
  };

  return (
    <MainContainer>
      <TopPosts>
        <TopTitle>좋아요 TOP6</TopTitle>
        <MainCarousel />
      </TopPosts>
      <MainImgContainer onClick={handleMainImgClick}>
        <MainImageWrapper>
          <MainImage src="img/Boast.jpg" alt="여행가는 느낌의 이미지" />
          <MainImageCaption>
            여러분의 여행지를 <br /> 'Trip Talk'에 보여주세요
          </MainImageCaption>
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
  margin-top: 20%;
  cursor: pointer;
  height: 445px;
`;

const MainImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const MainImageCaption = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 25px;
  font-size: 50px;
  text-align: center;
  transform: translate(-50%, -50%);
`;

export default Main;
