import styled from 'styled-components';
import LoginForm from './LoginForm';

function Login() {
  return (
    <CenteredContainer>
      <Container>
        <TitleWrap>
          <TitleImg src="img/logo.png" />
          <SubTitle>
            국내의 여행자들을 위한 <br />
            여행리뷰 커뮤니티
          </SubTitle>
        </TitleWrap>
        <LoginWrap>
          <LoginForm /> {/* 로그인로직 컴포넌트 */}
        </LoginWrap>
      </Container>
    </CenteredContainer>
  );
}

export default Login;

const CenteredContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 90%;
  height: 559px;
  display: flex;
  user-select: none;
`;

const TitleWrap = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const TitleImg = styled.img`
  width: 520px;
  margin-top: 100px;
  /* @media (width: 1113px) {
    font-size: 8.125rem;
  } */
`;
const SubTitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 120px;
  text-align: center;
`;

const LoginWrap = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
