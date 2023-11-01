import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import TravelPagination from './TravelPagination';

interface TravelPostData {
  imgUrl: string;
  title: string;
  nickname: string;
  address: string;
  date: string;
  heartCount: number;
  lookUpCount: number;
}

interface TravelPostsProps {
  travelDatas: TravelPostData[];
}

export default function TravelPosts({ travelDatas }: TravelPostsProps) {
  const [travelPostsData, setTravelPostsData] = useState<TravelPostData[]>([]);
  const [containerClassName, setContainerClassName] = useState('space-between');

  useEffect(() => {
    // 게시물 갯수에 따라 스타일 변경
    if (travelPostsData.length <= 3) {
      setContainerClassName('flex-start');
    } else {
      setContainerClassName('space-between');
    }
  }, [travelPostsData]);

  console.log(setTravelPostsData);

  return (
    <>
      <PostlContainer className={containerClassName}>
        {travelDatas.map((travelData, index) => (
          <Post key={index}>
            <Img src={travelData.imgUrl} />
            <TextBox>
              <TopText>
                <Title>{travelData.title}</Title>
                <Nickname>
                  <UserProfile src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                  {travelData.nickname}
                </Nickname>
              </TopText>
              <BottomText>
                <Address>{travelData.address}</Address>
                <Date>{travelData.date}</Date>
              </BottomText>
            </TextBox>
          </Post>
        ))}
      </PostlContainer>
      <TravelPagination />
    </>
  );
}

const PostlContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: auto;

  margin-top: 20px;

  &.flex-start {
    justify-content: flex-start;
  }

  &.space-between {
    justify-content: space-between;
  }
`;

const Post = styled.div`
  width: 270px;
  height: 350px;
  margin-right: 40px;
  margin-bottom: 80px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  position: relative;

  &:nth-child(4n) {
    margin-right: 0;
  }
`;

const Img = styled.img`
  border-radius: 25px;
  display: block;
  width: 100%;
  cursor: pointer;
  object-fit: cover;
`;

const TextBox = styled.div`
  position: absolute;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  top: 54px;
  width: 100%;
  height: 100%;
  padding: 0 15px 20px;
  border-radius: 25px;
  background: linear-gradient(to top, rgba(0, 0, 0, 100) 0%, rgba(0, 0, 0, 0) 100%);
`;

const TopText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TextColor = css`
  color: #fff;
`;

const Title = styled.div`
  ${TextColor}
  font-size: 18px;

  margin-right: 20px;
`;

const UserProfile = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background-color: #fff;
  margin-right: 10px;
`;

const Nickname = styled.div`
  ${TextColor}
  display: flex;
  align-items: center;
`;

const BottomText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Address = styled.div`
  ${TextColor}
  font-weight: 300;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 20px;
`;

const Date = styled.div`
  ${TextColor}
  font-size: 15px;
  font-weight: 300;
`;
