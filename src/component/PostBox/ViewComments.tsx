import styled, { css } from 'styled-components';

export default function ViewComments() {
  return (
    <UserCommentContainer>
      <UserCommentContainerInner>
        <CommentBox>
          <UserImg src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
          <UserBox>
            <UserComment>
              <UserName>zerobase</UserName>
              좋아요~~1
            </UserComment>
            <EnDdiv>
              <EditBtn>수정</EditBtn>
              <DeleteBtn>삭제</DeleteBtn>
            </EnDdiv>
          </UserBox>
        </CommentBox>
        <CommentBox>
          <UserImg src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
          <UserBox>
            <UserComment>
              <UserName>zerobase</UserName>
              좋아요~~2
            </UserComment>
            <EnDdiv>
              <EditBtn>수정</EditBtn>
              <DeleteBtn>삭제</DeleteBtn>
            </EnDdiv>
          </UserBox>
        </CommentBox>
        <CommentBox>
          <UserImg src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
          <UserBox>
            <UserComment>
              <UserName>zerobase</UserName>
              좋아요~~3
            </UserComment>
            <EnDdiv>
              <EditBtn>수정</EditBtn>
              <DeleteBtn>삭제</DeleteBtn>
            </EnDdiv>
          </UserBox>
        </CommentBox>
        <CommentBox>
          <UserImg src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
          <UserBox>
            <UserComment>
              <UserName>zerobase</UserName>
              좋아요~~4
            </UserComment>
            <EnDdiv>
              <EditBtn>수정</EditBtn>
              <DeleteBtn>삭제</DeleteBtn>
            </EnDdiv>
          </UserBox>
        </CommentBox>
        <CommentBox>
          <UserImg src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
          <UserBox>
            <UserComment>
              <UserName>zerobase</UserName>
              좋아요~~5
            </UserComment>
            <EnDdiv>
              <EditBtn>수정</EditBtn>
              <DeleteBtn>삭제</DeleteBtn>
            </EnDdiv>
          </UserBox>
        </CommentBox>
        <CommentBox>
          <UserImg src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
          <UserBox>
            <UserComment>
              <UserName>zerobase</UserName>
              좋아요~~6
            </UserComment>
            <EnDdiv>
              <EditBtn>수정</EditBtn>
              <DeleteBtn>삭제</DeleteBtn>
            </EnDdiv>
          </UserBox>
        </CommentBox>
        <CommentBox>
          <UserImg src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
          <UserBox>
            <UserComment>
              <UserName>zerobase</UserName>
              좋아요~~7
            </UserComment>
            <EnDdiv>
              <EditBtn>수정</EditBtn>
              <DeleteBtn>삭제</DeleteBtn>
            </EnDdiv>
          </UserBox>
        </CommentBox>
        <CommentBox>
          <UserImg src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
          <UserBox>
            <UserComment>
              <UserName>zerobase</UserName>
              좋아요~~8
            </UserComment>
            <EnDdiv>
              <EditBtn>수정</EditBtn>
              <DeleteBtn>삭제</DeleteBtn>
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
