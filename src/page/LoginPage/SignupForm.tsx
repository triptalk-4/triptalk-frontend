import styled from 'styled-components';
import { MAIN_COLOR, YELLOW_COLOR } from '../../color/color';
import { ChangeEvent, useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';


interface InputState {
  value: string;
  valid: boolean;
  message: string;
}

const SignupForm = () => {

  const [email, setEmail] = useState<InputState>({ value: '', valid: false, message: '' })
  const [password, setPassword] = useState<InputState>({ value: '', valid: false, message: '' })
  const [passwordConfirm, setPasswordConfirm] = useState<InputState>({ value: '', valid: false, message: '' })
  const [name, setName] = useState<InputState>({ value: '', valid: false, message: '' })

  const [showPassword, setShowPassword] = useState(false); 

  const handleChange = (e: ChangeEvent<HTMLInputElement>, validator: (value: string) => {valid: boolean; message: string}) => {
    const {name, value} = e.target
    const {valid, message} = validator(value)
    switch(name) {
      case 'email':
        setEmail({ value, valid, message });
        break;
      case 'password':
        setPassword({ value, valid, message });
        break;
      case 'passwordConfirm':
        setPasswordConfirm({ value, valid, message });
        break;
      case 'name':
        setName({ value, valid, message });
        break;
      default:
        break;
    }
  }

  const validateEmail = (value: string) => {
    const emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
    if (!emailRegExp.test(value)) {
      return { valid: false, message: '이메일의 형식이 올바르지 않습니다!' };
    } else {
      return { valid: true, message: '사용 가능한 이메일 입니다.' };
    }
  };

  const validatePassword = (value: string) => {
    const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(value)) {
      return { valid: false, message: '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!' };
    } else {
      return { valid: true, message: '안전한 비밀번호 입니다.' };
    }
  };

  const validatePasswordConfirm = (value: string) => {
    if (value !== password.value) {
      return { valid: false, message: '비밀번호가 똑같지 않아요!' };
    } else {
      return { valid: true, message: '똑같은 비밀번호를 입력했습니다.' };
    }
  };

  const validateName = (value: string) => {
    if (value.length < 2 || value.length > 5) {
      return { valid: false, message: '닉네임은 2글자 이상 5글자 이하로 입력해주세요!' };
    } else {
      return { valid: true, message: '사용 가능한 닉네임 입니다.' };
    }
  };

  const isFormValid = () => {
    return email.valid && password.valid && passwordConfirm.valid && name.valid
  }

  return (
    <>
      <Container>
        <Title>Trip Talk</Title>
        <SubTitle>다양하고 색다른 여행지가 궁금하시면 가입해보세요!</SubTitle>
        <FormWrap>

          <FormGroup>
            <Label>이메일</Label>
            <Input type="email" name='email' value={email.value} onChange={(e) => handleChange(e, validateEmail)}/>
            {email.valid ? null : <p>{email.message}</p>}
          </FormGroup>

          <FormGroup>
            <Label>비밀번호</Label>
            <Input type="password" name='password' value={password.value} onChange={(e) => handleChange(e, validatePassword)}/>
            <p>{password.message}</p>
          </FormGroup>

          <FormGroup>
            <Label>비밀번호 확인</Label>
            <ToggleShowButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash/> : <FaEye/>}
            </ToggleShowButton>
            <Input type={showPassword? 'text' : 'password'} name='passwordConfirm' value={passwordConfirm.value} onChange={(e) => handleChange(e, validatePasswordConfirm)}/>
            {passwordConfirm.valid ? null : <p>{passwordConfirm.message}</p>}
          </FormGroup>

          <FormGroup>
            <Label>닉네임</Label>
            <Input type="text" name='name' value={name.value} onChange={(e) => handleChange(e, validateName)}/>
            <p>{name.message}</p>
          </FormGroup>
          <Button type='submit' className={isFormValid() ? 'active' : ''}>회원가입</Button>
        </FormWrap>
      </Container>
    </>
  );
};

export default SignupForm;

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
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  float: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  border-radius: 5px;
  &:focus{
    outline: none;
  }
`;

const ToggleShowButton = styled.button`
  width: 100px;
  float: right;
  font-size: 0.8rem;
  background-color: transparent;
  border: none;
  color: ${MAIN_COLOR};
  text-decoration: underline;
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

  &.active{
    background-image: linear-gradient(45deg, ${MAIN_COLOR}, ${YELLOW_COLOR});
    animation: gradientAnimation 5s linear infinite;
    cursor: pointer;
  }

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    100%{
      background-position: 100% 50%;
    }
  }
`;
