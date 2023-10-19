import styled from 'styled-components';
import SearchBody from '../component/Search/SearchBody';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  return (
    <>
      <Gnb>
        <Logo to="/main">
          <LogoImg src="/img/logo.png" alt="로고" />
        </Logo>
      </Gnb>
      <Container>
        <SearchBody />
      </Container>
    </>
  );
};

export default SearchPage;

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Gnb = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 55px 15px;
  border-bottom: 1px solid #c1c1c1;
  height: 86px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LogoImg = styled.img`
  width: 200px;
  height: auto;
`;
