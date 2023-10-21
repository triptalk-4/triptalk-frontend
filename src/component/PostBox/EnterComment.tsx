import React, { useState } from 'react';
import { PiArrowFatLineUpBold } from 'react-icons/pi';
import styled from 'styled-components';
import { GRAY_COLOR, MAIN_COLOR } from '../../color/color';
import axios from 'axios';

export default function EnterComment({ plannerDetailId }: { plannerDetailId: number }) {
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    console.log('댓글보내:', plannerDetailId);
    try {
      const Access_token = localStorage.getItem('token');
      const response = await axios.post(
        `/address/api/reply/detail/${plannerDetailId}`,
        {
          reply: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${Access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('댓글 업로드 성공:', response.data);
      } else {
        console.error('서버 응답 오류:', response);
      }
    } catch (error) {
      console.error('댓글 보내기 오류:', error);
    }
  };

  return (
    <CommentInputContainer>
      <InputWrap>
        <CommentInput placeholder="댓글 달기" value={newComment} onChange={handleCommentChange} />
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
