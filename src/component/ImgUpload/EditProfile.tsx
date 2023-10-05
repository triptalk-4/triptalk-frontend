import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { LuSettings } from 'react-icons/lu';
import styled from 'styled-components';
import { LIGHT_GRAY_COLOR } from '../../color/color';

interface EditProfileProps {
  updateImgFile: (file: File) => void;
}

export default function EditProfile({ updateImgFile }: EditProfileProps) {
  const [userEditData, setUserEditData] = useState({
    imgUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  }); // msw

  useEffect(() => {
    fetch('/api/userinfoeidt')
      .then(res => res.json())
      .then(data => setUserEditData(data))
      .catch(error => console.error('가짜 API 요청 실패:', error));
  }, []);

  const [imgFile, setImgFile] = useState<string>(userEditData.imgUrl);

  const imgRef = useRef<HTMLInputElement | null>(null); // 초기에는 아무것도 가르키고 있지 않음

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    // 선택한 이미지 보기
    const file = e.target.files?.[0]; // 선택한 파일
    if (file) {
      // 이미지 파일을 상태 변수에 저장
      setImgFile(URL.createObjectURL(file));
      // 이미지 파일을 부모 컴포넌트로 전달
      updateImgFile(file);
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
      <PreviewImage src={imgFile} alt="프로필 이미지" />
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
