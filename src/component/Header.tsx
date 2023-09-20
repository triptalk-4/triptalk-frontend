import styled from 'styled-components';
import Search from './Search';
import { DEFAULT_FONT_COLOR, MAIN_COLOR } from '../color/color';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <GnbContainer>
      <Gnb>
        <Logo to="/main">
          <LogoImg src="/img/logo.png" alt="로고" />
        </Logo>
        <Avatar to="/myinfo"></Avatar>
      </Gnb>
      <Nav>
        <NavItem to="/main">홈</NavItem>
        <NavItem to="/main">여행지</NavItem>
        <NavItem to="/main">일정</NavItem>
        <NavItem to="/lookmap">리뷰맵</NavItem>
        <NavItem to="/">
          <Search />
        </NavItem>
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

const NavItem = styled(Link)`
  font-size: 23px;
  color: ${DEFAULT_FONT_COLOR};
  cursor: pointer;

  &:hover {
    color: ${MAIN_COLOR};
  }
`;
