import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { GRAY_COLOR, LIGHT_GRAY_COLOR, LIGHT_ORANGE_COLOR, MAIN_COLOR } from '../../../color/color';
import EditForm from './EditForm';
import EditProfile from '../../../component/ImgUpload/EditProfile';
import { useEffect, useState } from 'react';
import EditIntroduct from './EditIntroduct';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentEmail,
  setEditedAboutMe,
  setEditedNewPassword,
  setEditedNickname,
} from '../../../store/editMyInfoSlice';
import { RootState } from '../../../store/store';

export default function EditMyInfo() {
  const navigate = useNavigate();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false); // 버튼 활성화 상태 추가

  const dispatch = useDispatch();

  const editedNickname = useSelector((state: RootState) => state.editMyInfo.editedNickname);
  const editedNewPassword = useSelector((state: RootState) => state.editMyInfo.editedNickname);
  const editedAboutMe = useSelector((state: RootState) => state.editMyInfo.editedNickname);
  const currentEmail = useSelector((state: RootState) => state.editMyInfo.editedNickname);

  useEffect(() => {
    // 모든 정보가 입력되었을 때 버튼을 활성화
    if (editedNickname && editedNewPassword && editedAboutMe) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [editedNickname, editedNewPassword, editedAboutMe]);

  const currentUserEmail = (userEmail: string) => {
    dispatch(setCurrentEmail(userEmail));
  };

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

    try {
      // 서버에 PUT 요청 보내기
      const response = await axios.put('/api/users/update/profile', {
        email: currentEmail,
        newNickname: editedNickname,
        newPassword: editedNewPassword,
        newAboutMe: editedAboutMe,
        newPasswordCheck: editedNewPassword,
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
  };

  const handleBackButtonClick = () => {
    navigate('/myinfo'); // 이전 페이지로 이동
  };

  return (
    <InfoContainer>
      <InfoTitle>개인정보수정</InfoTitle>
      <InfoEditContainer>
        <ImgEditContainer>
          <EditProfile />
          <ExitBtn>탈퇴하기</ExitBtn>
        </ImgEditContainer>

        <IntroductionContainer>
          <EditIntroduct onAboutMeChange={handleAboutMeChange} />
        </IntroductionContainer>

        <MyInfoEditForm>
          <EditForm
            userEmail={currentUserEmail}
            onNicknameChange={handleNicknameChange}
            onNewPasswordChange={handleNewPasswordChange}
          />
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
