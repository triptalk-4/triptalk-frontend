import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const AuthHandler = () => {
  const MAIN_REST_API_KEY = import.meta.env.VITE_REACT_APP_MAIN_API;
  const navigate = useNavigate();
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    console.log(code);

    if (code) {
      sendCodeToServer(code);
    } else {
      alert('다시로그인하세요');
      navigate('/');
    }
  }, []);

  const sendCodeToServer = (ingaCode: string) => {
    axios
      .post(`${MAIN_REST_API_KEY}/api/users/kakao/login`, { ingaCode })
      .then(response => {
        console.log(response);
      })
      .catch(error => console.error(error));
  };
  return <>인증 중....</>;
};

export default AuthHandler;
