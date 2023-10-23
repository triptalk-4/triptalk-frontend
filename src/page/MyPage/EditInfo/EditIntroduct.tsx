import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { SUPER_LIGHT_ORANGE_COLOR } from '../../../color/color';
import axios from 'axios';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';

interface EditIntroductProps {
  onAboutMeChange: (newText: string) => void;
}

export default function EditIntroduct({ onAboutMeChange }: EditIntroductProps) {
  const MAIN_REST_API_KEY = import.meta.env.VITE_REACT_APP_MAIN_API;
  const [userAboutMe, setUserAboutMe] = useState('');

  const token = useSelector((state: RootState) => state.token.token);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${MAIN_REST_API_KEY}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          const { aboutMe } = response.data;
          setUserAboutMe(aboutMe);
        } else {
          console.log(response);
          alert('사용자 정보가 없습니다 소개글');
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 오류 확인바람(소개글):', error);
      }
    };

    fetchUserInfo();
  }, [token, userAboutMe]);

  const handleIntroChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setUserAboutMe(newText);
    onAboutMeChange(newText);
  };

  return (
    <IntroText
      // value={userIntro}
      onChange={handleIntroChange}
      rows={4}
      cols={50}
      maxLength={200}
      defaultValue={userAboutMe}
      placeholder="소개를 입력해주세요"
    />
  );
}

const IntroText = styled.textarea`
  padding: 7px 15px;
  width: 365px;
  height: 50px;
  resize: none;
  outline: none;
  border: 2px solid ${SUPER_LIGHT_ORANGE_COLOR};
  border-radius: 15px;
`;
