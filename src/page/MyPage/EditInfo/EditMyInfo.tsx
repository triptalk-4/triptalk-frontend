import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { GRAY_COLOR, LIGHT_GRAY_COLOR, LIGHT_ORANGE_COLOR, MAIN_COLOR } from '../../../color/color';
import EditForm from './EditForm';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import EditIntroduct from './EditIntroduct';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setEditedAboutMe, setEditedNewPassword, setEditedNickname } from '../../../store/editMyInfoSlice';
import { RootState } from '../../../store/store';
import { LuSettings } from 'react-icons/lu';

export default function EditMyInfo() {
  const navigate = useNavigate();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false); // 버튼 활성화 상태 추가
  const [userImg, setUserImg] = useState('');
  const imgRef = useRef<HTMLInputElement | null>(null); // 초기에는 아무것도 가르키고 있지 않음
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const dispatch = useDispatch();

  const editedNickname = useSelector((state: RootState) => state.editMyInfo.editedNickname);
  const editedNewPassword = useSelector((state: RootState) => state.editMyInfo.editedNewPassword);
  const editedAboutMe = useSelector((state: RootState) => state.editMyInfo.editedAboutMe);
  const currentEmail = useSelector((state: RootState) => state.editMyInfo.currentEmail);

  const token = useSelector((state: RootState) => state.token.token);

  useEffect(() => {
    const Access_token = localStorage.getItem('token');
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/address/api/users/profile', {
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

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      const changeImg = file[0];
      setSelectedFile(changeImg);
      const imageUrl = URL.createObjectURL(file[0]);
      setUserImg(imageUrl);
      console.log('setSelectedFile:', changeImg);
      console.log('userImg:', userImg);
    }
  };

  const handleInputImageClick = () => {
    // 사용자가 선택한 파일 업로드가 나타남
    imgRef.current?.click();
  };

  useEffect(() => {
    // 모든 정보가 입력되었을 때 버튼을 활성화
    if (editedNickname && editedNewPassword && editedAboutMe) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [editedNickname, editedNewPassword, editedAboutMe]);

  const handleNicknameChange = (newNickname: string) => {
    dispatch(setEditedNickname(newNickname));
  };

  const handleNewPasswordChange = (newPassword: string) => {
    dispatch(setEditedNewPassword(newPassword));
  };

  const handleAboutMeChange = (newAboutMe: string) => {
    dispatch(setEditedAboutMe(newAboutMe));
  };

  const handleEditButtonClick = async () => {
    // localStorage.removeItem('userInfo');
    //  localStorage.setItem('userInfo', JSON.stringify(updatedUserData));

    if (selectedFile) {
      const formData = new FormData();
      formData.append('files', selectedFile);
      formData.append(
        'request',
        JSON.stringify({
          email: currentEmail,
          newPassword: editedNewPassword,
          newNickname: editedNickname,
          newAboutMe: editedAboutMe,
        })
      );

      try {
        console.log(token);
        console.log('currentEmail', currentEmail);
        // 서버에 PUT 요청 보내기
        const response = await axios.put('/address/api/users/update/profile', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          console.log('수정 성공:', response.data);

          // 성공한 경우의 처리 로직 추가
          navigate('/myinfo');
        } else {
          console.error('서버 응답 오류:', response);
        }
      } catch (error) {
        console.error('수정 오류:', error);
      }
    }
  };

  const handleBackButtonClick = () => {
    navigate('/myinfo'); // 이전 페이지로 이동
  };

  return (
    <InfoContainer>
      <InfoTitle>개인정보수정</InfoTitle>
      <InfoEditContainer>
        <ImgEditContainer>
          <ProfileImgContainer method="post" encType="multipart/form-data">
            <ProfileImgLabel htmlFor="profileImg">
              <ProfileImgInput type="file" accept="image/*" id="profileImg" onChange={handleImageUpload} ref={imgRef} />
              <EditProfileBtn type="button" onClick={handleInputImageClick}>
                <LuSettings />
              </EditProfileBtn>
            </ProfileImgLabel>
            <PreviewImage src={userImg} alt="프로필 이미지" />
          </ProfileImgContainer>
          <ExitBtn>탈퇴하기</ExitBtn>
        </ImgEditContainer>

        <IntroductionContainer>
          <EditIntroduct onAboutMeChange={handleAboutMeChange} />
        </IntroductionContainer>

        <MyInfoEditForm>
          <EditForm onNicknameChange={handleNicknameChange} onNewPasswordChange={handleNewPasswordChange} />
        </MyInfoEditForm>

        <MyInfoBtnSetting>
          <EditBtn type="submit" onClick={handleEditButtonClick} disabled={!isButtonEnabled}>
            수정하기
          </EditBtn>
          <CancelBtn onClick={handleBackButtonClick}>취소</CancelBtn>
        </MyInfoBtnSetting>
      </InfoEditContainer>
    </InfoContainer>
  );
}

const InfoContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

const InfoTitle = styled.p`
  font-size: 50px;
  font-weight: 700;
`;

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

const InfoEditContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 495px;
  grid-template-rows: 1fr 70px 55px;
  column-gap: 100px;
  row-gap: 30px;
  grid-template-areas:
    'ImgEditContainer MyInfoEditForm'
    'IntroductionContainer MyInfoEditForm'
    'MyInfoBtnSetting MyInfoBtnSetting';
  padding-top: 50px;
`;

const ImgEditContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  grid-area: ImgEditContainer;
`;

const IntroductionContainer = styled.div`
  grid-area: IntroductionContainer;
`;

const ExitBtn = styled.button`
  font-size: 15px;
  border: none;
  background-color: transparent;
  text-decoration: underline;
  margin-top: 30px;
  cursor: pointer;
`;

const MyInfoEditForm = styled.form`
  display: flex;
  flex-direction: column;
  grid-area: MyInfoEditForm;
  justify-content: center;
`;

const MyInfoBtnSetting = styled.div`
  display: flex;
  justify-content: center;
  grid-area: MyInfoBtnSetting;
`;

const SettingBtnStyle = css`
  width: 120px;
  height: 55px;
  border: none;
  border-radius: 15px;
  font-size: 15px;
`;

const EditBtn = styled.button`
  ${SettingBtnStyle}
  background-color: ${MAIN_COLOR};
  color: #fff;
  margin-right: 25px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  &:disabled {
    background-color: ${LIGHT_ORANGE_COLOR};
  }
`;

const CancelBtn = styled.button`
  ${SettingBtnStyle}
  background-color: ${LIGHT_GRAY_COLOR};
  color: ${GRAY_COLOR};
  cursor: pointer;
`;
