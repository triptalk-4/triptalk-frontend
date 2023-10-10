import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PostBox from '../../component/PostBox/PostBox';
import { MAIN_COLOR } from '../../color/color';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaSave } from 'react-icons/fa';

export default function SecheduleDetail() {
  // const defaultImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  const [likeCount, setLikeCount] = useState(0); // 좋아요 카운트 상태
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태 (눌렸는지 안눌렸는지)
  const [isSaved, setIsSaved] = useState(false);

  const handleLikeClick = () => {
    setLikeCount(prevCount => (isLiked ? prevCount - 1 : prevCount + 1)); // 좋아요 상태에 따라 숫자 증가 혹은 감소
    setIsLiked(!isLiked);
  };

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
  };

  return (
    <DetailContainer>
      <PostContainer>
        <MapContainer></MapContainer>
        <PostBg>
          <PostText>
            <Title>
              양양가서 서핑하다옴
              <DateSpan>23.09.05~23.09.07</DateSpan>
            </Title>
            <UserWarp>
              <EidtBtn>수정</EidtBtn>
              <UserName>
                <UserProfile src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                User1
              </UserName>
            </UserWarp>
          </PostText>
          <PostBox />
          <PostBox />
        </PostBg>
        <HeartBtn onClick={handleLikeClick}>
          {isLiked ? <AiFillHeart color="red" size="1.5em" /> : <AiOutlineHeart size="1.5em" />}
          <LikeCount>{likeCount}</LikeCount>
        </HeartBtn>
        <SaveBtn onClick={handleSaveClick}>
          <FaSave color={isSaved ? 'green' : 'grey'} size="1.5em" />
        </SaveBtn>
      </PostContainer>
    </DetailContainer>
  );
}

const DetailContainer = styled.div`
  width: 80%;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PostContainer = styled.div`
  width: 100%;
  padding-bottom: 50px;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 350px;
  margin-bottom: 50px;
  position: sticky;
  top: 0;
  z-index: 9999;
  background-color: darkblue;
`;

const PostBg = styled.div`
  width: 80%;
`;

const PostText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 25px;
`;

const DateSpan = styled.span`
  font-size: 20px;
  font-weight: 500;
`;

const UserWarp = styled.div`
  display: flex;
  align-items: center;
`;

const EidtBtn = styled.button`
  background-color: ${MAIN_COLOR};
  color: #fff;
  width: 60px;
  height: 40px;
  border: none;
  border-radius: 15px;
  margin-right: 15px;
  cursor: pointer;
`;

const UserName = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-weight: 700;
`;

const UserProfile = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 100%;
  background-color: #fff;
`;

const BtnStyle = css`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  background-color: white;
  position: fixed;

  right: 505px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: none;
`;

const HeartBtn = styled.button`
  ${BtnStyle}
  top: 600px;
`;

const LikeCount = styled.span`
  font-size: 12px;
  margin-top: 2px;
`;

const SaveBtn = styled.button`
  ${BtnStyle}
  top: 700px;
`;
