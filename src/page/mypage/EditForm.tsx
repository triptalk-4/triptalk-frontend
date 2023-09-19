import styled from 'styled-components';
import { GRAY_COLOR, MAIN_COLOR, SUPER_LIGHT_ORANGE_COLOR } from '../../color/color';

export default function EditForm() {
  return (
    <MyInfoGrid>
      <MyInfoField>
        <MyInfoLabel htmlFor="email">이메일</MyInfoLabel>
        <MyInfoInput type="email" id="email" placeholder="고정할꺼임" />
        <MyInfoSapnWrap aria-hidden="true">
          <MyInfoSpan>이메일</MyInfoSpan>
        </MyInfoSapnWrap>
      </MyInfoField>
      <MyInfoField>
        <MyInfoLabel htmlFor="password">비밀번호</MyInfoLabel>
        <MyInfoInput type="password" id="password" placeholder="8~12자 영문, 숫자, 특수문자" />
        <MyInfoSapnWrap aria-hidden="true">
          <MyInfoSpan>비밀번호</MyInfoSpan>
        </MyInfoSapnWrap>
      </MyInfoField>
      <MyInfoField>
        <MyInfoLabel htmlFor="confirm-password">비밀번호확인</MyInfoLabel>
        <MyInfoInput type="password" id="password" placeholder="8~12자 영문, 숫자, 특수문자" />
        <MyInfoSapnWrap aria-hidden="true">
          <MyInfoSpan>비밀번호확인</MyInfoSpan>
        </MyInfoSapnWrap>
      </MyInfoField>
      <MyInfoField>
        <MyInfoLabel htmlFor="nickname">닉네임</MyInfoLabel>
        <MyInfoInput type="text" id="nickname" placeholder="6~20자 영문, 숫자" />
        <MyInfoSapnWrap aria-hidden="true">
          <MyInfoSpan>닉네임</MyInfoSpan>
        </MyInfoSapnWrap>
      </MyInfoField>
    </MyInfoGrid>
  );
}

const MyInfoGrid = styled.div`
  display: grid;
  row-gap: 50px;
`;

const MyInfoField = styled.div`
  position: relative;
`;

const MyInfoLabel = styled.label`
  position: absolute;
  left: 15px;
  top: 5px;
  cursor: pointer;
`;

const MyInfoInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 2px solid ${SUPER_LIGHT_ORANGE_COLOR};
  padding: 7px 15px;
  cursor: pointer;

  &::placeholder {
    font-size: 10px;
    opacity: 0;
    transition: opacity 0.2s ease-out;
  }

  &:focus::placeholder {
    opacity: 1;
    transition-delay: 0.2s;
  }

  &:focus {
    border-bottom: 2px solid ${MAIN_COLOR};
    transition: border-bottom 0.5s ease-out;
  }
`;

const MyInfoSapnWrap = styled.span`
  position: absolute;
  top: -15px;
  left: 15px;
`;

const MyInfoSpan = styled.span`
  font-size: 10px;
  color: ${GRAY_COLOR};
  opacity: 0;
`;
