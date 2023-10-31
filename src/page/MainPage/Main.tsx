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
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
`;

const TopPosts = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-bottom: 5%;
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
`;

const TileSpan = styled.span`
  font-size: 15px;
  font-weight: 300;
  color: ${GRAY_COLOR};
`;

export default Main;
