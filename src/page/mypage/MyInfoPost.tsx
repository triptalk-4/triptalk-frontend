import styled from 'styled-components';

export default function MyInfoPost() {
  return (
    <PostContainer>
      <PostUl>
        <PostItem>
          {' '}
          <PostImage src="/img/postimg6.jpg" alt="첫번째 이미지" />
        </PostItem>
        <PostItem>
          {' '}
          <PostImage src="/img/postimg5.jpg" alt="첫번째 이미지" />
        </PostItem>
        <PostItem>
          {' '}
          <PostImage src="/img/postimg4.jpg" alt="첫번째 이미지" />
        </PostItem>
        <PostItem>
          {' '}
          <PostImage src="/img/postimg3.jpg" alt="첫번째 이미지" />
        </PostItem>
        <PostItem>
          {' '}
          <PostImage src="/img/postimg2.jpg" alt="첫번째 이미지" />
        </PostItem>
        <PostItem>
          {' '}
          <PostImage src="/img/postimg1.jpg" alt="첫번째 이미지" />
        </PostItem>
      </PostUl>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  height: 100%;
`;

const PostUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const PostItem = styled.li`
  width: 300px;
  height: 350px;
  margin-bottom: 30px;
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: #000;
  }
`;
