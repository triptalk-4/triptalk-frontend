import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { LuSettings } from 'react-icons/lu';
import styled from 'styled-components';
import { LIGHT_GRAY_COLOR } from '../../color/color';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { API_DOMAIN } from '../../page/domain/address ';

export default function EditProfile() {
  const [userImg, setUserImg] = useState(''); // msw
  const token = useSelector((state: RootState) => state.token.token);

  const imgRef = useRef<HTMLInputElement | null>(null); // 초기에는 아무것도 가르키고 있지 않음

  // useEffect(() => {
  //   const storedUserData = localStorage.getItem('userInfo');
  //   if (storedUserData) {
  //     const userData = JSON.parse(storedUserData);
  //     console.log(userData.imgUrl);
  //     setImg(userData.imageUrl);
  //   }
  // }, []);

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
          const { profile } = response.data;
          setUserImg(profile);
        } else {
          console.log(response);
          alert('사용자 정보가 없습니다 사진');
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 오류 확인바람(프로필):', error);
      }
    };

    fetchUserInfo();
  }, [token, userImg]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    // 선택한 이미지 보기
    const files = e.target.files?.[0];
    if (files) {
      const imageUrl = URL.createObjectURL(files); // 이미지 파일을 URL로 변환
      setUserImg(imageUrl);
    }
  };

  const handleInputImageClick = () => {
    // 사용자가 선택한 파일 업로드가 나타남
    imgRef.current?.click();
  };

  return (
    <ProfileImgContainer encType="multipart/form-data">
      <ProfileImgLabel htmlFor="profileImg">
        <ProfileImgInput type="file" accept="image/*" id="profileImg" onChange={handleImageUpload} ref={imgRef} />
        <EditProfileBtn type="button" onClick={handleInputImageClick}>
          <LuSettings />
        </EditProfileBtn>
      </ProfileImgLabel>
      <PreviewImage src={userImg} alt="프로필 이미지" />
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
