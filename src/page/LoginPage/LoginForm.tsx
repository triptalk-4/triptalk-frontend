import styled, { css } from 'styled-components';
import { MAIN_COLOR } from "../../color/color"

const LoginForm = () => {
  return (
    <Container>
      <Kakao>카카오톡 로그인</Kakao>
      <OrDivider>
        <span>또는</span>
      </OrDivider>
      <InputEmail type="email" placeholder="이메일" />
      <br />
      <InputPw type="password" placeholder="비밀번호" />
      <LoginButton>로그인</LoginButton>
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
  background-color: ${MAIN_COLOR};
  border: none;
  border-radius: 15px;
  margin-top: 36px;
  font-size: 1.5rem;
  color: #fff;
`
