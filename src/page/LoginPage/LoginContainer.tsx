import styled from 'styled-components';
import { MAIN_COLOR } from '../../color/color';
import LoginForm from './LoginForm';

function Login() {
  return (
    <CenteredContainer>
<<<<<<< HEAD
      <Container>
        <TitleWrap>
          <Title>Trip Talk</Title>
          <SubTitle>
            국내의 여행자들을 위한 <br />
            여행리뷰 커뮤니티
          </SubTitle>
        </TitleWrap>
        <LoginWrap>
          <LoginForm />
        </LoginWrap>
      </Container>
=======
        <Container>
          <TitleWrap>
            <Title>
              Trip Talk  
            </Title>
            <SubTitle>국내의 여행자들을 위한 <br />여행리뷰 커뮤니티</SubTitle>
          </TitleWrap>
          <LoginWrap>
            <LoginForm /> {/* 로그인로직 컴포넌트 */}
          </LoginWrap>
        </Container>
>>>>>>> 8ab8a9dc7eb28adb646b336a02b40dc1f3bea907
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
  width: 100%;
  height: 559px;
  display: flex;
`;

const TitleWrap = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Title = styled.div`
  color: ${MAIN_COLOR};
  font-size: 10rem;
  font-weight: bold;
  word-spacing: -50px;
  margin-top: 100px;
  @media (width: 1113px) {
    font-size: 8.125rem;
  }
`;
const SubTitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 120px;
<<<<<<< HEAD
`;
=======
  text-align: center;
`
>>>>>>> 8ab8a9dc7eb28adb646b336a02b40dc1f3bea907

const LoginWrap = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
<<<<<<< HEAD
`;
=======
  text-align: center;
`

>>>>>>> 8ab8a9dc7eb28adb646b336a02b40dc1f3bea907
