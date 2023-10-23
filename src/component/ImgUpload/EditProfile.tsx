import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { LuSettings } from 'react-icons/lu';
import styled from 'styled-components';
import { LIGHT_GRAY_COLOR } from '../../color/color';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function EditProfile() {
  const MAIN_REST_API_KEY = import.meta.env.VITE_REACT_APP_MAIN_API;
  const [userImg, setUserImg] = useState(''); // msw
  const token = useSelector((state: RootState) => state.token.token);

  const imgRef = useRef<HTMLInputElement | null>(null); // 초기에는 아무것도 가르키고 있지 않음
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // useEffect(() => {
  //   const storedUserData = localStorage.getItem('userInfo');
  //   if (storedUserData) {
  //     const userData = JSON.parse(storedUserData);
  //     console.log(userData.imgUrl);
  //     setImg(userData.imageUrl);
  //   }
  // }, []);

  useEffect(() => {
    const Access_token = localStorage.getItem('token');
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${MAIN_REST_API_KEY}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${Access_token}`,
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
  }, []);

  const handleUploadImage = async () => {
    if (!selectedFile) {
      return;
    }

    const formFilesData = new FormData();
    formFilesData.append('files', selectedFile);

    try {
      // 서버로 이미지 업로드 요청
      const response = await axios.put(`${MAIN_REST_API_KEY}/api/users/update/profile`, formFilesData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('이미지 업로드 성공:', response.data);
        // 서버에서 이미지 업로드 성공 후 필요한 작업을 수행
      } else {
        console.error('서버 응답 오류:', response);
      }
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
    }

    handleUploadImage(); // 자동 업로드
  };
  console.log('Selected File:', selectedFile);
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      setSelectedFile(file[0]);
      const imageUrl = URL.createObjectURL(file[0]);
      setUserImg(imageUrl);

      console.log('userImg :', userImg);
    }
  };

  const handleInputImageClick = () => {
    // 사용자가 선택한 파일 업로드가 나타남
    imgRef.current?.click();
  };

  return (
    <ProfileImgContainer method="post" encType="multipart/form-data">
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
