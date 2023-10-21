import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { RootState } from '../../store/store';

interface ItemType {
  nickname: string;
  profile: string;
  reply: string;
  replyId: number;
}

export default function ViewComments({
  plannerDetailId,
  commentUserNickname,
  commentUserProfile,
  commentUserReply,
}: {
  plannerDetailId: number;
  commentUserNickname: string;
  commentUserProfile: string;
  commentUserReply: string;
}) {
  const [, setCommentUserNickname] = useState('');
  const [, setCommentUserProfile] = useState('');
  const [, setCommentUserReply] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [replyId, setReplyId] = useState('');

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
          response.data.forEach((item: ItemType) => {
            console.log('닉', item.nickname);
            const commentNickname = item.nickname;
            const commentprofile = item.profile;
            const commentreply = item.reply;
            setCommentUserNickname(commentNickname);
            setCommentUserProfile(commentprofile);
            setCommentUserReply(commentreply);
            setReplyId(replyId);
          });
        }
        console.log('response.data', response.data);
      } catch (error) {
        console.error('댓글 가지고오기 오류:', error);
      }
    };

    fetchComment();
  }, [token]);
  console.log('번호', plannerDetailId);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const Access_token = localStorage.getItem('token');
  // const showBtn = Access_token === token;
  console.log(Access_token);
  console.log(token);

  // 수정
  const handleSaveClick = async () => {
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
  const handleDeleteClick = async () => {
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
        } else {
          console.error('댓글 삭제 중 오류가 발생했습니다.');
        }
      } catch (error) {
        console.error('댓글 삭제 중 오류가 발생했습니다.', error);
      }
    }
  };

  return (
    <UserCommentContainer>
      <UserCommentContainerInner>
        <CommentBox>
          <UserImg src={commentUserProfile} />
          <UserBox>
            <UserComment>
              <UserName>{commentUserNickname}</UserName>
              {isEditing ? (
                <UserReply
                  type="text"
                  defaultValue={commentUserReply}
                  onChange={e => setCommentUserReply(e.target.value)}
                />
              ) : (
                <UserReply type="text" value={commentUserReply} disabled />
              )}
            </UserComment>
            <EnDdiv>
              {isEditing ? (
                <>
                  <SaveBtn onClick={handleSaveClick}>저장</SaveBtn>
                  <DeleteBtn onClick={handleDeleteClick}>삭제</DeleteBtn>
                </>
              ) : (
                <>
                  <EditBtn onClick={handleEditClick}>수정</EditBtn>
                  <DeleteBtn onClick={handleDeleteClick}>삭제</DeleteBtn>
                </>
              )}
            </EnDdiv>
          </UserBox>
        </CommentBox>
      </UserCommentContainerInner>
    </UserCommentContainer>
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
  display: flex;
  align-items: flex-start;
  font-size: 14px;
`;

const UserName = styled.h1`
  margin-right: 5px;
  font-weight: 700;
`;

const UserReply = styled.input`
  &:disabled {
    background-color: transparent;
  }
`;

const EnDdiv = styled.div``;

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
