import { PiArrowFatLineUpBold } from 'react-icons/pi';
import styled from 'styled-components';
import { GRAY_COLOR, MAIN_COLOR } from '../../color/color';

export default function EnterComment() {
  return (
    <CommentInputContainer>
      <InputWrap>
        <CommentInput placeholder="댓글 달기" />
        <EnterBtn type="button" />
      </InputWrap>
    </CommentInputContainer>
  );
}

const CommentInputContainer = styled.div`
  padding: 20px 10px;
`;

const CommentInput = styled.input`
  width: 100%;
  height: 25px;

  border-bottom: 1px solid ${GRAY_COLOR};
  padding: 0 20px 0 10px;
  font-size: 12px;
  outline: none;

  &::placeholder {
    color: ${GRAY_COLOR};
    font-size: 12px;
  }
`;

const InputWrap = styled.div`
  display: flex;
`;

const EnterBtn = styled(PiArrowFatLineUpBold)`
  width: 25px;
  height: 25px;
  cursor: pointer;
  color: #000;

  &:hover {
    color: ${MAIN_COLOR};
  }
`;
