import { BsArrowLeftCircleFill } from 'react-icons/bs';
import styled from 'styled-components';
import { GRAY_COLOR, LIGHT_ORANGE_COLOR, MAIN_COLOR } from '../../../color/color';

interface CustomPrevArrowProps {
  onClick?: () => void;
  disabled?: boolean; // 버튼 비활성화 상태
}

export default function CustomPrevArrow({ onClick, disabled }: CustomPrevArrowProps) {
  return (
    <CustomArrowButton onClick={onClick} disabled={disabled}>
      <BsArrowLeftCircleFill />
    </CustomArrowButton>
  );
}

const CustomArrowButton = styled.button`
  color: ${props => (props.disabled ? GRAY_COLOR : LIGHT_ORANGE_COLOR)};
  background-color: transparent;
  border: none;
  font-size: 25px;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')}; // 커서 포인터 설정
  position: absolute;
  z-index: 100;

  top: 50%;

  &:not(:disabled):hover {
    // 버튼이 활성화 상태이고 호버하는 경우에만 스타일 적용
    color: ${MAIN_COLOR};
  }
`;
