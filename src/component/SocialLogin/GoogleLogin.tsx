import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const GoogleLogin = () => {
  const MAIN_REST_API_KEY = import.meta.env.VITE_REACT_APP_MAIN_API;
  const navigate = useNavigate();
  const code: string | null = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    const google = async () => {
      if (code) {
        try {
          const response = await axios.get(`${MAIN_REST_API_KEY}/api/auth/google?code=${code}`);
          console.log(response);
          const token = response.data.token;
          localStorage.setItem('token', token);
          navigate('/main');
        } catch (error) {
          console.log();
          console.error('Google OAuth Error:', error);
        }
      }
    };
    google();
  }, [code, navigate]);
  return (
    <>
      <h1>로딩중..</h1>
    </>
  );
};

export default GoogleLogin;
