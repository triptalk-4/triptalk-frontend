import styled from 'styled-components';
import { AiOutlineSetting } from 'react-icons/ai';
import { DEFAULT_FONT_COLOR, GRAY_COLOR, LIGHT_GRAY_COLOR } from '../../color/color';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MyInfoPost from './MyInfoPost';
import MyInfoSaved from './MyInfoSaved';
import TopButton from '../../component/TopButton/TopButton';

export default function MyInfo() {
  const [currentTab, setTab] = useState(0); // 탭기능
  const [userEditData, setUserEditData] = useState({
    imgUrl: '',
    nickname: '',
  }); // msw

  const myInfoMenuTabs = [
    { name: '게시물', content: <MyInfoPost /> },
    { name: '저장함', content: <MyInfoSaved /> },
  ];

  const selectMenuHandler = (index: any) => {
    setTab(index);
  };

  useEffect(() => {
    fetch('/api/userinfoeidt')
      .then(res => res.json())
      .then(data => setUserEditData(data))
      .catch(error => console.error('가짜 API 요청 실패:', error));
  }, []);

  return (
    <MyPageContainer>
      <UserImgContainer>
        <UserImg src={userEditData.imgUrl} />
        <UserNickNameContainer>
          <NickName>{userEditData.nickname}</NickName>
          <Setting to="/editmyinfo">
            <AiOutlineSetting />
          </Setting>
        </UserNickNameContainer>
        <UserLogoutBtn>로그아웃</UserLogoutBtn>
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
  padding-bottom: 40px;
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
