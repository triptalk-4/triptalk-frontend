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
  @media (max-width: 950px) {
    width: 80%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  width: 90%;
  height: 559px;
  display: flex;
  user-select: none;
  @media (max-width: 950px) {
    width: auto;
    height: auto;
    display: block;
  }
`;

const TitleWrap = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1250px) {
    justify-content: space-around;
  }
  @media (max-width: 950px) {
    width: auto;
    height: auto;
  }
`;
const TitleImg = styled.img`
  width: 520px;
  margin-top: 100px;
  @media (max-width: 1250px) {
    width: 450px;
  }
  @media (max-width: 1100px) {
    width: 420px;
  }
  @media (max-width: 730px) {
    width: 375px;
  }
  @media (max-width: 430px) {
    width: 200px;
  }
`;
const SubTitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 120px;
  text-align: center;
  @media (max-width: 1250px) {
    font-size: 1rem;
  }
  @media (max-width: 950px) {
    margin-top: 24px;
    margin-bottom: 24px;
  }
  @media (max-width: 730px) {
    font-size: 0.8rem;
    font-weight: bold;
  }
  @media (max-width: 430px) {
    font-size: 0.6rem;
  }
`;

const LoginWrap = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  @media (max-width: 950px) {
    width: 80%;
    margin: 0 auto;
  }
  @media (max-width: 730px) {
    width: auto;
  }
`;
