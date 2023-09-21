import styled, { css } from 'styled-components';
import { MAIN_COLOR } from "../../color/color"
import { Link, useNavigate } from 'react-router-dom';
import { SetStateAction, useState } from 'react';

interface UserData {
  id: number;
  email: string;
  password: string;
}

const userData: UserData[] = [
  {id:1 , email: 'user1@naver.com', password: 'Password123'},
  {id:2 , email: 'user2@naver.com', password: 'Password456'},
  {id:3 , email: 'user3@naver.com', password: 'Password789'},
]

const LoginForm = () => {
  
  const naviget = useNavigate()
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e: { target: { value: SetStateAction<string>; }; }) => { // 이메일 값 받아오기
    setUserEmail(e.target.value)
  }

  const handlePw = (e: { target: { value: SetStateAction<string>; }; }) => { // 비밀번호 값 받아오기
    setPassword(e.target.value)
  }


  const handleLogin = () => { //로그인 시도
    const user = userData.find((user) => user.email === userEmail && user.password === password)
    if(user) {
      alert('로그인 되었습니다.')
      setUserEmail('')
      setPassword('')
      naviget('/main')
    } else{
      alert('유효하지 않은 사용자 정보입니다.')
    }
  }

  return (
    <Container>
      <Kakao>카카오톡 로그인</Kakao>
      <OrDivider>
        <span>또는</span>
      </OrDivider>
      <InputEmail type="email" placeholder="이메일" value={userEmail} onChange={handleEmail}/>
      <br />
      <InputPw type="password" placeholder="비밀번호" value={password} onChange={handlePw}/>
      <LoginButton onClick={handleLogin}>로그인</LoginButton>
      <Div>
        <span>아이디 찾기</span>
        <span>비밀번호 찾기</span>
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

const Kakao = styled.div`
  font-size: 24px;
  font-weight: bold;
  background-color: #fee500;
  border-radius: 10px;
  height: 56px;
  line-height: 56px;
  margin-bottom: 32px;
  cursor: pointer;
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 32px;
  &::before,
  &::after {
    content: "";
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
  font-size: 1.2rem;
  &:focus{
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
  height: 80px;
  color: #fff;
  background-color: ${MAIN_COLOR};
  border: none;
  cursor: pointer;
  border-radius: 15px;
  margin-top: 36px;
  font-size: 1.5rem;
`
const Div = styled.div`
  width: 100%;
  margin-top: 8px;
  font-size: 0.9rem;
  span{
    margin-right: 10px;
  }
  a:visited{
  color: inherit
  }
`