import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    try {
      const response = await axios.post('http://52.79.200.55:8080/api/auth/google');

      if (response.status === 200) {
        console.log(response);
        const { token } = response.data; // 토큰값 추출
        console.log(token);
        window.location.href =
          'https://accounts.google.com/o/oauth2/v2/auth?client_id=57409677042-8qrpnbbfcq8d6jeq9kmvh8357vi4p4up.apps.googleusercontent.com&redirect_uri=http://ec2-52-79-200-55.a';
      } else {
        console.log(response);
        throw new Error('구글 로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('구글 에러', error);
    }
  };
  return (
    <Google onClick={handleGoogleLogin}>
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
