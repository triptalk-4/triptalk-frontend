import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';

const clientId = '57409677042-8qrpnbbfcq8d6jeq9kmvh8357vi4p4up.apps.googleusercontent.com';

const redirectUri = 'http://localhost:3000/googleLogin';

const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=email profile%20profile%20email&redirect_uri=${redirectUri}`;

const Google = () => {
  const handleGoogleLogin = () => {
    window.location.href = googleAuthUrl;
  };
  return (
    <GoogleButton onClick={handleGoogleLogin}>
      <FcGoogle />
    </GoogleButton>
    // <>
    //   <div>로딩중..</div>
    // </>
  );
};

export default Google;

const GoogleButton = styled.button`
  width: 50%;
  font-size: 22px;
  font-weight: 500;
  background-color: #4285f4;
  border-radius: 10px;
  height: 60px;
  line-height: 60px;
  margin-bottom: 32px;
  cursor: pointer;
  border: none;
  &:focus {
    outline: none;
  }
`;
