import styled from 'styled-components';
import LikeCarousel from '../../component/Carousel/LikeCarousel';
import { GRAY_COLOR } from '../../color/color';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentEmail } from '../../store/editMyInfoSlice';
import MainCarousel from '../../component/Carousel/MainCarousel';

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userEmailData = localStorage.getItem('userEmail');
    dispatch(setCurrentEmail(userEmailData));
  }, []);

  return (
    <MainContainer>
      <MainCarousel />
      <TopPosts>
        <TopTitle>
          좋아요 TOP6
          <TileSpan>지금 HOT한 게시물</TileSpan>
        </TopTitle>
        <LikeCarousel />
      </TopPosts>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  margin: 0 auto;
  height: 100%;
`;

const TopPosts = styled.div`
  max-width: 1200px;
  margin: 0px auto 5%;

  @media (max-width: 768px) {
    margin: 0px auto 10%;
  }
`;

const TopTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5%;
  margin-bottom: 3%;
  font-size: 30px;
  font-weight: 700;
  user-select: none;
  @media (max-width: 1150px) {
    font-size: 24px;
  }
`;

const TileSpan = styled.span`
  font-size: 12px;
  font-weight: 300;
  color: ${GRAY_COLOR};
`;

export default Main;
