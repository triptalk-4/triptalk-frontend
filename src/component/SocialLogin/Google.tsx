import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

const Google = () => {
  const handlegoogleLogin = async () => {
    try {
      const response = await axios.post(`/address/api/auth/google`);
      window.location.href = response.data;
    } catch (error) {
      console.error('Google OAuth Error:', error);
    }
  };
  return (
    <GoogleButton onClick={handlegoogleLogin}>
      <FcGoogle />
    </GoogleButton>
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
