import styled from 'styled-components';
import { DEFAULT_FONT_COLOR, MAIN_COLOR } from '../color/color';
import { Link } from 'react-router-dom';

interface NavItemProps {
  $isActive: boolean;
}

const MobileMenu = ({ location }: { location: any }) => {
  return (
    <MobileMenuContainer>
      <NavItem to="/main" $isActive={location.pathname === '/main'}>
        홈
      </NavItem>
      <NavItem to="/schedule" $isActive={location.pathname === '/schedule'}>
        전체일정
      </NavItem>
      <NavItem to="/travelmap" $isActive={location.pathname === '/travelmap'}>
        리뷰맵
      </NavItem>
    </MobileMenuContainer>
  );
};

export default MobileMenu;

const MobileMenuContainer = styled.div`
  position: absolute;
  top: 70px; // 원하는 위치로 조절
  right: 0;
  background-color: #fff; // 메뉴 배경색
  border: 1px solid #ccc; // 메뉴 테두리 스타일
  padding: 10px; // 메뉴 내부 간격
  z-index: 99;
  @media (max-width: 1000px) {
    width: 120px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const NavItem = styled(Link)<NavItemProps>`
  cursor: pointer;
  color: ${DEFAULT_FONT_COLOR};
  display: block;
  position: relative;
  font-size: 20px;
  font-weight: bold;
  line-height: 24px;
  margin-right: 100px;
  text-decoration: none;

  @media (max-width: 1000px) {
    margin-right: auto;
    font-size: 18px;
  }
  @media (max-width: 710px) {
    margin-right: auto;
    font-size: 16px;
  }

  &:hover {
    font-weight: 700;
    color: ${MAIN_COLOR};
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background-color: ${MAIN_COLOR};
    transform: scaleX(0);
    transition: transform 0.2s ease-in-out;
  }

  ${props =>
    props.$isActive &&
    `
    color: ${MAIN_COLOR};
    
    &::after {
      transform: scaleX(1);
    }
  `}
`;
