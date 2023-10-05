import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { GRAY_COLOR, LIGHT_GRAY_COLOR, LIGHT_ORANGE_COLOR } from '../../../color/color';
import EditForm from './EditForm';
import EditProfile from '../../../component/ImgUpload/EditProfile';
import { useState } from 'react';

interface UserEditData {
  imgUrl: string;
  email: string;
  password: string;
  nickname: string;
}

export default function EditMyInfo() {
  const [userEditData, setUserEditData] = useState<UserEditData>({
    imgUrl: '',
    email: '',
    password: '',
    nickname: '',
  }); // msw

  const navigate = useNavigate();

  const [imgFile, setImgFile] = useState<File | string>('');

  const updateUserEditData = (data: UserEditData) => {
    setUserEditData(data);
  };

  const updateImgFile = (file: File) => {
    setImgFile(file);
  };
  const handleEditButtonClick = () => {
    const editedUserData = {
      ...userEditData,
      imgUrl: imgFile,
    };

    fetch('/api/updateUserData', {
      method: 'PUT',
      body: JSON.stringify(editedUserData), // 수정된 데이터를 서버로 보냅니다.
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log('데이터가 수정되었습니다.', data);
        setUserEditData(data);
      })
      .catch(error => console.error('데이터 수정 실패:', error));
  };

  const handleBackButtonClick = () => {
    navigate('/myinfo'); // 이전 페이지로 이동
  };

  return (
    <InfoContainer>
      <InfoTitle>개인정보수정</InfoTitle>
      <InfoEditContainer>
        <ImgEditContainer>
          <EditProfile updateImgFile={updateImgFile} />
          <ExitBtn>탈퇴하기</ExitBtn>
        </ImgEditContainer>

        <MyInfoEditForm>
          <EditForm updateUserEditData={updateUserEditData} />
        </MyInfoEditForm>

        <MyInfoBtnSetting>
          <EditBtn type="submit" onClick={handleEditButtonClick}>
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
  grid-template-rows: 1fr 55px;
  column-gap: 100px;
  row-gap: 30px;
  grid-template-areas:
    'ImgEditContainer MyInfoEditForm'
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

const SettingBtnStyle = css`
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

const CancelBtn = styled.button`
  ${SettingBtnStyle}
  background-color: ${LIGHT_GRAY_COLOR};
  color: ${GRAY_COLOR};
`;
