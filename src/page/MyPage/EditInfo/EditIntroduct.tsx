import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { SUPER_LIGHT_ORANGE_COLOR } from '../../../color/color';
import axios from 'axios';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';

interface EditIntroProps {
  onUpdateIntro: (text: string) => void;
}

export default function EditIntroduct({ onUpdateIntro }: EditIntroProps) {
  // const [userIntro, setUserIntro] = useState('사용자의 소개 내용을 입력하세요');
  const [userIntro, setUserIntro] = useState('');

  const token = useSelector((state: RootState) => state.token.token); // Redux에서 토큰 가져오기

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://52.79.200.55:8080/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`, //필수
          },
        });

        if (response.data) {
          const { aboutMe } = response.data;

          setUserIntro(aboutMe);
        } else {
          console.log(response);
          alert('사용자 정보가 없습니다 로그인확인해주세요');
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 오류 확인바람:', error);
      }
    };

    fetchUserInfo(); // 비동기 함수 호출
  }, [token, userIntro]);

  const handleIntroChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setUserIntro(newText);
    onUpdateIntro(newText); // 텍스트 변경 시 onUpdateIntro 호출
  };

  return (
    <IntroText
      value={userIntro}
      onChange={handleIntroChange}
      rows={4}
      cols={50}
      maxLength={200}
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
