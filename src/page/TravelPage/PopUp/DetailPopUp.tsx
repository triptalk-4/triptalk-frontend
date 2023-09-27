import { BiSolidDownArrow } from 'react-icons/bi';
import styled, { css } from 'styled-components';
import { GRAY_COLOR, LIGHT_GRAY_COLOR, LIGHT_ORANGE_COLOR, MAIN_COLOR } from '../../../color/color';
import { useState } from 'react';
import RegionButton from './RegionButton';
import OrderButton from './OrderButton';

export default function DetailPopUp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');

  // 이전값 값 저장변수
  const [previousRegion, setPreviousRegion] = useState('');
  const [previousOrder, setPreviousOrder] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // setSelectedRegion('');
    // setSelectedOrder(''); 초기화

    setSelectedRegion(previousRegion);
    setSelectedOrder(previousOrder);

    setIsModalOpen(false);
  };

  const handleRegionChange = (region: string) => {
    setPreviousRegion(selectedRegion);
    setSelectedRegion(region);
  };

  const handleOrderChange = (order: string) => {
    setPreviousOrder(selectedOrder);
    setSelectedOrder(order);
  };

  const handleConfirm = () => {
    console.log('선택한 지역:', selectedRegion);
    console.log('선택한 보고싶은 순:', selectedOrder);

    setIsModalOpen(false);
  };

  return (
    <PopUpBox>
      <PopUpDiv>
        <PopUptext onClick={openModal}>
          {selectedRegion ? `${selectedRegion} > ${selectedOrder}` : '여행지를 선택해주세요.'}
          <PopUpBtn type="button">
            <BiSolidDownArrow />
          </PopUpBtn>
        </PopUptext>
      </PopUpDiv>
      {isModalOpen && (
        <ModalBackground>
          <ModalContent>
            {/* 모달 내용 */}
            <TitleText>지역을 눌려주세요</TitleText>
            <RegionButton selectedRegion={selectedRegion} onRegionChange={handleRegionChange} />
            <Line></Line>
            <TitleText>보고싶은 순을 눌려주세요</TitleText>
            <OrderButton selectedOrder={selectedOrder} onOrderChange={handleOrderChange} />
            <BtnContainer>
              <CheckBtn onClick={() => handleConfirm()}>확인</CheckBtn>
              <CloseBtn onClick={closeModal}>취소</CloseBtn>
            </BtnContainer>
          </ModalContent>
        </ModalBackground>
      )}
    </PopUpBox>
  );
}

const PopUpBox = styled.div`
  display: flex;
  position: relative;
`;

const PopUpDiv = styled.div`
  text-decoration: none;
  width: 530px;
  height: 50px;
  margin-left: auto;
  border: 2px solid ${LIGHT_GRAY_COLOR};
  border-radius: 15px;
`;

const PopUptext = styled.span`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  padding: 10px;
  color: ${GRAY_COLOR};
  cursor: pointer;
`;

const PopUpBtn = styled.button`
  right: 10px;
  top: 23%;
  font-size: 25px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${LIGHT_GRAY_COLOR};

  &:hover {
    color: ${GRAY_COLOR};
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const TitleText = styled.h2`
  display: flex;
  font-size: 25px;
  justify-content: center;
`;

const Line = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 20px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border: 1px solid #000;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 55px;
`;

const BtnStyle = css`
  width: 100px;
  height: 55px;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 15px;
  font-size: 15px;
`;

const CheckBtn = styled.button`
  ${BtnStyle}
  margin-right: 25px;
  background-color: ${LIGHT_ORANGE_COLOR};

  &:hover {
    background-color: ${MAIN_COLOR};
  }
`;

const CloseBtn = styled.button`
  ${BtnStyle}
  background-color: ${LIGHT_GRAY_COLOR};
`;
