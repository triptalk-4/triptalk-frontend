import styled from 'styled-components';
import { AiOutlineSetting } from 'react-icons/ai';
import { DEFAULT_FONT_COLOR, GRAY_COLOR, LIGHT_GRAY_COLOR } from '../../color/color';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MyInfoPost from './MyInfoPost';
import MyInfoSaved from './MyInfoSaved';
import TopButton from '../../component/TopButton/TopButton';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function MyInfo() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [currentTab, setTab] = useState(0); // 탭기능

  const myInfoMenuTabs = [
    { name: '게시물', content: <MyInfoPost /> },
    { name: '저장함', content: <MyInfoSaved /> },
  ];

  const selectMenuHandler = (index: number) => {
    setTab(index);
  };

  // msw
  const [userNickname, setUserNickname] = useState('');
  const [userImg, setUserImg] = useState('');
  const [userIntro, setUserIntro] = useState('');
  const [userUniqueId, setUserUniqueId] = useState('');
  const [anotherUserId, setAnotherUserId] = useState('');
  const [anotheruserNickname, setAnotheruserNickname] = useState('');
  const [anotheruserAboutMe, setAnotheruserAboutMe] = useState('');
  const [anotheruserProfile, setAnotheruserProfile] = useState('');

  const token = useSelector((state: RootState) => state.token.token);

  // msw
  // useEffect(() => {
  //   const storedUserData = localStorage.getItem('userInfo');
  //   if (storedUserData) {
  //     const userData = JSON.parse(storedUserData);
  //     setNickName(userData.nickname);
  //     setImg(userData.imageUrl);
  //   }
  // }, []);

  // const handleLogOut = () => {
  //   const storeUserData = localStorage.getItem('userInfo');
  //   if (storeUserData) {
  //     localStorage.removeItem('userInfo');
  //     alert('로그아웃 되었습니다.');
  //     navigate('/');
  //   } else {
  //     alert('로그인 해주세요.');
  //     navigate('/');
  //   }
  // };

  // 연동
  // console.log(token);
  useEffect(() => {
    const Access_token = localStorage.getItem('token');
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/address/api/users/profile', {
          headers: {
            Authorization: `Bearer ${Access_token}`,
          },
        });

        if (response.data) {
          const { profile, nickname, aboutMe, userId } = response.data;
          setUserImg(profile);
          setUserNickname(nickname);
          setUserIntro(aboutMe);
          setUserUniqueId(userId);
        } else {
          console.log(response);
          alert('사용자 정보가 없습니다 로그인확인해주세요');
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 오류 확인바람(내정보):', error);
      }
    };

    fetchUserInfo();
  }, [token, userNickname, userImg, userIntro]);

  useEffect(() => {
    const Access_token = localStorage.getItem('token');
    const fetchSerch = async () => {
      try {
        const response = await axios.get(`/address/api/search/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${Access_token}`,
          },
        });

        if (response.data) {
          const { userId, nickname, aboutMe, profile } = response.data;
          setAnotherUserId(userId);
          setAnotheruserNickname(nickname);
          setAnotheruserAboutMe(aboutMe);
          setAnotheruserProfile(profile);
        } else {
          console.log(response);
          alert('사용자 정보가 없습니다 로그인확인해주세요');
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 오류 확인바람(내정보):', error);
      }
    };

    fetchSerch();
  }, [token, userId]);

  // console.log(anotherUserId);
  // console.log(userUniqueId);
  const handleLogOut = () => {
    const storeUserData = localStorage.getItem('token');
    if (storeUserData) {
      localStorage.removeItem('token');
      alert('로그아웃 되었습니다.');
      navigate('/');
    } else {
      alert('로그인 해주세요.');
      navigate('/');
    }
  };

  return (
    <MyPageContainer>
      {userUniqueId === anotherUserId ? (
        <UserImgContainer>
          <UserImg src={userImg} />
          <UserNickNameContainer>
            <NickName>{userNickname}</NickName>
            <Setting to="/editmyinfo">
              <AiOutlineSetting />
            </Setting>
          </UserNickNameContainer>
          <IntroTextContainer>
            <IntroText>{userIntro}</IntroText>
          </IntroTextContainer>
          <UserLogoutBtn onClick={handleLogOut}>로그아웃</UserLogoutBtn>
        </UserImgContainer>
      ) : (
        <UserImgContainer>
          <UserImg src={anotheruserProfile} />
          <UserNickNameContainer>
            <NickName>{anotheruserNickname}</NickName>
          </UserNickNameContainer>
          <IntroTextContainer>
            <IntroText>{anotheruserAboutMe}</IntroText>
          </IntroTextContainer>
        </UserImgContainer>
      )}

      {userUniqueId === anotherUserId ? (
        <ContentContainer>
          <ContentUl>
            {myInfoMenuTabs.map((menu, index) => (
              <ContentItem
                key={menu.name}
                className={currentTab === index ? 'active' : ''}
                onClick={() => selectMenuHandler(index)}>
                {menu.name}
              </ContentItem>
            ))}
          </ContentUl>
          {myInfoMenuTabs[currentTab].content}
        </ContentContainer>
      ) : (
        <ContentContainer>
          <ContentUl>
            {myInfoMenuTabs
              .filter(menu => menu.name !== '저장함') // "저장함" 탭 제거
              .map((menu, index) => (
                <ContentItem
                  key={menu.name}
                  className={currentTab === index ? 'active' : ''}
                  onClick={() => selectMenuHandler(index)}>
                  {menu.name}
                </ContentItem>
              ))}
          </ContentUl>
          {myInfoMenuTabs[currentTab].content}
        </ContentContainer>
      )}

      <TopButton />
    </MyPageContainer>
  );
}

const MyPageContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const UserImgContainer = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserImg = styled.img`
  width: 300px;
  height: 300px;
  border: 1px solid ${LIGHT_GRAY_COLOR};
  border-radius: 100%;
  margin: 0 auto;
`;

const UserNickNameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0 20px;
`;

const IntroTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IntroText = styled.p`
  font-size: 25px;
  padding-bottom: 20px;
`;

const NickName = styled.p`
  font-size: 25px;
`;

const Setting = styled(Link)`
  font-size: 25px;
  border: none;
  background-color: transparent;
  color: ${GRAY_COLOR};
  padding-left: 5px;
  cursor: pointer;
`;

const UserLogoutBtn = styled.button`
  font-size: 15px;
  border: none;
  background-color: transparent;
  text-decoration: underline;
  margin-bottom: 40px;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  border-top: 1px solid #000;
`;

const ContentUl = styled.ul`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ContentItem = styled.li`
  padding: 20px 0;
  color: ${GRAY_COLOR};

  cursor: pointer;

  &.active {
    color: ${DEFAULT_FONT_COLOR};
    font-weight: bold;
  }
`;
