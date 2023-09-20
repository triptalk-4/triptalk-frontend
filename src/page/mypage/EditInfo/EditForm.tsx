import styled from 'styled-components';
import { GRAY_COLOR, MAIN_COLOR, SUPER_LIGHT_ORANGE_COLOR } from '../../../color/color';
import { BiEditAlt } from 'react-icons/bi';
import { useState } from 'react';

interface EditFormData {
  email: string;
  password: string;
  nickname: string;
}

interface InputState {
  value: string;
  valid: boolean;
  message: string;
}

export default function EditForm() {
  const defaultValues: EditFormData = {
    email: 'user1@naver.com',
    password: 'Password123',
    nickname: '사조사조',
  };

  // const [passwordState, setPasswordState] = useState<InputState>({
  //   value: defaultValues.password,
  //   valid: true,
  //   message: '',
  // });

  const [password, setPassword] = useState(defaultValues.password);
  const [confirmPassword, setConfirmPassword] = useState(defaultValues.password);
  const [nickname, setNickname] = useState(defaultValues.nickname);

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingConfirmPassword, setIsEditingConfirmPassword] = useState(false);
  const [isEditingNickname, setIsEditingNickname] = useState(false);

  /* 비밀번호 수정 */
  const handlePasswordEditClick = () => {
    setIsEditingPassword(!isEditingPassword);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  /* 비밀번호 확인 수정 */
  const handleConfirmPasswordEditClick = () => {
    setIsEditingConfirmPassword(!isEditingConfirmPassword);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  /* 닉네임 수정 */
  const handleNicknameEditClick = () => {
    setIsEditingNickname(!isEditingNickname);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    const validation = validateName(newNickname);

    setNickname(newNickname); // 입력된 닉네임을 상태에 저장
    setNicknameState({
      value: newNickname,
      valid: validation.valid,
      message: validation.message,
    });
  };

  // 닉네임 유효성 검사 결과를 저장하는 상태
  const [nicknameState, setNicknameState] = useState<InputState>({
    value: defaultValues.nickname,
    valid: true, // 필요에 따라 초기 유효성을 설정할 수 있습니다.
    message: '',
  });

  const validateName = (value: string) => {
    // 닉네임 유효성 검사
    if (value.length < 2 || value.length > 5) {
      return { valid: false, message: '닉네임은 2글자 이상 5글자 이하로 입력 부탁드립니다.' };
    } else {
      return { valid: true, message: '사용 가능한 닉네임 입니다.' };
    }
  };

  return (
    <MyInfoGrid>
      <MyInfoField>
        <MyInfoLabel htmlFor="email">이메일</MyInfoLabel>
        <InputWithButton>
          <MyInfoInput type="email" id="email" value={defaultValues.email} disabled />
        </InputWithButton>
      </MyInfoField>
      <MyInfoField>
        <MyInfoLabel htmlFor="password">비밀번호</MyInfoLabel>
        <InputWithButton>
          <MyInfoInput
            type="password"
            id="password"
            defaultValue={password}
            onChange={handlePasswordChange}
            disabled={!isEditingPassword}
          />
          <EditButton type="button" onClick={handlePasswordEditClick}>
            <BiEditAlt />
          </EditButton>
        </InputWithButton>
      </MyInfoField>
      <MyInfoField>
        <MyInfoLabel htmlFor="confirm-password">비밀번호확인</MyInfoLabel>
        <InputWithButton>
          <MyInfoInput
            type="password"
            id="confirm-password"
            defaultValue={confirmPassword}
            onChange={handleConfirmPasswordChange}
            disabled={!isEditingConfirmPassword}
          />
          <EditButton type="button" onClick={handleConfirmPasswordEditClick}>
            <BiEditAlt />
          </EditButton>
        </InputWithButton>
      </MyInfoField>
      <MyInfoField>
        <MyInfoLabel htmlFor="nickname">닉네임</MyInfoLabel>
        <InputWithButton>
          <MyInfoInput
            type="text"
            id="nickname"
            defaultValue={nickname}
            onChange={handleNicknameChange}
            disabled={!isEditingNickname}
          />
          <EditButton type="button" onClick={handleNicknameEditClick}>
            <BiEditAlt />
          </EditButton>{' '}
          {/* 닉네임 유효성 메시지를 표시합니다. */}
          {!nicknameState.valid && <p style={{ color: 'red' }}>{nicknameState.message}</p>}
        </InputWithButton>
      </MyInfoField>
    </MyInfoGrid>
  );
}

const MyInfoGrid = styled.div`
  display: grid;
  row-gap: 50px;
`;

const MyInfoField = styled.div``;

const MyInfoLabel = styled.label`
  font-size: 10px;
  color: ${GRAY_COLOR};
  padding-left: 15px;
`;

const InputWithButton = styled.div`
  position: relative;
`;

const MyInfoInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 2px solid ${SUPER_LIGHT_ORANGE_COLOR};
  padding: 7px 15px;

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

  &:disabled {
    background-color: #f2f2f2;
  }
`;

const EditButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 25px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;
