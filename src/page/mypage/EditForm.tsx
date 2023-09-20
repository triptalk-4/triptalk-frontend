import { useState } from 'react';
import styled from 'styled-components';
import { GRAY_COLOR, MAIN_COLOR, SUPER_LIGHT_ORANGE_COLOR } from '../../color/color';
import { BiEditAlt } from 'react-icons/bi';

export default function EditForm() {
  // 초기값 설정
  const [email, setEmail] = useState('leesh2985@naver.com');
  const [password, setPassword] = useState('1234');
  const [nickname, setNickname] = useState('이승현');

  // 수정 상태를 관리하는 상태 변수 추가
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingNickname, setIsEditingNickname] = useState(false);

  // 수정 버튼을 누르면 해당 필드를 수정 가능한 상태로 전환
  const startEditing = (field: string) => {
    if (field === 'email') {
      setIsEditingEmail(true);
    } else if (field === 'password') {
      setIsEditingPassword(true);
    } else if (field === 'nickname') {
      setIsEditingNickname(true);
    }
  };

  return (
    <MyInfoGrid>
      <MyInfoField>
        <MyInfoLabel htmlFor="email">이메일</MyInfoLabel>
        <ReadOnlyValue>{email}</ReadOnlyValue>
        <MyInfoSapnWrap aria-hidden="true">
          <MyInfoSpan>이메일</MyInfoSpan>
        </MyInfoSapnWrap>
      </MyInfoField>
      <MyInfoField>
        <MyInfoLabel htmlFor="password">비밀번호</MyInfoLabel>
        <EditButton type="button" onClick={() => startEditing('password')}>
          <BiEditAlt />
        </EditButton>
        {isEditingPassword ? (
          <MyInfoInput type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
        ) : (
          <ReadOnlyValue>{password}</ReadOnlyValue>
        )}
        <MyInfoSapnWrap aria-hidden="true">
          <MyInfoSpan>비밀번호</MyInfoSpan>
        </MyInfoSapnWrap>
      </MyInfoField>
      <MyInfoField>
        <MyInfoLabel htmlFor="confirm-password">비밀번호확인</MyInfoLabel>
        <EditButton type="button" onClick={() => startEditing('password')}>
          <BiEditAlt />
        </EditButton>
        {isEditingPassword ? (
          <MyInfoInput type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
        ) : (
          <ReadOnlyValue>{password}</ReadOnlyValue>
        )}
        <MyInfoSapnWrap aria-hidden="true">
          <MyInfoSpan>비밀번호확인</MyInfoSpan>
        </MyInfoSapnWrap>
      </MyInfoField>
      <MyInfoField>
        <MyInfoLabel htmlFor="nickname">닉네임</MyInfoLabel>
        <EditButton type="button" onClick={() => startEditing('nickname')}>
          <BiEditAlt />
        </EditButton>
        {isEditingNickname ? (
          <MyInfoInput type="text" id="nickname" value={nickname} onChange={e => setNickname(e.target.value)} />
        ) : (
          <ReadOnlyValue>{nickname}</ReadOnlyValue>
        )}
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
  opacity: 0;
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
`;

const EditButton = styled.button`
  position: absolute;
  right: 15px;
  top: 5px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 25px;
`;
const ReadOnlyValue = styled.div`
  border-bottom: 2px solid ${SUPER_LIGHT_ORANGE_COLOR};
  padding: 5px 15px;
`;
