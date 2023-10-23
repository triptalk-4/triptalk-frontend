import styled from 'styled-components';
import MainCarousel from '../../component/Carousel/MainCarousel';
import { useNavigate } from 'react-router-dom';
import { GRAY_COLOR } from '../../color/color';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentEmail } from '../../store/editMyInfoSlice';

const Main = () => {
  const navigate = useNavigate(); // useNavigate를 사용하여 navigate 함수를 가져옴
  const dispatch = useDispatch();
  const handleMainImgClick = () => {
    // MainImgContainer를 클릭할 때 페이지 이동 처리
    navigate('/schedule'); // 원하는 경로로 이동
  };

  useEffect(() => {
    const userEmailData = localStorage.getItem('userEmail');
    dispatch(setCurrentEmail(userEmailData));
  }, []);

  return (
    <MainContainer>
      <TopPosts>
        <TopTitle>
          좋아요 TOP6
          <TileSpan>지금 HOT한 게시물</TileSpan>
        </TopTitle>
        <MainCarousel />
      </TopPosts>
      {/* <AddPost>
        <AddImg src="img/addimg.jpg" alt="관광지 이미지" />
      </AddPost> */}
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
  margin: 0 auto;
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

// const AddPost = styled.div`
//   margin: 80px auto;
// `;
//
// const AddImg = styled.img`
//   width: 100%;
//   height: auto;
// `;

const MainImgContainer = styled.div`
  width: 100%;
  margin-top: 10%;
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
  object-fit: contain;
`;

const MainImageCaption = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: rgba(0, 0, 0, 0.25);
  color: white;
  padding: 25px;
  font-size: 50px;
  text-align: center;
  transform: translate(-50%, -50%);
`;

export default Main;
