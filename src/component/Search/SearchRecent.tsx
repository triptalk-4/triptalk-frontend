import styled from 'styled-components';
import { CgClose } from 'react-icons/cg';
const SearchRecent = () => {
  return (
    <Container>
      <Title>최근 검색</Title>
      <Ul>
        <SearchList>
          최근검색어
          <CgClose />
        </SearchList>
        <SearchList>
          최근검색어
          <CgClose />
        </SearchList>
        <SearchList>
          최근검색어
          <CgClose />
        </SearchList>
      </Ul>
    </Container>
  );
};

export default SearchRecent;

const Container = styled.div`
  width: 100%;
  margin-top: 60px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
`;
const Ul = styled.ul`
  margin-top: 24px;
`;

const SearchList = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
`;
