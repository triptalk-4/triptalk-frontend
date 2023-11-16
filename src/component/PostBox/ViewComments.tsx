import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { RootState } from '../../store/store';
import { GRAY_COLOR, LIGHT_GRAY_COLOR, MAIN_COLOR } from '../../color/color';
import { PiArrowFatLineUpBold } from 'react-icons/pi';
import formatDate from '../../utils/formatDate';

interface IReplyData {
  readonly replyId: number;
  readonly createDt: number;
  readonly nickname: string;
  readonly profile: string;
  readonly reply: string;
  readonly email: string;
}

interface ViewCommentsProps {
  plannerDetailId: number;
}

export default function ViewComments({ plannerDetailId }: ViewCommentsProps) {
  const [commentData, setCommentData] = useState<IReplyData[]>([]);
  const [commentUserReply, setCommentUserReply] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState('');
  const userReplyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (userReplyRef.current) {
      userReplyRef.current.style.height = 'auto';
      userReplyRef.current.style.height = `${userReplyRef.current.scrollHeight}px`;
    }
  }, [commentData, isEditing]);

  const [, setReplyId] = useState('');

  const token = useSelector((state: RootState) => state.token.token);

  useEffect(() => {
    const fetchComment = async () => {
      const Access_token = localStorage.getItem('token');
      try {
        const response = await axios.get(`/address/api/reply/detail/replies/${plannerDetailId}`, {
          headers: {
            Authorization: `Bearer ${Access_token}`,
          },
        });

        if (response.data) {
          const { replyId, reply } = response.data;
          setReplyId(replyId);
          setCommentUserReply(reply);
          setCommentData(response.data);
        } else {
          console.log('데이터가 없습니다 댓글부분.'); // 데이터가 없을 경우에도 오류가 없게 수정
        }

        // console.log('response.data', response.data);
      } catch (error) {
        console.error('댓글 가지고오기 오류:', error);
      }
    };

    fetchComment();
  }, [token]);
  // console.log('번호', plannerDetailId);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const Access_token = localStorage.getItem('userEmail');

  // 수정
  const handleSaveClick = async (replyId: number) => {
    // console.log(replyId);
    const Access_token = localStorage.getItem('token');
    const response = await axios.put(
      `/address/api/reply/${replyId}`,
      {
        reply: commentUserReply,
      },
      {
        headers: {
          Authorization: `Bearer ${Access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      console.log('댓글이 성공적으로 수정되었습니다.');
      setIsEditing(false);
    } else {
      console.error('댓글 수정 중 오류가 발생했습니다.');
    }
  };

  // 삭제
  const handleDeleteClick = async (replyId: number) => {
    const Access_token = localStorage.getItem('token');
    if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      try {
        const response = await axios.delete(`/address/api/reply/${replyId}`, {
          headers: {
            Authorization: `Bearer ${Access_token}`,
          },
        });

        if (response.status === 200) {
          console.log('댓글이 성공적으로 삭제되었습니다.');
          setCommentData(commentData.filter(comment => comment.replyId !== replyId));
        } else {
          console.error('댓글이 정상적으로 삭제되지 않음');
        }
      } catch (error) {
        console.error('댓글 삭제 중 오류가 발생했습니다.', error);
      }
    }
  };

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
        //  window.location.reload();
        const updatedCommentData = await axios.get(`/address/api/reply/detail/replies/${plannerDetailId}`, {
          headers: {
            Authorization: `Bearer ${Access_token}`,
          },
        });

        if (updatedCommentData.data) {
          setCommentData(updatedCommentData.data);
        } else {
          console.error('데이터가 없습니다 댓글부분.');
        }

        // 댓글 입력 필드 초기화
        setNewComment('');
      } else {
        console.error('서버 응답 오류:', response);
      }
    } catch (error) {
      console.error('댓글 보내기 오류:', error);
    }
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommentSubmit();
    }
  };

  return (
    <>
      <UserCommentContainer>
        <UserCommentContainerInner>
          {commentData.map(comment => (
            <CommentBox key={comment.replyId}>
              <UserImg src={comment.profile} />
              <UserBox>
                <UserComment>
                  <UserName>{comment.nickname}</UserName>
                  <UserReply ref={userReplyRef} defaultValue={comment.reply} disabled={!isEditing} />
                  {Access_token !== comment.email && <UplaodDate>{formatDate(comment.createDt)}</UplaodDate>}
                </UserComment>
                <EnDdiv>
                  {isEditing ? (
                    Access_token === comment.email ? (
                      <SaveBtn onClick={() => handleSaveClick(comment.replyId)}>저장</SaveBtn>
                    ) : null
                  ) : (
                    Access_token === comment.email && (
                      <>
                        <UplaodDate>{formatDate(comment.createDt)}</UplaodDate>
                        <EditBtn onClick={handleEditClick}>수정</EditBtn>
                        <DeleteBtn onClick={() => handleDeleteClick(comment.replyId)}>삭제</DeleteBtn>
                      </>
                    )
                  )}
                </EnDdiv>
              </UserBox>
            </CommentBox>
          ))}
        </UserCommentContainerInner>
      </UserCommentContainer>
      <PostBorder></PostBorder>
      <CommentInputContainer>
        <InputWrap>
          <CommentInput
            placeholder="댓글 달기"
            value={newComment}
            onChange={handleCommentChange}
            onKeyDown={handleOnKeyPress}
          />
          <EnterBtn type="button" onClick={handleCommentSubmit} />
        </InputWrap>
      </CommentInputContainer>
    </>
  );
}

const CommentBox = styled.div`
  width: 100%;
  margin: 10px 0;
  display: flex;
  align-items: center;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const UserImg = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 15px;
  border: 1px solid ${LIGHT_GRAY_COLOR};
`;

const UserBox = styled.div`
  width: 100%;
  font-size: 8px;
`;

const UserCommentContainer = styled.div`
  width: 100%;
  height: 225px;
  overflow-y: hidden;
  padding: 20px 10px;
`;

const UserCommentContainerInner = styled.div`
  height: 100%;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const UserComment = styled.div`
  width: 100%;
  font-size: 14px;
`;

const UserName = styled.h1`
  margin-right: 5px;
  font-weight: 700;
`;

const UserReply = styled.textarea`
  width: 100%;
  white-space: normal;
  border: none;
  resize: none;

  &:disabled {
    background-color: transparent;
  }
`;

const EnDdiv = styled.div`
  display: flex;
`;

const EnDStyle = css`
  background-color: transparent;
  border: none;
  font-size: 10px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SaveBtn = styled.button`
  ${EnDStyle}
  color: #2fc32f;
`;

const EditBtn = styled.button`
  ${EnDStyle}
  color: #b8b8b8;
`;

const DeleteBtn = styled.button`
  ${EnDStyle}
  color: #ff8181;
`;

const PostBorder = styled.div`
  border: 1px solid ${GRAY_COLOR};
`;

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

const UplaodDate = styled.p`
  font-size: 10px;
`;
