import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import PostBox from '../../component/PostBox/PostBox';
import { GRAY_COLOR, MAIN_COLOR } from '../../color/color';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaSave } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function SecheduleDetail() {
  const [likeCount, setLikeCount] = useState(0); // 좋아요 카운트 상태
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태 (눌렸는지 안눌렸는지)
  const [isSaved, setIsSaved] = useState(false);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState<number>(0);
  const [endDate, setEndDate] = useState<number>(0);
  const [nickname, setNickname] = useState('');
  const [userImg, setUserImg] = useState('');

  const [userEmail, setUserEmail] = useState('');

  const token = useSelector((state: RootState) => state.token.token);
  const { plannerId } = useParams();
  const navigate = useNavigate();
  const [plannerDetailResponseDate, setPlannerDetailResponseDate] = useState([]);
  const Email_token = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchDetailPage = async () => {
      const Access_token = localStorage.getItem('token');
      try {
        // 페이지 상세 내용 가져오기
        const response = await axios.get(`/address/api/plans/${plannerId}/details`, {
          headers: {
            Authorization: `Bearer ${Access_token}`,
          },
        });

        if (response.data) {
          const { title, likeCount, startDate, endDate, nickname, profile, email } = response.data;

          setTitle(title);
          setLikeCount(likeCount);
          setStartDate(startDate);
          setEndDate(endDate);
          setNickname(nickname);
          setUserImg(profile);
          setUserEmail(email);

          const plannerDetails = response.data.plannerDetailResponse;
          setPlannerDetailResponseDate(plannerDetails);
        } else {
          console.log(response);
          alert('사용자 정보가 없습니다 상세페이지확인해주세요');
        }

        const likeAndSaveResponse = await axios.get(`/address/api/likes/plans/user/check/save/like/${plannerId}`, {
          headers: {
            Authorization: `Bearer ${Access_token}`,
          },
        });
        const { userSaveYn, userLikeYn } = likeAndSaveResponse.data;
        setIsLiked(userLikeYn === 'ok');
        setIsSaved(userSaveYn === 'ok');
      } catch (error) {
        console.error('상세 페이지 정보 및 좋아요/저장 상태 가져오기 오류:', error);
      }
    };

    fetchDetailPage();
  }, [token, plannerId]);

  const handleLikeClick = async () => {
    const Access_token = localStorage.getItem('token');
    try {
      // 좋아요 눌렸으면 취소
      if (isLiked) {
        const response = await axios.post(
          `/address/api/likes/minus/plans/${plannerId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${Access_token}`,
            },
          }
        );
        if (response.data.ok === '좋아요가 취소되었습니다') {
          alert('좋아요가 취소되었습니다.');
          setLikeCount(prevCount => prevCount - 1);
          setIsLiked(false);
        }
      } else {
        const response = await axios.post(
          `/address/api/likes/plans/${plannerId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${Access_token}`,
            },
          }
        );
        if (response.data.ok === '좋아요가 완료되었습니다') {
          alert('좋아요가 완료되었습니다.');
          setLikeCount(prevCount => prevCount + 1);
          setIsLiked(true);
        }
      }
    } catch (error) {
      console.error('좋아요 기능에서 오류 발생:', error);
    }
  };

  const handleSaveClick = async () => {
    const Access_token = localStorage.getItem('token');
    try {
      // 저장 눌렸으면 취소
      if (isSaved) {
        const response = await axios.delete(`/address/api/likes/plans/user/cancel/planner/${plannerId}`, {
          headers: {
            Authorization: `Bearer ${Access_token}`,
          },
        });
        if (response.data.ok === '저장함 삭제가 완료되었습니다.') {
          alert('저장이 취소되었습니다.');
          setIsSaved(false);
        } else {
          alert('저장이 취소되지 않았습니다.'); // 저장 취소 실패시 알림
        }
      } else {
        const response = await axios.post(`/address/api/likes/plans/user/save/planner/${plannerId}`, null, {
          headers: {
            Authorization: `Bearer ${Access_token}`,
          },
        });
        if (response.data.ok === '저장 추가가 완료되었습니다.') {
          alert('저장이 완료되었습니다.');
          setIsSaved(true);
        } else {
          alert('저장이 되지 않았습니다.'); // 저장 실패시 알림
        }
      }
    } catch (error) {
      console.error('저장함 기능에서 오류 발생:', error);
      alert('저장 기능에서 오류가 발생했습니다.');
    }
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

  // 시간
  const startTime = moment(startDate).add(9, 'hours').format('YYYY-MM-DD');
  const endTime = moment(endDate).add(9, 'hours').format('YYYY-MM-DD');

  return (
    <DetailContainer>
      <PostContainer>
        <MapContainer></MapContainer>
        <PostBg>
          <PostText>
            <Title>
              {title}
              <DateSpan>
                {startTime} ~ {endTime}
              </DateSpan>
            </Title>
            <UserWarp>
              {userEmail === Email_token && (
                <>
                  <DeleteBtn onClick={deletePost}>삭제</DeleteBtn>
                  <EidtBtn>수정</EidtBtn>
                </>
              )}
              <UserName>
                <UserProfile src={userImg} />
                {nickname}
              </UserName>
            </UserWarp>
          </PostText>
          {plannerDetailResponseDate.map((detail, index) => (
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
