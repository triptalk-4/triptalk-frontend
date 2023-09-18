import styled from 'styled-components';
import { LIGHT_GRAY_COLOR } from '../../color/color';

export default function EditForm() {
  return (
    <MyInfoGrid>
      <MyInfoRow>
        <MyInfoLabel>이메일</MyInfoLabel>
        <MyInfoEditInput type="email" placeholder="이메일" required />
        <MyInfoLabelSpan aria-hidden="true">
          <LabelSpanText>이메일</LabelSpanText>
        </MyInfoLabelSpan>
      </MyInfoRow>
      <MyInfoRow>
        <MyInfoLabel>비밀번호</MyInfoLabel>
        <MyInfoEditInput type="password" placeholder="8~12자 영문, 숫자, 특수문자" required />
        <MyInfoLabelSpan aria-hidden="true">
          <LabelSpanText>비밀번호</LabelSpanText>
        </MyInfoLabelSpan>
      </MyInfoRow>
      <MyInfoRow>
        <MyInfoLabel>비밀번호확인</MyInfoLabel>
        <MyInfoEditInput type="password" placeholder="8~12자 영문, 숫자, 특수문자" required />
        <MyInfoLabelSpan aria-hidden="true">
          <LabelSpanText>비밀번호확인</LabelSpanText>
        </MyInfoLabelSpan>
      </MyInfoRow>
      <MyInfoRow>
        <MyInfoLabel>닉네임</MyInfoLabel>
        <MyInfoEditInput type="text" placeholder="6~20자 영문, 숫자" required />
        <MyInfoLabelSpan aria-hidden="true">
          <LabelSpanText>닉네임</LabelSpanText>
        </MyInfoLabelSpan>
      </MyInfoRow>
    </MyInfoGrid>
  );
}

const MyInfoGrid = styled.div`
  display: grid;
  row-gap: 60px;
`;

const MyInfoRow = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 10px;
  align-items: center; */

  /* .field 스타일 설정 */

  padding: 0 16px;
  border-bottom: 1px solid #000;
  position: relative;
  font-size: 16px;
`;

const MyInfoLabel = styled.label`
  /* grid-column: 1;
  text-align: left;
  font-weight: 700; */

  /* .ha-screen-reader 스타일 재설정 */
  width: 1px;
  height: 1px;
  padding: 0;
  border: none;

  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  overflow: hidden;
`;

const MyInfoEditInput = styled.input`
  /* grid-column: 2;
  border: none;
  border-bottom: 1px solid #000;
  outline: none; */
  outline: none;
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  padding: 10px 8px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);

  /* .field__input 스타일 적용 */
  /* --uiFieldPlaceholderColor: var(--fieldPlaceholderColor, #767676);
  background-color: transparent;
  border-radius: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  font-family: inherit;
  font-size: inherit; */

  /* 플레이스홀더 텍스트에 대한 스타일 */
  &:focus::-webkit-input-placeholder {
    /* 클릭 시 */
    opacity: 1;
    transition-delay: 0.2s;
  }

  &::-webkit-input-placeholder {
    /* 다른 곳 클릭 시 */
    opacity: 0;
    transition: opacity 0.2s ease-out;
  }

  &::-moz-placeholder {
    opacity: 0;
    transition: opacity 0.2s ease-out;
  }

  &:focus::-moz-placeholder {
    opacity: 1;
    transition-delay: 0.2s;
  }

  /* 포커스 상태의 플레이스홀더 텍스트 색상 설정 */
  &:focus::placeholder {
    color: ${LIGHT_GRAY_COLOR};
    outline: none;
  }
`;

const MyInfoLabelSpan = styled.span`
  box-sizing: border-box;
  pointer-events: none;
  cursor: text;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &::after {
    content: '';
    box-sizing: border-box;
    width: 100%;
    height: 0;
    opacity: 1; /* 수정된 부분: opacity 값을 1로 변경 */
    position: absolute;
    bottom: 0;
    left: 0;
    border-bottom: 1px solid #f46222; /* 원본 코드와 동일한 스타일 적용 */
    transition: opacity 0.2s ease-out;
  }

  &:focus ~ ::after {
    opacity: 1;
  }
`;

const LabelSpanText = styled.span`
  position: absolute;
  left: 15px;
  top: calc(50% - 0.5em);
  line-height: 1;
  font-size: var(--fieldHintFontSize, inherit);
  transition: top 0.2s cubic-bezier(0.9, -0.15, 0.1, 1.15), opacity 0.2s ease-out, font-size 0.2s ease-out;
`;
