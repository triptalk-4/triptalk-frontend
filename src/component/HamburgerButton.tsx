import { useState } from 'react';
import styled from 'styled-components';

interface HamburgerButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    onClick();
  };

  return (
    <Hamburger_Button className={`${isOpen ? 'open' : ''}`} onClick={handleClick}>
      <Bar />
      <Bar />
      <Bar />
    </Hamburger_Button>
  );
};

export default HamburgerButton;

const Hamburger_Button = styled.div`
  display: none;
  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    cursor: pointer;

    &.open {
      div:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 5px);
      }

      div:nth-child(2) {
        opacity: 0;
      }

      div:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -5px);
      }
    }
  }
  @media (max-width: 430px) {
    &.open {
      div:nth-child(1) {
        transform: rotate(-45deg) translate(-4px, 3px);
      }

      div:nth-child(2) {
        opacity: 0;
      }

      div:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -5px);
      }
    }
  }
`;

const Bar = styled.div`
  width: 30px;
  height: 3px;
  background-color: #333;
  margin: 2px 0;
  transition: 0.4s;
  @media (max-width: 685px) {
    width: 26px;
  }
  @media (max-width: 430px) {
    width: 20px;
    height: 2px;
  }
`;
