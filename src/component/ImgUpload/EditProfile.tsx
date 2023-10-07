import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { LuSettings } from 'react-icons/lu';
import styled from 'styled-components';
import { LIGHT_GRAY_COLOR } from '../../color/color';

interface EditProfileProps {
  onImageChange: (imageUrl: string) => void;
}

export default function EditProfile({ onImageChange }: EditProfileProps) {
  const [img, setImg] = useState(''); // msw

  useEffect(() => {
    const storedUserData = localStorage.getItem('userInfo');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      console.log(userData.imgUrl);
      setImg(userData.imageUrl);
    }
  }, []);

  const imgRef = useRef<HTMLInputElement | null>(null); // 초기에는 아무것도 가르키고 있지 않음

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    // 선택한 이미지 보기
    const file = e.target.files?.[0]; // 선택한 파일
    if (file) {
      onImageChange(URL.createObjectURL(file)); // 선택된 이미지를 EditMyInfo로 전달
    }
  };

  const handleInputImageClick = () => {
    // 사용자가 선택한 파일 업로드가 나타남
    imgRef.current?.click();
  };

  return (
    <ProfileImgContainer>
      <ProfileImgLabel htmlFor="profileImg">
        <ProfileImgInput type="file" accept="image/*" id="profileImg" onChange={handleImageUpload} ref={imgRef} />
        <EditProfileBtn type="button" onClick={handleInputImageClick}>
          <LuSettings />
        </EditProfileBtn>
      </ProfileImgLabel>
      <PreviewImage src={img} alt="프로필 이미지" />
    </ProfileImgContainer>
  );
}

const ProfileImgContainer = styled.form`
  position: relative;
`;

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
  top: 80%;
  left: 90%;
  transform: translate(-50%, -50%);
  border: 1px solid ${LIGHT_GRAY_COLOR};
  border-radius: 100%;
  background-color: #fff;
  font-size: 50px;
  z-index: 1;
  cursor: pointer;
`;

const PreviewImage = styled.img`
  width: 300px;
  height: 300px;
  border: 1px solid ${LIGHT_GRAY_COLOR};
  border-radius: 100%;
`;
