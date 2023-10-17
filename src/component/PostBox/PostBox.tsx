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

interface DetailType {
  userId: number;
  date: string;
  placeResponse: {
    placeName: string;
    roadAddress: string;
    addressName: string;
    latitude: number;
    longitude: number;
  };
  description: string;
  imagesUrl: string[];
}

export default function PostBox({ data }: { data: DetailType }) {
  const token = useSelector((state: RootState) => state.token.token);
  const { plannerId } = useParams();
  const [, setDetailDatas] = useState<DetailType[]>([]);

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
          const plannerDetails: DetailType[] = response.data.plannerDetailResponse;
          setDetailDatas(plannerDetails); // 상세 정보를 상태에 저장
        } else {
          console.log(response);
          alert('사용자 정보가 없습니다 상세페이지(포스트박스)확인해주세요');
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 오류 확인바람(포스트박스):', error);
      }
    };

    fetchDetailPage();
  }, [token]);
  console.log('날짜:', data.date);
  console.log('리뷰:', data.description);
  console.log('위치:', data.placeResponse.addressName);
  return (
    <PostBoxContainer>
      <Postdiv>
        <PostImgs imagesUrl={data.imagesUrl} />
        <PostInfo>
          <PostText>
            <PostInfoTime>
              <Time />
              {data.date}
            </PostInfoTime>
            <PostInfoAddress>
              <Location />
              {data.placeResponse.addressName}
            </PostInfoAddress>
            <PostInfoDescription>{data.description}</PostInfoDescription>
          </PostText>
          <PostBorder></PostBorder>
          <ViewComments />
          <PostBorder></PostBorder>
          <EnterComment />
        </PostInfo>
      </Postdiv>
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

const Postdiv = styled.div`
  width: 100%;
  display: flex;
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
