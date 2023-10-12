import { useNavigate } from 'react-router';
import axios from 'axios';
import { nameRegExp, emailRegExp, passwordRegExp, nickNameRegExp } from '../../regex/Regex';

import styled from 'styled-components';
import { GRAY_COLOR, MAIN_COLOR, YELLOW_COLOR } from '../../color/color';
import { ChangeEvent, useState } from 'react';
import { FaEyeSlash, FaEye, FaArrowLeft } from 'react-icons/fa';
import { API_DOMAIN } from '../domain/address';

interface InputState {
  value: string;
  valid: boolean;
  message: string;
}

const SignupForm = () => {
  const navigator = useNavigate();

  const [error, setError] = useState<string | null>(null);
  // state 가 생성될게 많아서 객체형태로
  const [email, setEmail] = useState<InputState>({ value: '', valid: false, message: '' });
  const [emailInspectionCode, setEmailInspectionCode] = useState('');
  const [password, setPassword] = useState<InputState>({ value: '', valid: false, message: '' });
  const [passwordConfirm, setPasswordConfirm] = useState<InputState>({ value: '', valid: false, message: '' });
  const [name, setName] = useState<InputState>({ value: '', valid: false, message: '' });
  const [nickName, setNicName] = useState<InputState>({ value: '', valid: false, message: '' });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    validator: (value: string) => { valid: boolean; message: string }
  ) => {
    const { name, value } = e.target; // name 변수에 input name을 타겟, value 변수에 input value 타겟
    const { valid, message } = validator(value); // 위에서 타겟된 input value 인자로 넣음

    let updatedValue = { value, valid, message }; // 입력 값을 포함한 객체 생성

    switch (
      name // 내가 선택한 인풋창의 타겟하여 name 가져옴 input name이 email일 경우 case 'email'에서 멈춰서 setEmail()을 함
    ) {
      case 'name':
        setName(updatedValue);
        break;
      case 'email':
        setEmail(updatedValue);
        break;
      case 'password':
        setPassword(updatedValue);
        break;
      case 'passwordConfirm':
        setPasswordConfirm(updatedValue);
        break;
      case 'nickname':
        setNicName(updatedValue);
        break;
      default:
        break;
    }
  };

  const validateName = (value: string) => {
    // 이름 유효성 검사
    if (!nameRegExp.test(value)) {
      return { valid: false, message: '이름은 한글로만 입력해주세요' };
    } else {
      return { valid: true, message: '' };
    }
  };

  const validateEmail = (value: string) => {
    // 이메일 유효성 검사
    if (!emailRegExp.test(value)) {
      return { valid: false, message: '이메일의 형식이 올바르지 않습니다.' };
    } else {
      return { valid: true, message: '사용 가능한 이메일 입니다.' };
    }
  };

  const validatePassword = (value: string) => {
    // 비밀번호 유효성 검사
    if (!passwordRegExp.test(value)) {
      return { valid: false, message: '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!' };
    } else {
      return { valid: true, message: '안전한 비밀번호 입니다.' };
    }
  };

  const validatePasswordConfirm = (value: string) => {
    // 비밀번호확인  검사
    if (value !== password.value) {
      return { valid: false, message: '비밀번호가 다릅니다.' };
    } else {
      return { valid: true, message: '똑같은 비밀번호를 입력했습니다.' };
    }
  };

  const validateNicName = (value: string) => {
    // 닉네임 유효성 검사
    if (!nickNameRegExp.test(value)) {
      return { valid: false, message: '닉네임은 2글자 이상 5글자 이하로 입력 부탁드립니다.' };
    } else {
      return { valid: true, message: '사용 가능한 닉네임 입니다.' };
    }
  };

  const isFormValid = () => {
    // 모든 유효성검사 ture 시 return 반환 하여 버튼 활성화
    return email.valid && password.valid && passwordConfirm.valid && name.valid;
  };

  // 회원가입 요청 함수
  const sendSignupData = async (formData: any) => {
    try {
      const res = await axios.post(`${API_DOMAIN}/api/users/register`, formData);
      return res.data;
    } catch (error: any) {
      if (error.response) {
        console.log('gqw: ', error.response);
        return error.response.data;
      }
      console.error('API 요청 실패:', error);
      throw error;
    }
  };

  // 회원가입 버튼
  const handleSignup = async () => {
    if (isFormValid()) {
      try {
        const formData = {
          email: email.value,
          password: password.value,
          name: name.value,
          nickname: nickName.value,
        };

        const res = await sendSignupData(formData);
        if (res.registerOk) {
          alert(res.registerOk);
          navigator('/main');
        } else if (res) {
          console.log(res);
          setError(res);
        } else {
          setError('회원가입에 실패했습니다.');
        }
      } catch (error: any) {
        console.error('error:', error);
        setError('서버와 연결이 되지 않습니다.');
      }
    }
  };

  // 이메일 인증 호출
  const sendEmailCertified = async (emailAddress: any) => {
    try {
      const res = await axios.post(`${API_DOMAIN}/api/users/register/email/send`, {
        email: emailAddress,
      });
      return res.data;
    } catch (error: any) {
      console.error('이메일 인증 요청 실패:', error);
      throw error;
    }
  };

  // 이메일 인증 요청 버튼
  const handleEmailCertified = async () => {
    if (email.valid) {
      try {
        const response = await sendEmailCertified(email.value);
        if (response.postMailOk) {
          const success = response.postMailOk;
          console.log(response);
          alert(success);
        } else {
          console.error('error', error);
          alert('이메일 인증 요청에 실패했습니다.');
        }
      } catch (error) {
        alert('인증 요청 실패');
      }
    }
  };

  // 이메일 인증 체크 요청
  const checkEmailInspectionCode = async (inspectionCode: string) => {
    try {
      const res = await axios.post(`${API_DOMAIN}/api/users/register/email/check`, {
        token: inspectionCode,
      });
      console.log(res);
      return res.data;
    } catch (error) {
      console.error('이메일 인증 문자 확인 요청 실패', error);
      throw error;
    }
  };

  const handleInspectionCodeCheck = async () => {
    try {
      const response = await checkEmailInspectionCode(emailInspectionCode);
      if (response.emailVerificationCompleted) {
        alert('이메일 인증이 완료되었습니다.');
      } else {
        alert('인증 실패');
        console.log(response.emailVerificationFailed);
        console.error('뭔데 에러');
      }
    } catch (error) {
      console.log(error);
      console.error('response.error', error);
    }
  };

  return (
    <>
      <Container>
        <LeftArrow onClick={() => navigator('/')} />
        <Title>Trip Talk</Title>
        <SubTitle>다양하고 색다른 여행지가 궁금하시면 가입해보세요!</SubTitle>
        <FormWrap>
          <FormGroup>
            <Label>이름</Label>
            <Input
              type="text"
              name="name"
              value={name.value}
              onChange={e => handleChange(e, validateName)}
              placeholder="이름"
            />
            <p>{name.message}</p>
          </FormGroup>

          <FormGroup>
            <Label>이메일</Label>
            <Input
              type="email"
              name="email"
              value={email.value}
              onChange={e => handleChange(e, validateEmail)}
              placeholder="email"
            />
            {email.valid ? null : <p>{email.message}</p>}
            <button type="button" onClick={handleEmailCertified}>
              버튼
            </button>
          </FormGroup>

          <FormGroup>
            <Label>이메일 인증</Label>
            <Input
              type="text"
              name="emailInspectionCode"
              value={emailInspectionCode}
              onChange={e => setEmailInspectionCode(e.target.value)}
              placeholder="이메일 인증번호"
            />
            <button type="button" onClick={handleInspectionCodeCheck}>
              인증확인
            </button>
          </FormGroup>

          <FormGroup>
            <Label>비밀번호</Label>
            <ToggleShowButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </ToggleShowButton>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password.value}
              onChange={e => handleChange(e, validatePassword)}
              placeholder="비밀번호"
            />
            <p>{password.message}</p>
          </FormGroup>

          <FormGroup>
            <Label>비밀번호 확인</Label>
            <Input
              type="password"
              name="passwordConfirm"
              value={passwordConfirm.value}
              onChange={e => handleChange(e, validatePasswordConfirm)}
              placeholder="비밀번호 확인"
            />
            {passwordConfirm.valid ? null : <p>{passwordConfirm.message}</p>}
          </FormGroup>

          <FormGroup>
            <Label>닉네임</Label>
            <Input
              type="text"
              name="nickname"
              value={nickName.value}
              onChange={e => handleChange(e, validateNicName)}
              placeholder="사용할 닉네임"
            />
            <p>{nickName.message}</p>
          </FormGroup>

          <Button type="submit" className={isFormValid() ? 'active' : ''} onClick={handleSignup}>
            회원가입
          </Button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </FormWrap>
      </Container>
    </>
  );
};

