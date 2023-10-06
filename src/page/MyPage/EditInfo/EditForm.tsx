import styled from 'styled-components';
import { MAIN_COLOR, SUPER_LIGHT_ORANGE_COLOR } from '../../../color/color';
import { useEffect, useState } from 'react';
import { passwordRegExp } from '../../../regex/Regex';

interface EditDataProps {
  updateUserEditData: (userData: any) => void;
}

interface InputState {
  value: string;
  valid: boolean;
  message: string;
}

export default function EditForm({ updateUserEditData }: EditDataProps) {
  const [userEditData, setUserEditData] = useState({
    email: '',
    password: '',
    nickname: '',
  }); // msw

  useEffect(() => {
    fetch('/api/userinfoeidt')
      .then(res => res.json())
      .then(data => setUserEditData(data))
      .catch(error => console.error('가짜 API 요청 실패:', error));
  }, []);

  ///////////////////////현재비밀번호////////////////////
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordState, setCurrentPasswordState] = useState<InputState>({
    value: '',
    valid: true,
    message: '',
  });

  const validateCurrentPassword = (value: string) => {
    // 기존 비밀번호와 비교하여 일치 여부 확인
    if (value === userEditData.password) {
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

    // 사용자 정보를 업데이트
    updateUserEditData({
      ...userEditData,
      password: currentPasswordValue,
    });
  };

  ///////////////////////새비밀번호////////////////////
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordState, setNewPasswordState] = useState<InputState>({
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
  const [confirmNewPasswordState, setConfirmNewPasswordState] = useState<InputState>({
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
  const [nickname, setNickname] = useState(userEditData.nickname);
  const [nicknameState, setNicknameState] = useState<InputState>({
    value: nickname,
    valid: true,
    message: '',
  });

  /* 닉네임 수정 */

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    const validationNickname = validateName(newNickname);

    setNickname(newNickname); // 입력된 닉네임을 상태에 저장
    setNicknameState({
      value: newNickname,
      valid: validationNickname.valid,
      message: validationNickname.message,
    });

    // 사용자 정보를 업데이트
    updateUserEditData({
      ...userEditData,
      nickname: newNickname,
    });
  };

  const validateName = (value: string) => {
    // 닉네임 유효성 검사
    if (value.length < 2 || value.length > 5) {
      return { valid: false, message: '닉네임은 2글자이상 5글자이하로 입력해야 합니다.' };
    } else {
      return { valid: true, message: '사용 가능한 닉네임 입니다.' };
    }
  };

  return (
    <MyInfoGrid>
      <MyInfoField>
        <MyInfoLabel htmlFor="email">이메일</MyInfoLabel>
        <InputWithButton>
          <MyInfoInput type="email" id="email" value={userEditData.email} disabled />
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

      <MyInfoField>
        <MyInfoLabel htmlFor="nickname">닉네임</MyInfoLabel>
        <InputWithButton>
          <MyInfoInput type="text" id="nickname" defaultValue={userEditData.nickname} onChange={handleNicknameChange} />
          {/* 닉네임 유효성 메시지를 표시 */}
          {!nicknameState.valid && (
            <p style={{ color: 'red', paddingLeft: '15px', fontSize: '13px' }}>{nicknameState.message}</p>
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
