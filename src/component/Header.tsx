import { useRef } from 'react';
import styled from 'styled-components';
import Search from './Search/Search';
import { DEFAULT_FONT_COLOR, MAIN_COLOR } from '../color/color';
import { Link, useLocation } from 'react-router-dom';

interface NavItemProps {
  $isActive: boolean;
}

export default function Header() {
  // const defaultImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  const tabsRef = useRef<HTMLUListElement>(null);
  const location = useLocation();

  return (
    <GnbContainer>
      <Gnb>
        <LogoDiv>
          <Logo to="/main">
            <LogoImg src="/img/logo.png" alt="로고" />
          </Logo>
        </LogoDiv>
        <User to="/myinfo">
          <UserImg src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
        </User>
      </Gnb>
      <Nav ref={tabsRef}>
        <NavItem to="/main" $isActive={location.pathname === '/main'}>
          홈
        </NavItem>
        <NavItem to="/travel" $isActive={location.pathname === '/travel'}>
          여행지
        </NavItem>
        <NavItem to="/schedule" $isActive={location.pathname === '/schedule'}>
          일정
        </NavItem>
        <NavItem to="/lookmap" $isActive={location.pathname === '/lookmap'}>
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

const LogoDiv = styled.div`
  width: 200px;
  height: auto;
  padding-right: 590px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LogoImg = styled.img`
  width: 200px;
  height: auto;
`;

const User = styled(Link)`
  height: 50px;
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
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

  ${props => props.$isActive && `color: ${MAIN_COLOR};`}
`;
