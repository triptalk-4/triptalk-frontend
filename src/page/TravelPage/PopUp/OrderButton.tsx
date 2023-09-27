import { useEffect } from 'react';
import styled from 'styled-components';
import { YELLOW_COLOR } from '../../../color/color';

interface OrderButtonProps {
  selectedOrder: string | null;
  onOrderChange: (order: string) => void;
}

export default function OrderButton({ selectedOrder, onOrderChange }: OrderButtonProps) {
  const orders = ['날짜순', '좋아요순', '조회순'];

  useEffect(() => {
    console.log('selectedOrder:', selectedOrder);
  }, [selectedOrder]);

  return (
    <ButtonContainer>
      <OrderBtnDiv>
        {orders.map(order => (
          <OrderBtn key={order} value={order} isSelected={selectedOrder === order} onClick={() => onOrderChange(order)}>
            {order}
          </OrderBtn>
        ))}
      </OrderBtnDiv>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  margin: 15px 0;
`;

const OrderBtnDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const OrderBtn = styled.button<{ isSelected: boolean }>`
  width: 100px;
  height: 55px;
  border: 1px solid #000;
  border: ${props => (props.isSelected ? 'none' : '1px solid #000')};
  background-color: ${props => (props.isSelected ? YELLOW_COLOR : '#fff')};
  color: ${props => (props.isSelected ? '#fff' : '#000')};
  border-radius: 15px;
  font-size: 15px;
  cursor: pointer;
  margin-right: 5px;
`;
