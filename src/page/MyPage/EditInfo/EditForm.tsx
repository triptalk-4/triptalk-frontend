import styled from 'styled-components';
import { MAIN_COLOR, SUPER_LIGHT_ORANGE_COLOR } from '../../../color/color';
import { useEffect, useState } from 'react';
import { passwordRegExp } from '../../../regex/Regex';
import axios from 'axios';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';

interface EditFormProps {
  onDataChange: (data: { newPassword: string; nickname: string }) => void;
}

export default function EditForm({ onDataChange }: EditFormProps) {
  // msw
  const [userEmail, setUserEmail] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const token = useSelector((state: RootState) => state.token.token); // Redux에서 토큰 가져오기

  // useEffect(() => {
  //   const storedUserData = localStorage.getItem('userInfo');
  //   if (storedUserData) {
  //     const userData = JSON.parse(storedUserData);
  //     setNickName(userData.nickname);
  //     setEmail(userData.email);
  //     setpassword(userData.password);
  //   }
  // }, []);

  useEffect(() => {
    // 데이터 가지고옴
    const token = localStorage.getItem('token');
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://52.79.200.55:8080/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`, //필수
          },
        });

        if (response.data) {
          const { email, nickname, password } = response.data;
          setUserEmail(email);
          setUserPassword(password);
          setUserNickname(nickname);
        } else {
          console.log(response);
          alert('사용자 정보가 없습니다 로그인확인해주세요');
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 오류 확인바람:', error);
      }
    };

    fetchUserInfo(); // 비동기 함수 호출
  }, [token, userEmail, userNickname, userPassword]);

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

  ///////////////////////현재비밀번호////////////////////
  const handleCurrentPasswordCheck = async () => {
    // 버튼 동작시 현재 비번과 입력값이 같은 지 확인함
    try {
      const response = await axios.post('http://52.79.200.55:8080/api/users/update/password/check', {
        email: userEmail,
        password: userPassword,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        // dispatch(setToken(response.data.token));
        const message = response.data.passwordCheckOk;
        alert(`${message}`);
        setUserPassword('');
      } else {
        alert('유효하지 않은 사용자 입니다.');
      }
    } catch (error: any) {
      alert(`${error.response.data}`);
    }
  };

  ///////////////////////새비밀번호////////////////////
  const [userNewPassword, setUserNewPassword] = useState('');
  const [newPasswordState, setNewPasswordState] = useState({
    value: '',
    valid: true,
    message: '',
  });

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPasswordValue = e.target.value;
    setUserNewPassword(newPasswordValue);

    // 현재 비밀번호와 새 비밀번호가 같은 경우 오류 메시지 출력
    if (newPasswordValue === userPassword) {
      setNewPasswordState({
        value: newPasswordValue,
        valid: false,
        message: '새 비밀번호는 현재 비밀번호와 달라야 합니다.',
      });
    } else {
      // 비밀번호 유효성 검사
      if (passwordRegExp.test(newPasswordValue)) {
        setNewPasswordState({
          value: newPasswordValue,
          valid: true,
          message: '유효한 비밀번호입니다.',
        });
      } else {
        setNewPasswordState({
          value: newPasswordValue,
          valid: false,
          message: '비밀번호는 8자리 이상, 영문자, 숫자, 특수문자를 포함해야 합니다.',
        });
      }
    }
  };

  ///////////////////////새비밀번호확인////////////////////
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [confirmNewPasswordState, setConfirmNewPasswordState] = useState({
    valid: true,
    message: '',
  });

  const handleConfirmNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmNewPasswordValue = e.target.value;
    setConfirmNewPassword(confirmNewPasswordValue);

    // userNewPassword와 confirmNewPassword를 비교하여 일치 여부 확인
    if (confirmNewPasswordValue === userNewPassword) {
      setConfirmNewPasswordState({
        valid: true,
        message: '새 비밀번호와 일치합니다.',
      });
    } else {
      setConfirmNewPasswordState({
        valid: false,
        message: '새 비밀번호와 일치하지 않습니다.',
      });
    }
  };

  return (
    <MyInfoGrid>
      <MyInfoField>
        <MyInfoLabel htmlFor="email">이메일</MyInfoLabel>
        <InputWithButton>
          <MyInfoInput type="email" id="email" value={userEmail} disabled />
        </InputWithButton>
      </MyInfoField>

      <MyInfoField>
        <MyInfoLabel htmlFor="nickname">닉네임</MyInfoLabel>
        <InputWithButton>
          <MyInfoInput type="text" id="nickname" value={userNickname} onChange={handleNicknameChange} />
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
            // value={currentPassword}
            // onChange={handleCurrentPasswordChange}
          />
          <CheckBtn type="button" onClick={handleCurrentPasswordCheck}>
            확인
          </CheckBtn>
        </InputWithButton>
      </MyInfoField>

      <MyInfoField>
        <MyInfoLabel htmlFor="new-password">새비밀번호</MyInfoLabel>
        <InputWithButton>
          <MyInfoInput
            type="password"
            id="new-password"
            placeholder="비밀번호 8자리이상(영문자+숫자+특수문자)"
            value={userNewPassword}
            onChange={handleNewPasswordChange}
          />
          {/* 새비밀번호 유효성 메시지를 표시 */}
          {newPasswordState.valid ? (
            <p style={{ color: 'green', paddingLeft: '15px', fontSize: '13px' }}>{newPasswordState.message}</p>
          ) : (
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
          {confirmNewPasswordState.valid ? (
            <p style={{ color: 'green', paddingLeft: '15px', fontSize: '13px' }}>{confirmNewPasswordState.message}</p>
          ) : (
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

  // 포커스 유무
  & + p {
    display: none;
  }

  &:focus + p {
    display: block;
  }
`;

const CheckBtn = styled.button`
  width: 45px;
  padding: 5px;
  margin-left: 15px;
  position: absolute;
`;
