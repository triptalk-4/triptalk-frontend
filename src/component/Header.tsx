import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Search from './Search/Search';
import { DEFAULT_FONT_COLOR, MAIN_COLOR } from '../color/color';
import { Link } from 'react-router-dom';

interface NavItemProps {
  to: string;
  $isActive: boolean;
}

export default function Header() {
  const [activeTab, setActiveTab] = useState<string>(localStorage.getItem('activeTab') || 'home');
  const tabsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (tabsRef.current && !tabsRef.current.contains(event.target as Node)) {
        setActiveTab('');
      }
    };

    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  // 활성 탭이 변경될 때 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  return (
    <GnbContainer>
      <Gnb>
        <Logo to="/main">
          <LogoImg src="/img/logo.png" alt="로고" />
        </Logo>
        <Avatar to="/myinfo"></Avatar>
      </Gnb>
      <Nav ref={tabsRef}>
        <NavItem to="/main" onClick={() => handleTabClick('home')} $isActive={activeTab === 'home'}>
          홈
        </NavItem>
        <NavItem to="/travel" onClick={() => handleTabClick('travel')} $isActive={activeTab === 'travel'}>
          여행지
        </NavItem>
        <NavItem to="/schedule" onClick={() => handleTabClick('schedule')} $isActive={activeTab === 'schedule'}>
          일정
        </NavItem>
        <NavItem to="/lookmap" onClick={() => handleTabClick('lookmap')} $isActive={activeTab === 'lookmap'}>
          리뷰맵
        </NavItem>
        <Search />
      </Nav>
    </GnbContainer>
  );
}

const GnbContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  height: auto;
`;

const Gnb = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 55px 15px;
  border-bottom: 1px solid #c1c1c1;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  padding-right: 400px;
  cursor: pointer;
`;

const LogoImg = styled.img`
  width: 200px;
  height: auto;
`;

const Avatar = styled(Link)`
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  border-radius: 100%;
  cursor: pointer;
`;

const Nav = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #343434;
  padding: 15px 55px;
`;

const NavItem = styled(Link)<NavItemProps>`
  font-size: 20px;
  color: ${DEFAULT_FONT_COLOR};
  cursor: pointer;

  &:hover {
    color: ${MAIN_COLOR};
  }

  ${props =>
    props.$isActive &&
    `
    color: ${MAIN_COLOR};
  `}
`;
