import styled from 'styled-components';
import { MAIN_COLOR, SUPER_LIGHT_ORANGE_COLOR } from '../../../color/color';
import { useEffect, useState } from 'react';
import { passwordRegExp } from '../../../regex/Regex';

interface EditFormProps {
  onDataChange: (data: { newPassword: string; nickname: string }) => void;
}

export default function EditForm({ onDataChange }: EditFormProps) {
  // msw
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  useEffect(() => {
    const storedUserData = localStorage.getItem('userInfo');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setNickName(userData.nickname);
      setEmail(userData.email);
      setpassword(userData.password);
    }
  }, []);

  ///////////////////////현재비밀번호////////////////////
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordState, setCurrentPasswordState] = useState({
    value: '',
    valid: true,
    message: '',
  });
  const handleCurrentPasswordCheck = () => {
    if (currentPassword === password) {
      setCurrentPasswordState({
        value: currentPassword,
        valid: true,
        message: '현재 비밀번호가 일치합니다.',
      });
    } else {
      setCurrentPasswordState({
        value: currentPassword,
        valid: false,
        message: '현재 비밀번호가 일치하지 않습니다.',
      });
    }
  };

  const validateCurrentPassword = (value: string) => {
    // 기존 비밀번호와 비교하여 일치 여부 확인
    if (value === password) {
      setCurrentPasswordState({
        value,
        valid: true,
        message: '현재 비밀번호가 일치합니다.',
      });
    } else {
      setCurrentPasswordState({
        value,
        valid: false,
        message: '현재 비밀번호가 일치하지 않습니다.',
      });
    }
  };

  const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPasswordValue = e.target.value;
    setCurrentPassword(currentPasswordValue);
    validateCurrentPassword(currentPasswordValue);
  };

  ///////////////////////새비밀번호////////////////////
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordState, setNewPasswordState] = useState({
    value: '',
    valid: true,
    message: '',
  });

  const validateNewPassword = (value: string) => {
    // 비밀번호 유효성 검사

    if (passwordRegExp.test(value)) {
      setNewPasswordState({
        value,
        valid: true,
        message: '유효한 비밀번호입니다.',
      });
    } else {
      setNewPasswordState({
        value,
        valid: false,
        message: '비밀번호는 8자리 이상, 영문자, 숫자, 특수문자를 포함해야 합니다.',
      });
    }
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);
    validateNewPassword(newPasswordValue);
  };

  ///////////////////////새비밀번호확인////////////////////
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [confirmNewPasswordState, setConfirmNewPasswordState] = useState({
    value: '',
    valid: true,
    message: '',
  });

  const validateConfirmNewPassword = (value: string) => {
    if (value === newPassword) {
      setConfirmNewPasswordState({
        value,
        valid: true,
        message: '새비밀번호와 일치합니다.',
      });
    } else {
      setConfirmNewPasswordState({
        value,
        valid: false,
        message: '새비밀번호와 일치하지 않습니다.',
      });
    }
  };

  const handleConfirmNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmNewPasswordValue = e.target.value;
    setConfirmNewPassword(confirmNewPasswordValue);
    validateConfirmNewPassword(confirmNewPasswordValue);
  };

  ///////////////////////닉네임////////////////////
  const handleNicknameCheck = () => {
    // 입력한 닉네임과 기존 닉네임을 비교하여 겹치는지 확인
    if (nickName === nickName) {
      setNicknameState({
        valid: false,
        message: '현재 닉네임과 동일합니다. 다른 닉네임을 입력해주세요.',
      });
    } else {
      setNicknameState({
        valid: true,
        message: '사용 가능한 닉네임입니다.',
      });
    }
  };

  // 유효성 검사 결과를 저장하는 상태 변수
  const [nicknameState, setNicknameState] = useState({
    valid: true,
    message: '',
  });

  // 닉네임 입력이 변경될 때 호출되는 함수
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setNickName(newNickname);

    const validateNickname = (value: string) => {
      if (value.length < 2 || value.length > 5) {
        return { valid: false, message: '닉네임은 2글자 이상 5글자 이하로 입력해야 합니다.' };
      } else {
        return { valid: true, message: '사용 가능한 닉네임입니다.' };
      }
    };

    // 닉네임의 유효성 검사를 수행하고 결과를 nicknameState에 저장
    const validation = validateNickname(newNickname);
    setNicknameState({
      valid: validation.valid,
      message: validation.message,
    });

    // 새로 입력된 닉네임을 저장하는 변수
    const newNicknameValue = newNickname;

    onDataChange({
      newPassword: newPassword,
      nickname: newNicknameValue,
    });
  };

  return (
    <MyInfoGrid>
      <MyInfoField>
        <MyInfoLabel htmlFor="email">이메일</MyInfoLabel>
        <InputWithButton>
          <MyInfoInput type="email" id="email" value={email} disabled />
        </InputWithButton>
      </MyInfoField>

      <MyInfoField>
        <MyInfoLabel htmlFor="nickname">닉네임</MyInfoLabel>
        <InputWithButton>
          <MyInfoInput type="text" id="nickname" value={nickName} onChange={handleNicknameChange} />
          <CheckBtn type="button" onClick={handleNicknameCheck}>
            확인
          </CheckBtn>
          {/* 닉네임 유효성 메시지를 표시 */}
          {!nicknameState.valid && (
            <p style={{ color: 'red', paddingLeft: '15px', fontSize: '13px' }}>{nicknameState.message}</p>
          )}
        </InputWithButton>
      </MyInfoField>

      <MyInfoField>
        <MyInfoLabel htmlFor="current-password">현재비밀번호</MyInfoLabel>
        <InputWithButton>
          <MyInfoInput
            type="password"
            id="current-password"
            placeholder="현재비밀번호를 입력해주세요."
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
          />
          <CheckBtn type="button" onClick={handleCurrentPasswordCheck}>
            확인
          </CheckBtn>
          {/* 현재 비밀번호 유효성 메시지를 표시합니다. */}
          {!currentPasswordState.valid && (
            <p style={{ color: 'red', paddingLeft: '15px', fontSize: '13px' }}>{currentPasswordState.message}</p>
          )}
        </InputWithButton>
      </MyInfoField>

      <MyInfoField>
        <MyInfoLabel htmlFor="new-password">새비밀번호</MyInfoLabel>
        <InputWithButton>
          <MyInfoInput
            type="password"
            id="new-password"
            placeholder="비밀번호 8자리이상(영문자+숫자+특수문자)"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          {/* 새비밀번호 유효성 메시지를 표시 */}
          {!newPasswordState.valid && (
            <p style={{ color: 'red', paddingLeft: '15px', fontSize: '13px' }}>{newPasswordState.message}</p>
          )}
        </InputWithButton>
      </MyInfoField>

      <MyInfoField>
        <MyInfoLabel htmlFor="confirm-new-password">새비밀번호확인</MyInfoLabel>
        <InputWithButton>
          <MyInfoInput
            type="password"
            id="confirm-new-password"
            placeholder="비밀번호 8자리이상(영문자+숫자+특수문자)"
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
          />
          {/* 새비밀번호 확인 유효성 메시지를 표시 */}
          {!confirmNewPasswordState.valid && (
            <p style={{ color: 'red', paddingLeft: '15px', fontSize: '13px' }}>{confirmNewPasswordState.message}</p>
          )}
        </InputWithButton>
      </MyInfoField>
    </MyInfoGrid>
  );
}

const MyInfoGrid = styled.div`
  display: grid;
  row-gap: 10px;
`;

const MyInfoField = styled.div`
  height: 82px;
`;

const MyInfoLabel = styled.label`
  font-size: 16px;
  padding-left: 15px;
  font-weight: bold;
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
  position: relative;

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

const CheckBtn = styled.button`
  width: 45px;
  padding: 5px;
  margin-left: 15px;
  position: absolute;
`;
