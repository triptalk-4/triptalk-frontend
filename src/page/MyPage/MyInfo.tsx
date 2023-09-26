import styled from 'styled-components';
import { AiOutlineSetting } from 'react-icons/ai';
import { DEFAULT_FONT_COLOR, GRAY_COLOR } from '../../color/color';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import MyInfoPost from './MyInfoPost';
import MyInfoSaved from './MyInfoSaved';

export default function MyInfo() {
  const [currentTab, setTab] = useState(0);

  const myInfoMenuTabs = [
    { name: '게시물', content: <MyInfoPost /> },
    { name: '저장함', content: <MyInfoSaved /> },
  ];

  const selectMenuHandler = (index: any) => {
    setTab(index);
  };

  return (
    <MyPageContainer>
      <AvatarImgContainer>
        <AvatarImg></AvatarImg>
        <AvatarNickNameContainer>
          <NickName>닉네임</NickName>
          <Setting to="/editmyinfo">
            <AiOutlineSetting />
          </Setting>
        </AvatarNickNameContainer>
        <AvatarLogoutBtn>로그아웃</AvatarLogoutBtn>
      </AvatarImgContainer>
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
    </MyPageContainer>
  );
}

const MyPageContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const AvatarImgContainer = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarImg = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid #000;
  border-radius: 100%;
  margin: 0 auto;
`;

const AvatarNickNameContainer = styled.div`
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

const AvatarLogoutBtn = styled.button`
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
