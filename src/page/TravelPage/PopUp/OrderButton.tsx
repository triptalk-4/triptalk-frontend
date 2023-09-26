import styled from 'styled-components';
import { YELLOW_COLOR } from '../../../color/color';

export default function OrderButton() {
  return (
    <ButtonContainer>
      <ButtonUl>
        <Buttonitem>
          <RegionBtn type="submit">날짜순</RegionBtn>
        </Buttonitem>
        <Buttonitem>
          <RegionBtn type="submit">좋아요순</RegionBtn>
        </Buttonitem>
        <Buttonitem>
          <RegionBtn type="submit">조회순</RegionBtn>
        </Buttonitem>
      </ButtonUl>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  margin: 15px 0;
`;

const ButtonUl = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
`;
const Buttonitem = styled.li`
  margin: 15px;
`;
const RegionBtn = styled.button`
  width: 100px;
  height: 55px;
  border: 1px solid #000;
  background-color: #fff;
  border-radius: 15px;
  font-size: 15px;

  &:hover {
    background-color: ${YELLOW_COLOR};
    color: #fff;
    border: none;
  }
`;
