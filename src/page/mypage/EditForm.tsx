import styled from 'styled-components';

export default function EditForm() {
  return (
    <MyInfoGrid>
      <MyInfoRow>
        <MyInfoLabel>이메일</MyInfoLabel>
        <MyInfoEditInput type="email" placeholder="이메일" required />
      </MyInfoRow>
      <MyInfoRow>
        <MyInfoLabel>비밀번호</MyInfoLabel>
        <MyInfoEditInput type="password" placeholder="8~12자 영문, 숫자, 특수문자" required />
      </MyInfoRow>
      <MyInfoRow>
        <MyInfoLabel>비밀번호확인</MyInfoLabel>
        <MyInfoEditInput type="password" placeholder="8~12자 영문, 숫자, 특수문자" required />
      </MyInfoRow>
      <MyInfoRow>
        <MyInfoLabel>닉네임</MyInfoLabel>
        <MyInfoEditInput type="text" placeholder="6~20자 영문, 숫자" required />
      </MyInfoRow>
    </MyInfoGrid>
  );
}

const MyInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 60px;
`;

const MyInfoRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 10px;
  align-items: center;
`;

const MyInfoLabel = styled.label`
  grid-column: 1;
  text-align: left;
  font-weight: 700;
`;

const MyInfoEditInput = styled.input`
  grid-column: 2;
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
`;
