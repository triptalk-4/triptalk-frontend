import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { SUPER_LIGHT_ORANGE_COLOR } from '../../../color/color';
import axios from 'axios';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import { API_DOMAIN } from '../../domain/address';

export default function EditIntroduct() {
  const [userAboutMe, setUserAboutMe] = useState('');

  const token = useSelector((state: RootState) => state.token.token); // Redux에서 토큰 가져오기

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${API_DOMAIN}api/users/profile`, {
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
