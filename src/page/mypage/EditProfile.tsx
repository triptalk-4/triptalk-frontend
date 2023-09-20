import { useState, useRef, ChangeEvent } from 'react';

import { LuSettings } from 'react-icons/lu';
import styled from 'styled-components';
import { LIGHT_GRAY_COLOR } from '../../color/color';

export default function EditProfile() {
  const defaultImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  const [imgFile, setImgFile] = useState<string>(defaultImg);

  const imgRef = useRef<HTMLInputElement | null>(null); // 초기에는 아무것도 가르키고 있지 않음

  const OnClickImgUpload = (e: ChangeEvent<HTMLInputElement>) => {
    // 선택한 이미지 보기
    const file = e.target.files?.[0]; // 선택한 파일
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setImgFile(e.target?.result as string); // 이미지 파일을 상태 변수에 저장
      };
      reader.readAsDataURL(file); // 파일을 데이터 URL로 읽어옴
    }
  };

  const OnClickInputImg = () => {
    // 사용자가 선택한 파일 업로드가 나타남
    imgRef.current?.click();
  };

  return (
    <ProfileImgContainer>
      <ProfileImgLabel htmlFor="profileImg">
        <ProfileImgInput type="file" accept="image/*" id="profileImg" onChange={OnClickImgUpload} ref={imgRef} />
        <EditProfileBtn type="button" onClick={OnClickInputImg}>
          <LuSettings />
        </EditProfileBtn>
      </ProfileImgLabel>
      <PreviewImage src={imgFile} alt="프로필 이미지" />
    </ProfileImgContainer>
  );
}

const ProfileImgContainer = styled.form``;

const ProfileImgLabel = styled.label`
  font-size: 13px;
  display: inline-block;
`;

const ProfileImgInput = styled.input`
  display: none;
`;

const EditProfileBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 50px;
  height: 50px;
  top: 60%;
  left: 40%;
  transform: translate(-50%, -50%);
  border: 1px solid ${LIGHT_GRAY_COLOR};
  border-radius: 100%;
  background-color: #fff;
  font-size: 50px;
  z-index: 1;
  cursor: pointer;
`;

const PreviewImage = styled.img`
  position: relative;
  width: 300px;
  height: 300px;
  border: 1px solid ${LIGHT_GRAY_COLOR};
  border-radius: 100%;
`;
