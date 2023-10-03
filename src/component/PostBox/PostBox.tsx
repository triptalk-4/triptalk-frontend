import styled, { css } from 'styled-components';
import { BiTime } from 'react-icons/bi';
import { GrLocation } from 'react-icons/gr';
import { GRAY_COLOR } from '../../color/color';
import ViewComments from './ViewComments';
import EnterComment from './EnterComment';

export default function PostBox() {
  return (
    <PostBoxContainer>
      <PostImg src="/img/Carousel.png" alt="대표이미지"></PostImg>
      <PostInfo>
        <PostText>
          <PostInfoTime>
            <Time />
            10월 3, 2023 11:30 오전
          </PostInfoTime>
          <PostInfoAddress>
            <Location />
            강원도 양양군 현북면 하조대해안길 119
          </PostInfoAddress>
          <PostInfoDescription>물만 엄청먹고 왔음 ㅠㅠ</PostInfoDescription>
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

const PostImg = styled.img`
  width: 60%;
  height: 400px;
  border-radius: 15px 0 0 15px;
`;

const PostInfo = styled.div`
  width: 40%;
  height: 400px;
  background-color: white;
  border-radius: 0 15px 15px 0;
`;

const PostText = styled.div`
  padding: 20px 10px;
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
