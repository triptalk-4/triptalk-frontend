import styled from 'styled-components';

export default function EditMyInfo() {
  return (
    <InfoContainer>
      <InfoTitle>개인정보수정</InfoTitle>
      <InfoEditContainer>
        <ImgEditContainer>
          <ImgEdit></ImgEdit>
          <ExitBtn>탈퇴하기</ExitBtn>
        </ImgEditContainer>
        <MyInfoEditform>
          <MyInfoEditInput type="email" placeholder="이메일" required />
          <MyInfoEditInput type="password" placeholder="비밀번호" required />
          <MyInfoEditInput type="password" placeholder="비밀번호확인" required />
          <MyInfoEditInput type="text" placeholder="닉네임" required />
        </MyInfoEditform>
      </InfoEditContainer>
    </InfoContainer>
  );
}

const InfoContainer = styled.div`
  width: 900px;
  margin: 0 auto;
`;

const InfoTitle = styled.p`
  padding-top: 128px;
  font-size: 50px;
  font-weight: 700;
  text-align: left;
`;

const InfoEditContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 50px 0;
`;

const ImgEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 100px;
`;

const ImgEdit = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid #000;
  border-radius: 100%;
`;

const ExitBtn = styled.button`
  font-size: 15px;
  border: none;
  background-color: transparent;
  text-decoration: underline;
  padding-top: 40px;

  cursor: pointer;
`;

const MyInfoEditform = styled.form`
  display: flex;
  flex-direction: column;
`;

const MyInfoEditInput = styled.input``;
