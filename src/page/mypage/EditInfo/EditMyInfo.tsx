import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { GRAY_COLOR, LIGHT_GRAY_COLOR, LIGHT_ORANGE_COLOR } from '../../../color/color';
import EditForm from './EditForm';
import EditProfile from './EditProfile';

export default function EditMyInfo() {
  const navigate = useNavigate();

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

        <MyInfoEditForm>
          <EditForm />
        </MyInfoEditForm>

        <MyInfoBtnSetting>
          <EditBtn type="submit">수정하기</EditBtn>
          <CancellBtn onClick={handleBackButtonClick}>취소</CancellBtn>
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
  grid-template-rows: 1fr 55px;
  padding-top: 50px;
  column-gap: 100px;
  row-gap: 30px;
  grid-template-areas:
    'ImgEditContainer MyInfoEditForm'
    'MyInfoBtnSetting MyInfoBtnSetting';
`;

const ImgEditContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  grid-area: ImgEditContainer;
`;

const ExitBtn = styled.button`
  font-size: 15px;
  border: none;
  background-color: transparent;
  text-decoration: underline;
  padding-top: 40px;
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

const SettingBtnStyle = `
  width: 120px;
  height: 55px;
  border: none;
  cursor: pointer;
  border-radius: 15px;
  font-size: 15px;
`;

const EditBtn = styled.button`
  ${SettingBtnStyle}
  background-color: ${LIGHT_ORANGE_COLOR};
  color: #fff;
  margin-right: 25px;
`;

const CancellBtn = styled.button`
  ${SettingBtnStyle}
  background-color: ${LIGHT_GRAY_COLOR};
  color: ${GRAY_COLOR};
`;
