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

  /* background-image: linear-gradient(#fff, #fff), linear-gradient(to right, #f46222, #ffe94d);
  background-origin: border-box;
  background-clip: content-box, border-box; */
`;

const Searchtext = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: ${GRAY_COLOR};
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
