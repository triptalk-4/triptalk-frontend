import styled from 'styled-components';
import PostBox from '../../component/PostBox/PostBox';
import { MAIN_COLOR } from '../../color/color';

export default function SecheduleDetail() {
  // const defaultImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

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
  z-index: 1; */
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
