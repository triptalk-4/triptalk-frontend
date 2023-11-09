import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { DEFAULT_FONT_COLOR, GRAY_COLOR } from '../../color/color';

export default function Search() {
  return (
    <SearchBox>
      <SearchDiv to="/search">
        <Searchtext>
          닉네임을 검색해보세요.
          <SearchBtn type="button">
            <BiSearch />
          </SearchBtn>
        </Searchtext>
      </SearchDiv>
    </SearchBox>
  );
}

const SearchBox = styled.div`
  display: flex;
`;

const SearchDiv = styled(Link)`
  text-decoration: none;
  width: 300px;
  height: 30px;
  padding: 5px;
  margin-left: auto;
  border-bottom: 1px solid ${DEFAULT_FONT_COLOR};

  @media (max-width: 1000px) {
    width: 500px;
  }

  @media (max-width: 960px) {
    width: 450px;
  }

  @media (max-width: 885px) {
    width: 400px;
  }

  @media (max-width: 800px) {
    width: 350px;
  }

  @media (max-width: 730px) {
    width: 300px;
  }

  @media (max-width: 640px) {
    width: 250px;
  }

  @media (max-width: 580px) {
    width: 200px;
  }

  @media (max-width: 525px) {
    width: 150px;
    margin: 0 15px;
  }
`;

const Searchtext = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: ${GRAY_COLOR};

  @media (max-width: 525px) {
    font-size: 10px;
  }
`;

const SearchBtn = styled.button`
  width: 25px;
  height: 25px;
  font-size: 25px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${DEFAULT_FONT_COLOR};
`;
