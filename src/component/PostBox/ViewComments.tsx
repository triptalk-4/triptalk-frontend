import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { RootState } from '../../store/store';

interface ItemType {
  nickname: string;
  profile: string;
  reply: string;
}

export default function ViewComments({
  plannerDetailId,
  commentUserNickname,
  commentUserProfile,
  commentUserRreply,
}: {
  plannerDetailId: number;
  commentUserNickname: string;
  commentUserProfile: string;
  commentUserRreply: string;
}) {
  const [, setCommentUserNickname] = useState('');
  const [, setCommentUserProfile] = useState('');
  const [, setCommentUserReply] = useState('');

  const token = useSelector((state: RootState) => state.token.token);

  useEffect(() => {
    const fetchtComment = async () => {
      console.log('댓글어디:', plannerDetailId);
      const Access_token = localStorage.getItem('token');
      try {
        const response = await axios.get(`/address/api/reply/detail/replies/${plannerDetailId}`, {
          headers: {
            Authorization: `Bearer ${Access_token}`,
          },
        });

        if (response.data) {
          const commentData = response.data.map((item: ItemType) => {
            return {
              nickname: item.nickname,
              profile: item.profile,
              reply: item.reply,
            };
          });
          setCommentUserNickname(commentData.map((item: ItemType) => item.nickname));
          setCommentUserProfile(commentData.map((item: ItemType) => item.profile));
          setCommentUserReply(commentData.map((item: ItemType) => item.reply));
        }
        console.log('response.data', response.data[0]);
      } catch (error) {
        console.error('댓글 가지고오기 오류:', error);
      }
    };

    fetchtComment();
  }, [token, plannerDetailId]);
  // console.log('번호', plannerDetailId);

  return (
    <>
      <UserCommentContainer>
        <UserCommentContainerInner>
          <CommentBox>
            <UserImg src={commentUserProfile} />
            <UserBox>
              <UserComment>
                <UserName>{commentUserNickname}</UserName>
                {commentUserRreply}
              </UserComment>
              <EnDdiv>
                <EditBtn>수정</EditBtn>
                <DeleteBtn>삭제</DeleteBtn>
              </EnDdiv>
            </UserBox>
          </CommentBox>
        </UserCommentContainerInner>
      </UserCommentContainer>
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

const EditBtn = styled.button`
  ${EnDStyle}
  color: #b8b8b8;
`;
const DeleteBtn = styled.button`
  ${EnDStyle}
  color: #ff8181;
`;
