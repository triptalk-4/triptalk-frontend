import styled from 'styled-components';
import Search from '../component/Search/SearchHead';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  return (
    <>
      <Gnb>
        <Logo to="/main">
          <LogoImg src="/img/logo.png" alt="로고" />
        </Logo>
        {/* <Avatar to="/myinfo">
          <AvatarImg src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
        </Avatar> */}
      </Gnb>
      <Container>
        <Search />
        {/* <SearchPopular />
        <Divider />
        <SearchRecent /> */}
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

// const Avatar = styled(Link)`
//   height: 50px;
// `;

// const AvatarImg = styled.img`
//   width: 50px;
//   height: 50px;
//   border-radius: 100%;
// `;

const Divider = styled.div`
  width: 100%;
  border-top: 1px solid #242424;
  margin-top: 60px;
`;