export default SignupForm;

const LeftArrow = styled(FaArrowLeft)`
  position: absolute;
  top: 11%;
  left: 28%;
  font-size: 30px;
  color: ${MAIN_COLOR};
  cursor: pointer;
`;

const Container = styled.div`
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  color: ${MAIN_COLOR};
  font-size: 68px;
  padding-top: 48px;
`;

const SubTitle = styled.p`
  font-size: 1.2rem;
  margin-top: 32px;
`;

const FormWrap = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 56px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-bottom: 2px solid #ccc;

  &:focus {
    outline: none;
    border-bottom: 2px solid ${MAIN_COLOR};
    transition: border-bottom 0.5s ease-out;
  }

  &::placeholder {
    color: ${GRAY_COLOR};
    font-size: 12px;
    font-weight: 300;
  }
`;

const Label = styled.p`
  margin-bottom: 8px;
  font-weight: bold;
  position: absolute;
  top: 15px;
  left: 15px;
  transition: 0.3s;
  color: transparent;
`;

const FormGroup = styled.div`
  position: relative;
  margin: 20px;
  padding: 10px;

  &:focus-within {
    ${Label} {
      color: #242424;
      top: -3px;
      font-size: 14px;
      font-weight: 300;
    }
  }
`;

const ToggleShowButton = styled.button`
  width: 100px;
  float: right;
  font-size: 0.8rem;
  background-color: transparent;
  border: none;
  color: ${MAIN_COLOR};
  position: absolute;
  right: 0;
  cursor: pointer;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 20px;
  background-color: ${MAIN_COLOR};
  color: #fff;
  border: none;
  border-radius: 5px;

  transition: background-color 0.3s ease-in-out;

  &.active {
    background-image: linear-gradient(45deg, ${MAIN_COLOR}, ${YELLOW_COLOR});
    animation: gradientAnimation 5s linear infinite;
    cursor: pointer;
  }

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
`;
