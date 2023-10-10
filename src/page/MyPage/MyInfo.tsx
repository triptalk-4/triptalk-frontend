import styled from 'styled-components';
import { AiOutlineSetting } from 'react-icons/ai';
import { DEFAULT_FONT_COLOR, GRAY_COLOR, LIGHT_GRAY_COLOR } from '../../color/color';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MyInfoPost from './MyInfoPost';
import MyInfoSaved from './MyInfoSaved';
import TopButton from '../../component/TopButton/TopButton';
import axios from 'axios';
import { setToken } from '../../store/tokenSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function MyInfo() {
  const navigate = useNavigate();
  const [currentTab, setTab] = useState(0); // 탭기능

  const dispatch = useDispatch();
  // msw
  const [nickName, setNickName] = useState('');
  const [img, setImg] = useState('');

  const { token } = useSelector((state: RootState) => state.token); // Redux에서 토큰 가져오기

  const myInfoMenuTabs = [
    { name: '게시물', content: <MyInfoPost /> },
    { name: '저장함', content: <MyInfoSaved /> },
  ];

  const selectMenuHandler = (index: any) => {
    setTab(index);
  };

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
  useEffect(() => {
    // 비동기 함수를 사용하여 사용자 정보를 가져옴
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://52.79.200.55:8080/api/users/{userId}', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            nickname: nickName,
            img: img,
          },
        });

        if (response.data) {
          dispatch(setToken(response.data.token)); // 토큰 스토어에 보내기
          console.log(response.data.token);
          setNickName(response.data.nickname);
          setImg(response.data.imgUrl);
        } else {
          console.log(response);
          alert('사용자 정보가 없습니다');
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 오류:', error);
      }
    };

    fetchUserInfo(); // 비동기 함수 호출
  }, [token, nickName, img]);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userInfo');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setNickName(userData.nickname);
      setImg(userData.imageUrl);
    }
  }, []);

  const handleLogOut = () => {
    const storeUserData = localStorage.getItem('userInfo');
    if (storeUserData) {
      localStorage.removeItem('userInfo');
      alert('로그아웃 되었습니다.');
      navigate('/');
    } else {
      alert('로그인 해주세요.');
      navigate('/');
    }
  };

  return (
    <MyPageContainer>
      <UserImgContainer>
        <UserImg src={img} />
        <UserNickNameContainer>
          <NickName>{nickName}</NickName>
          <Setting to="/editmyinfo">
            <AiOutlineSetting />
          </Setting>
        </UserNickNameContainer>
        <IntroTextContainer>
          <IntroText>사용자의 소개 내용을 입력하세요</IntroText>
        </IntroTextContainer>
        <UserLogoutBtn onClick={handleLogOut}>로그아웃</UserLogoutBtn>
      </UserImgContainer>
      <ContentContainer>
        <ContentUl>
          {myInfoMenuTabs.map((menu, index) => (
            <ContentItem
              key={index}
              className={currentTab === index ? 'active' : ''}
              onClick={() => selectMenuHandler(index)}>
              {menu.name}
            </ContentItem>
          ))}
        </ContentUl>
        {myInfoMenuTabs[currentTab].content}
      </ContentContainer>
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
  padding-left: 25px;
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
