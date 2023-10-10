import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { SUPER_LIGHT_ORANGE_COLOR } from '../../../color/color';

interface EditIntroProps {
  onUpdateIntro: (text: string) => void;
}

export default function EditIntroduct({ onUpdateIntro }: EditIntroProps) {
  const [userIntro, setUserIntro] = useState('사용자의 소개 내용을 입력하세요');

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
