import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import PostBox from '../../component/PostBox/PostBox';
import { GRAY_COLOR, MAIN_COLOR } from '../../color/color';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaSave } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import axios from 'axios';
import formatDate from '../../utils/formatDate';
import { useParams, useNavigate } from 'react-router-dom';

export default function SecheduleDetail() {
  const [likeCount, setLikeCount] = useState(0); // 좋아요 카운트 상태
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태 (눌렸는지 안눌렸는지)
  const [isSaved, setIsSaved] = useState(false);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [nickname, setNickname] = useState('');
  const [userImg, setUserImg] = useState('');

  const token = useSelector((state: RootState) => state.token.token);
  const { plannerId } = useParams();
  const navigate = useNavigate();
  const [plannerDetailResponse, setPlannerDetailResponse] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchDetailPage = async () => {
      try {
        const response = await axios.get(`/address/api/plans/${plannerId}/details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.plannerDetailResponse) {
          const { title, likeCount, startDate, endDate, nickname, profile } = response.data;
          setTitle(title);
          setLikeCount(likeCount);
          setStartDate(startDate);
          setEndDate(endDate);
          setNickname(nickname);
          setUserImg(profile);

          const plannerDetails = response.data.plannerDetailResponse;
          setPlannerDetailResponse(plannerDetails);
        } else {
          console.log(response);
          alert('사용자 정보가 없습니다 상세페이지확인해주세요');
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 오류 확인바람(상세페이지):', error);
      }
    };

    fetchDetailPage();
  }, [token]);

  const handleLikeClick = () => {
    setLikeCount(prevCount => (isLiked ? prevCount - 1 : prevCount + 1)); // 좋아요 상태에 따라 숫자 증가 혹은 감소
    setIsLiked(!isLiked);
  };

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
  };

  const deletePost = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`/address/api/plans/${plannerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        alert('게시물이 삭제되었습니다.');
        navigate('/schedule');
      }
    } catch (error) {
      console.error('게시물 삭제 중 오류 발생:', error);
    }
  };

  return (
    <DetailContainer>
      <PostContainer>
        <MapContainer></MapContainer>
        <PostBg>
          <PostText>
            <Title>
              {title}
              <DateSpan>
                {formatDate(Date.parse(startDate))} ~ {formatDate(Date.parse(endDate))}
              </DateSpan>
            </Title>
            <UserWarp>
              <DeleteBtn onClick={deletePost}>삭제</DeleteBtn>
              <EidtBtn>수정</EidtBtn>
              <UserName>
                <UserProfile src={userImg} />
                {nickname}
              </UserName>
            </UserWarp>
          </PostText>
          {plannerDetailResponse.map((detail, index) => (
            <PostBox key={index} data={detail} />
          ))}
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
  /* position: sticky;
  top: 0;
  z-index: 10; */
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

const UserBtnStyle = css`
  width: 60px;
  height: 40px;
  border: none;
  border-radius: 15px;
  margin-right: 15px;
  cursor: pointer;
`;

const EidtBtn = styled.button`
  ${UserBtnStyle}
  background-color: ${MAIN_COLOR};
  color: #fff;
`;
const DeleteBtn = styled.button`
  ${UserBtnStyle}
  background-color: ${GRAY_COLOR};
  color: #fff;
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
  z-index: 10;
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
