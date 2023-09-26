import styled from 'styled-components';
import { YELLOW_COLOR } from '../../../color/color';

export default function RegionButton() {
  return (
    <ButtonContainer>
      <ButtonUl>
        <Buttonitem>
          <RegionBtn type="submit">서울</RegionBtn>
        </Buttonitem>
        <Buttonitem>
          <RegionBtn type="submit">부산</RegionBtn>
        </Buttonitem>
        <Buttonitem>
          <RegionBtn type="submit">대구</RegionBtn>
        </Buttonitem>
        <Buttonitem>
          <RegionBtn type="submit">인천</RegionBtn>
        </Buttonitem>
        <Buttonitem>
          <RegionBtn type="submit">광주</RegionBtn>
        </Buttonitem>
        <Buttonitem>
          <RegionBtn type="submit">대전</RegionBtn>
        </Buttonitem>
        <Buttonitem>
          <RegionBtn type="submit">울산</RegionBtn>
        </Buttonitem>
        <Buttonitem>
          <RegionBtn type="submit">세종</RegionBtn>
        </Buttonitem>
        <Buttonitem>
          <RegionBtn type="submit">경기도</RegionBtn>
        </Buttonitem>
        <Buttonitem>
          <RegionBtn type="submit">강원도</RegionBtn>
        </Buttonitem>
        <Buttonitem>
          <RegionBtn type="submit">충북</RegionBtn>
        </Buttonitem>
        <Buttonitem>
          <RegionBtn type="submit">충남</RegionBtn>
        </Buttonitem>
        <Buttonitem>
          <RegionBtn type="submit">전북</RegionBtn>
        </Buttonitem>
        <Buttonitem>
          <RegionBtn type="submit">전남</RegionBtn>
        </Buttonitem>
        <Buttonitem>
          <RegionBtn type="submit">경북</RegionBtn>
        </Buttonitem>
        <Buttonitem>
          <RegionBtn type="submit">경남</RegionBtn>
        </Buttonitem>
        <Buttonitem>
          <RegionBtn type="submit">제주도</RegionBtn>
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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
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
