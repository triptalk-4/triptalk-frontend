import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { RootState } from '../../store/store';
import { useParams } from 'react-router';
import { PiArrowFatLineUpBold } from 'react-icons/pi';
import { GRAY_COLOR, MAIN_COLOR } from '../../color/color';

export default function ViewComments() {
  const { plannerDetailId } = useParams();
  const [commentUserImg, setCommentUserImg] = useState('');
  const [commentUserNickname, setCommentUserNickname] = useState('');
  const [commentUserReply, setCommentUserReply] = useState('');

  const token = useSelector((state: RootState) => state.token.token);

  useEffect(() => {
    const fetchDetailPage = async () => {
      const Access_token = localStorage.getItem('token');
      try {
        const response = await axios.get(`/address/api/reply/detail/replies/${plannerDetailId}`, {
          headers: {
            Authorization: `Bearer ${Access_token}`,
          },
        });
        console.log(plannerDetailId);
        if (response.data) {
          const { nickname, profile, reply } = response.data;
          setCommentUserNickname(nickname);
          setCommentUserImg(profile);
          setCommentUserReply(reply);
        }
      } catch (error) {
        console.error('댓글 가지고오기 오류:', error);
      }
    };

    fetchDetailPage();
  }, [token, plannerDetailId]);

  return (
    <>
      <UserCommentContainer>
        <UserCommentContainerInner>
          <CommentBox>
            <UserImg src={commentUserImg} />
            <UserBox>
              <UserComment>
                <UserName>{commentUserNickname}</UserName>
                {commentUserReply}
              </UserComment>
              <EnDdiv>
                <EditBtn>수정</EditBtn>
                <DeleteBtn>삭제</DeleteBtn>
              </EnDdiv>
            </UserBox>
          </CommentBox>
        </UserCommentContainerInner>
      </UserCommentContainer>{' '}
      <PostBorder></PostBorder>
      <CommentInputContainer>
        <InputWrap>
          <CommentInput placeholder="댓글 달기" />
          <EnterBtn type="button" />
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
