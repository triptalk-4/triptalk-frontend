import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const defaultTravelsData = [
  // 서울
  {
    imgUrl: 'img/Travelimg1.jpg',
    title: '서울 여행 1',
    nickname: '모험가',
    address: '서울시 강남구 강남대로 123번길 45',
    date: '10/01/2023',
    heartCount: 5,
    lookUpCount: 5,
  },
  {
    imgUrl: 'img/Travelimg2.jpg',
    title: '서울 여행 2',
    nickname: '여행가2',
    address: '서울시 강북구 강북로 789번길 10',
    date: '10/05/2023',
    heartCount: 10,
    lookUpCount: 7,
  },
  {
    imgUrl: 'img/Travelimg3.jpg',
    title: '서울 힐링 여행',
    nickname: '힐링객',
    address: '서울시 마포구 마포로 56',
    date: '10/10/2023',
    heartCount: 8,
    lookUpCount: 12,
  },
  {
    imgUrl: 'img/Travelimg4.jpg',
    title: '서울 문화 탐방',
    nickname: '문화인',
    address: '서울시 종로구 종로 1010',
    date: '11/05/2023',
    heartCount: 9,
    lookUpCount: 15,
  },
  {
    imgUrl: 'img/Travelimg5.jpg',
    title: '서울 도심 힐링',
    nickname: '도시탐험',
    address: '서울시 중구 명동길 567',
    date: '11/15/2023',
    heartCount: 12,
    lookUpCount: 9,
  },
];

export default function TravelPosts() {
  const [travelPostsData, setTravelPostsData] = useState([]);
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
    <PostlContainer className={containerClassName}>
      {defaultTravelsData.map((travelData, index) => (
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
