import axios from 'axios';
import KakaoLogin from '../../component/SocialLogin/KakaoLogin';
import GoogleLogin from '../../component/SocialLogin/GoogleLogin';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/tokenSlice';

import styled, { css } from 'styled-components';
import { GRAY_COLOR, MAIN_COLOR } from '../../color/color';
import { Link, useNavigate } from 'react-router-dom';
import { SetStateAction, useEffect, useState } from 'react';

// interface UserData {
//   id: number;
//   email: string;
//   password: string;
// }

const LoginForm = () => {
  const dispatch = useDispatch();

  const naviget = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e: { target: { value: SetStateAction<string> } }) => {
    // 이메일 값 받아오기
    setUserEmail(e.target.value);
  };

  const handlePw = (e: { target: { value: SetStateAction<string> } }) => {
    // 비밀번호 값 받아오기
    setPassword(e.target.value);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log(storedToken);

    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, []);

  const handleLogin = async () => {
    //로그인 시도
    // try {
    //   const response = await fetch('/api/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email: userEmail, password: password }),
    //   });

    //   if (response.status === 200) {
    //     const data = await response.json();
    //     alert('로그인 되었습니다.');
    //     setUserEmail('');
    //     setPassword('');
    //     naviget('/main');
    //     console.log(data);
    //   } else {
    //     alert('유효하지 않은 사용자 정보입니다.');
    //   }
    // } catch (error) {
    //   console.error('로그인 오류 : ', error);
    // }
    try {
      const response = await axios.post('/api/users/login', {
        email: userEmail,
        password: password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        // dispatch(setToken(response.data.token));
        // 테스트 코드
        localStorage.setItem('userEmail', userEmail);
        localStorage.setItem('password', password);
        console.log(response.data.token);

        const message = '로그인 되었습니다.';
        alert(`${message}`);
        setUserEmail('');
        setPassword('');
        naviget('/main');
      } else {
        alert('유효하지 않은 사용자 입니다.');
      }
    } catch (error: any) {
      console.log(location.origin);
      alert(`${error.response.data}`);
    }
  };

  return (
    <Container>
      <SocialLogin>
        <KakaoLogin />
        <GoogleLogin />
      </SocialLogin>
      <OrDivider>
        <span>또는</span>
      </OrDivider>
      <InputEmail type="email" placeholder="이메일" value={userEmail} onChange={handleEmail} />
      <br />
      <InputPw type="password" placeholder="비밀번호" value={password} onChange={handlePw} />
      <LoginButton onClick={handleLogin}>로그인</LoginButton>
      <Div>
        <span>아이디 찾기</span>
        <LineSpan>비밀번호 찾기</LineSpan>
        <Link to="/signup">회원가입</Link>
      </Div>
    </Container>
  );
};

export default LoginForm;

const Container = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SocialLogin = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 32px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-top: 1px solid #000;
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }
`;

const commonInputStyle = css`
  width: 100%;
  background-color: #e8e8e8;
  height: 70px;
  border-radius: 15px;
  padding-left: 21px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border: 1px solid ${MAIN_COLOR};
  }
`;

const InputEmail = styled.input`
  ${commonInputStyle}
`;

const InputPw = styled.input`
  ${commonInputStyle}
`;

const LoginButton = styled.button`
  width: 100%;
  height: 60px;
  color: #fff;
  background-color: ${MAIN_COLOR};
  border: none;
  cursor: pointer;
  border-radius: 15px;
  margin-top: 36px;
  font-size: 1.5rem;
`;

const Div = styled.div`
  width: 100%;
  margin-top: 8px;
  font-size: 0.9rem;

  span {
    margin-right: 10px;
  }

  a:visited {
    color: inherit;
  }
`;

const LineSpan = styled.span`
  &::before,
  &::after {
    content: '';
    display: inline-block;
    width: 1px;
    height: 12px;
    background-color: ${GRAY_COLOR};
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }
`;
