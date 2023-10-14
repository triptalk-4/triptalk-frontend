import styled, { css } from 'styled-components';
import { BiTime } from 'react-icons/bi';
import { GrLocation } from 'react-icons/gr';
import { GRAY_COLOR } from '../../color/color';
import ViewComments from './ViewComments';
import EnterComment from './EnterComment';
import PostImgs from '../Carousel/PostImgs';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function PostBox() {
  const token = useSelector((state: RootState) => state.token.token);
  const { plannerDetailId } = useParams();

  const [userId, setUserId] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [placeResponse, setPlaceResponse] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchDetailPage = async () => {
      try {
        const response = await axios.get(`/api/plans/detail/${plannerDetailId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          const { userId, date, placeResponse, description } = response.data;

          setUserId(userId);
          setDate(date);
          setPlaceResponse(placeResponse);
          setDescription(description);
        } else {
          console.log(response);
          alert('사용자 정보가 없습니다 상세페이지확인해주세요');
        }
      } catch (error) {
        console.log(date);
        console.log(placeResponse);
        console.log(description);
        console.error('사용자 정보 가져오기 오류 확인바람(헤더):', error);
      }
    };

    fetchDetailPage();
  }, [token]);

  return (
    <PostBoxContainer>
      <PostImgs />
      <PostInfo>
        <PostText>
          <PostInfoTime>
            <Time />
            {date}
          </PostInfoTime>
          <PostInfoAddress>
            <Location />
            {placeResponse}
            강원특별자치도 양양군 걍현면 전진리
          </PostInfoAddress>
          <PostInfoDescription>{description}</PostInfoDescription>
        </PostText>
        <PostBorder></PostBorder>
        <ViewComments />
        <PostBorder></PostBorder>
        <EnterComment />
      </PostInfo>
    </PostBoxContainer>
  );
}

const PostBoxContainer = styled.div`
  width: 100%;
  min-height: 400px;
  display: flex;
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const PostInfo = styled.div`
  width: 40%;
  height: 400px;
  background-color: white;
  border-left: 1px solid #d6d6d6;
`;

const PostText = styled.div`
  padding: 15px 10px;
`;

const IconStyle = css`
  font-size: 15px;
  padding-right: 5px;
  color: #000;
`;

const Time = styled(BiTime)`
  ${IconStyle}
`;

const Location = styled(GrLocation)`
  ${IconStyle}
`;

const FontStyle = css`
  display: flex;
  align-items: center;
`;

const PostInfoTime = styled.div`
  ${FontStyle}
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const PostInfoAddress = styled.div`
  ${FontStyle}
  font-size: 13px;
  font-weight: 500;
`;

const PostInfoDescription = styled.div`
  ${FontStyle}
  margin-top: 10px;
  font-size: 15px;
  font-weight: 700;

  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const PostBorder = styled.div`
  border: 1px solid ${GRAY_COLOR};
`;
