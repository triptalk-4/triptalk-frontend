import styled from 'styled-components';
import { MAIN_COLOR } from '../../color/color';
import { FaArrowUp } from 'react-icons/fa';

function TopButton() {
  const MoveTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <StyledTopButton onClick={MoveTop}>
      <FaArrowUp />
    </StyledTopButton>
  );
}

export default TopButton;

const StyledTopButton = styled.button`
  position: fixed;
  font-size: 20px;
  bottom: 20px;
  right: 20px;
  background-color: ${MAIN_COLOR};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;
