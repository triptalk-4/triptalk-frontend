import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router';

interface GoogleLoginResponse {
  code: string;
}

const GoogleLogin = () => {
  const navigate = useNavigate();

  const onSuccess = async ({ code }: GoogleLoginResponse) => {
    try {
      const { accessToken } = await exchangeCodeForAccessToken(code);
      console.log(accessToken);
      navigate('/main');
    } catch (error) {
      console.error(error);
    }
  };

  const googleSocialLogin = useGoogleLogin({
    scope: 'email profile',
    onSuccess,
    onError: error => {
      console.error('error다', error);
    },
    flow: 'auth-code',
  });

  const exchangeCodeForAccessToken = async (code: any) => {
    try {
      const clientID = '57409677042-8qrpnbbfcq8d6jeq9kmvh8357vi4p4up.apps.googleusercontent.com';
      const clientSecret = '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';

      const response = await axios.post('http://52.79.200.55:8080/api/auth/google', {
        code,
        client_id: clientID,
        client_secret: clientSecret,
        redirect_uri: 'http://ec2-52-79-200-55.ap-northeast-2.compute.amazonaws.com:8080/api/auth/google',
        authorization_grant_ype: 'authorization_code',
      });
      console.log(response);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('실패');
    }
  };

  return (
    <Google onClick={googleSocialLogin}>
      <FcGoogle />
    </Google>
  );
};

export default GoogleLogin;

const Google = styled.button`
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
