import styled from 'styled-components';
import SearchHead from '../component/Search/SearchHead';
import SearchPopular from '../component/Search/SearchPopular';
import SearchRecent from '../component/Search/SearchRecent';

const SearchPage = () => {
  return (
    <>
      <Container>
        <SearchHead />
        <SearchPopular />
        <Divider />
        <SearchRecent />
      </Container>
    </>
  );
};

export default SearchPage;

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Divider = styled.div`
  width: 100%;
  border-top: 1px solid #242424;
  margin-top: 130px;
`;
