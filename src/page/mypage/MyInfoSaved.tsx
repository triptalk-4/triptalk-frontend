import styled from 'styled-components';

export default function MyInfoSaved() {
  return (
    <SavedContainer>
      <SavedUl>
        <SavedItem>
          {' '}
          <SavedImage src="/img/postimg1.jpg" alt="첫번째 이미지" />
        </SavedItem>
        <SavedItem>
          {' '}
          <SavedImage src="/img/postimg2.jpg" alt="첫번째 이미지" />
        </SavedItem>
        <SavedItem>
          {' '}
          <SavedImage src="/img/postimg5.jpg" alt="첫번째 이미지" />
        </SavedItem>
        <SavedItem>
          {' '}
          <SavedImage src="/img/postimg4.jpg" alt="첫번째 이미지" />
        </SavedItem>
        <SavedItem>
          {' '}
          <SavedImage src="/img/postimg3.jpg" alt="첫번째 이미지" />
        </SavedItem>

        <SavedItem>
          {' '}
          <SavedImage src="/img/postimg6.jpg" alt="첫번째 이미지" />
        </SavedItem>
      </SavedUl>
    </SavedContainer>
  );
}

const SavedContainer = styled.div`
  height: 100%;
`;

const SavedUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SavedItem = styled.li`
  width: 300px;
  height: 350px;
  margin-bottom: 30px;
`;

const SavedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: #000;
  }
`;
