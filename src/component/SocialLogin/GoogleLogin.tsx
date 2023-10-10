import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router';

const GoogleLogin = () => {
  const navigate = useNavigate();

  const googleSocialLogin = useGoogleLogin({
    scope: 'email profile',
    onSuccess: async ({ code }: any) => {
      axios.post('http://52.79.200.55:8080/api/auth/google', { code }).then(({ data }) => {
        console.log(data);

        navigate('/main');
      });
    },
    onError: error => {
      console.error(error);
    },
    flow: 'auth-code',
  });

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
