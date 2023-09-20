import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GRAY_COLOR, LIGHT_GRAY_COLOR, LIGHT_ORANGE_COLOR } from '../../color/color';
import EditForm from './EditForm';
import EditProfile from './EditProfile';

export default function EditMyInfo() {
  // 초기값 설정
  const [email, setEmail] = useState('leesh2985@naver.com');
  const [password, setPassword] = useState('1234');
  const [nickname, setNickname] = useState('이승현');

  const navigate = useNavigate();

  // 수정 상태를 관리하는 상태 변수 추가
  const [isEditing, setIsEditing] = useState(false);

  // 저장 버튼을 누르면 수정 상태를 해제하고 값을 업데이트
  const saveChanges = () => {
    setIsEditing(false);
    // 각 필드에 대한 값을 업데이트
    // 여기에서는 콘솔에 값을 출력하도록 했습니다.
    console.log('이메일:', email);
    console.log('비밀번호:', password);
    console.log('닉네임:', nickname);
  };

  const OnClickBackPage = () => {
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
          <EditBtn type="submit" onClick={saveChanges}>
            수정하기
          </EditBtn>
          <CancellBtn onClick={OnClickBackPage}>취소</CancellBtn>
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
