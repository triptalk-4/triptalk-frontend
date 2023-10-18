import { PiArrowFatLineUpBold } from 'react-icons/pi';
import styled from 'styled-components';
import { GRAY_COLOR, MAIN_COLOR } from '../../color/color';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

export default function EnterComment() {
  const [comment, setComment] = useState('');
  const Access_token = localStorage.getItem('token');
  const { plannerDetailId } = useParams();

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    const newComment = { text: comment };

    try {
      const response = await axios.post(
        `/address/api/plans/detail/${plannerDetailId}/reply`, // plannerDetailId 변수로 대체
        newComment,
        {
          headers: {
            Authorization: `Bearer ${Access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('데이터 전송 완료');
        alert('댓글 등록 완료!');
      } else {
        alert('댓글 등록 실패');
      }
    } catch (error) {
      console.error('데이터 전송 오류', error);
    }
  };

  return (
    <CommentInputContainer>
      <InputWrap>
        <CommentInput placeholder="댓글 달기" value={comment} onChange={handleCommentChange} />
        <EnterBtn type="button" onClick={handleCommentSubmit} />
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
