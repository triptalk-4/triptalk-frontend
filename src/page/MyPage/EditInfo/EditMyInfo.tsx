import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { GRAY_COLOR, LIGHT_GRAY_COLOR, LIGHT_ORANGE_COLOR, MAIN_COLOR } from '../../../color/color';
import EditForm from './EditForm';
import EditProfile from '../../../component/ImgUpload/EditProfile';
import { useState } from 'react';
import EditIntroduct from './EditIntroduct';

export default function EditMyInfo() {
  const [profileImage, setProfileImage] = useState('');
  const [profilenickName, setProfilenickName] = useState('');
  const [profilePassword, setProfilePassword] = useState('');
  const [profileIntro, setProfileIntro] = useState('');

  const [isButtonEnabled, setIsButtonEnabled] = useState(false); // 버튼 활성화 상태 추가

  const handleImageChange = (imageUrl: string) => {
    setProfileImage(imageUrl);
    setIsButtonEnabled(true);
  };

  const handleIntroUpdate = (text: string) => {
    setProfileIntro(text);
  };

  const handleEditDataChange = (data: { newPassword: string; nickname: string }) => {
    console.log('Data changed:', data);
    setProfilenickName(data.nickname);
    setProfilePassword(data.newPassword);
    setIsButtonEnabled(true);
  };

  const navigate = useNavigate();

  const handleEditButtonClick = () => {
    localStorage.removeItem('userInfo');

    const updatedUserData = {
      imgUrl: profileImage,
      newPassword: profilePassword,
      nickname: profilenickName,
      text: profileIntro,
    };

    localStorage.setItem('userInfo', JSON.stringify(updatedUserData));

    navigate('/myinfo');
  };

  const handleBackButtonClick = () => {
    navigate('/myinfo'); // 이전 페이지로 이동
  };

  return (
    <InfoContainer>
      <InfoTitle>개인정보수정</InfoTitle>
      <InfoEditContainer>
        <ImgEditContainer>
          <EditProfile onImageChange={handleImageChange} />
          <ExitBtn>탈퇴하기</ExitBtn>
        </ImgEditContainer>

        <IntroductionContainer>
          <EditIntroduct onUpdateIntro={handleIntroUpdate} />
        </IntroductionContainer>

        <MyInfoEditForm>
          <EditForm onDataChange={handleEditDataChange} />
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
  grid-template-rows: 1fr 1fr 55px;
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
  margin-top: 40px;
  cursor: pointer;
`;

const MyInfoEditForm = styled.form`
  display: flex;
  flex-direction: column;
  grid-area: MyInfoEditForm;
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
