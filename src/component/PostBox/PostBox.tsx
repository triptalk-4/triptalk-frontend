import styled from 'styled-components';
import { GrCursor } from 'react-icons/gr';

export default function PostBox() {
  return (
    <PostBoxContainer>
      <PostImg src="img/Carousel.png" alt=""></PostImg>
      <PostInfo>
        <PostInfoTime>시간 : 10월 3, 2023 11:30 오전</PostInfoTime>
        <PostInfoTitle>제목 : 양양가서 서핑하다옴</PostInfoTitle>
        <PostInfoDescription>물만 엄청먹고 왔음 ㅠㅠ</PostInfoDescription>
        <PostBorder></PostBorder>
        <UserCommentContainer>
          <UserCommentContainerInner>
            <CommentBox>
              <UserImg></UserImg>
              <UserBox>
                <UserComment>zerobase 좋아요~~</UserComment>
                ...
              </UserBox>
            </CommentBox>
            <CommentBox>
              <UserImg></UserImg>
              <UserBox>
                <UserComment>zerobase 좋아요~~</UserComment>
                ...
              </UserBox>
            </CommentBox>
            <CommentBox>
              <UserImg></UserImg>
              <UserBox>
                <UserComment>zerobase 좋아요~~</UserComment>
                ...
              </UserBox>
            </CommentBox>
            <CommentBox>
              <UserImg></UserImg>
              <UserBox>
                <UserComment>zerobase 좋아요~~</UserComment>
                ...
              </UserBox>
            </CommentBox>
            <CommentBox>
              <UserImg></UserImg>
              <UserBox>
                <UserComment>zerobase 좋아요~~</UserComment>
                ...
              </UserBox>
            </CommentBox>
            <CommentBox>
              <UserImg></UserImg>
              <UserBox>
                <UserComment>zerobase 좋아요~~</UserComment>
                ...
              </UserBox>
            </CommentBox>
            <CommentBox>
              <UserImg></UserImg>
              <UserBox>
                <UserComment>zerobase 좋아요~~</UserComment>
                ...
              </UserBox>
            </CommentBox>
          </UserCommentContainerInner>
        </UserCommentContainer>
        <PostBorder></PostBorder>
        <CommentInputContainer>
          <CommentInput placeholder="댓글 입력" />
          <ArrowIcons />
        </CommentInputContainer>
      </PostInfo>
    </PostBoxContainer>
  );
}

const PostBoxContainer = styled.div`
  width: 500px;
  height: 400px;
  display: flex;
`;

const PostImg = styled.img`
  width: 250px;
  height: 400px;
  background-color: pink;
  border-radius: 25px 0 0 25px;
`;

const PostInfo = styled.div`
  width: 250px;
  height: 400px;
  background-color: white;
  padding-left: 20px;
  border-radius: 0 25px 25px 0;
`;

const PostInfoTime = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 20px;
  font-size: 12px;
`;

const PostInfoTitle = styled.div`
  width: 100%;
  height: 30px;
  font-size: 12px;
`;

const PostInfoDescription = styled.div`
  width: 100%;
  max-height: 60px;
  font-size: 12px;
  overflow-y: auto;
  margin-bottom: 20px;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const PostBorder = styled.div`
  border: 1px solid black;
`;

const CommentBox = styled.div`
  width: 100%;
  margin: 15px 0;
  display: flex;
`;

const UserImg = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #cccbcb;
  margin-right: 20px;
`;

const UserBox = styled.div`
  width: 100%;
  font-size: 8px;
`;

const UserCommentContainer = styled.div`
  width: 100%;
  height: 175px;
  overflow-y: hidden;
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
  height: 13px;
`;

const CommentInputContainer = styled.div`
  position: relative;
  width: 100%;
  height: 25px;
  margin-top: 20px;
`;

const CommentInput = styled.input`
  width: 100%;
  height: 25px;
  border-radius: 25px;
  color: white;
  background-color: gray;
  padding: 0 10px;
  font-size: 12px;

  &::placeholder {
    color: white;
    font-size: 12px;
  }
`;

const ArrowIcons = styled(GrCursor)`
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  color: #ffffff;
  cursor: pointer;
`;
