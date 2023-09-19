import styled from 'styled-components';
import { GRAY_COLOR, LIGHT_GRAY_COLOR, LIGHT_ORANGE_COLOR } from '../../color/color';
import EditForm from './EditForm';
import EditProfile from './EditProfile';

export default function EditMyInfo() {
  return (
    <InfoContainer>
      <InfoTitleDiv>
        <InfoTitle>개인정보수정</InfoTitle>
      </InfoTitleDiv>
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
          <CancellBtn>취소</CancellBtn>
        </MyInfoBtnSetting>
      </InfoEditContainer>
    </InfoContainer>
  );
}

const InfoContainer = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const InfoTitleDiv = styled.div`
  margin-top: 20px;
`;

const InfoTitle = styled.p`
  font-size: 50px;
  font-weight: 700;
  text-align: left;
`;

const InfoEditContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 495px;
  grid-template-rows: 1fr 55px;
  padding-top: 50px;
  column-gap: 100px;
  row-gap: 50px;
  grid-template-areas:
    'ImgEditContainer MyInfoEditForm'
    'ImgEditContainer MyInfoBtnSetting';
`;

const ImgEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
