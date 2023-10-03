import styled from 'styled-components';
import PostBox from '../../component/PostBox/PostBox';

export default function SecheduleDetail() {
  // const defaultImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  return (
    <DetailContainer>
      <PostContainer>
        <MapContainer></MapContainer>
        <PostBg>
          <PostText>
            <Title>
              즐거웠던 서울, 대전 빵탐험
              <DateSpan>23.09.05~23.09.07</DateSpan>
            </Title>
            <UserName>
              <UserProfile src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
              User1
            </UserName>
          </PostText>
          <PostBox />
        </PostBg>
      </PostContainer>
    </DetailContainer>
  );
}

const DetailContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  height: 130vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PostContainer = styled.div`
  width: 100%;
  height: auto;
  padding-bottom: 50px;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 50px;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: darkblue;
`;

const PostBg = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const PostText = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 25px;
  padding-right: 160px;
`;

const DateSpan = styled.span`
  font-size: 20px;
  font-weight: 500;
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
