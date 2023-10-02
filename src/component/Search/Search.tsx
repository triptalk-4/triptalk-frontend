import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { GRAY_COLOR } from '../../color/color';

export default function Search() {
  return (
    <SearchBox>
      <SearchDiv to="/search">
        <Searchtext>
          여행지를 입력해주세요.
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

  width: 530px;
  height: 50px;
  padding: 3px;
  margin-left: auto;
  border-radius: 55px;

  background-image: linear-gradient(#fff, #fff), linear-gradient(to right, #f46222, #ffe94d);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const Searchtext = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  padding: 10px 20px;
  color: ${GRAY_COLOR};
`;

const SearchBtn = styled.button`
  width: 25px;
  height: 25px;
  font-size: 25px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${GRAY_COLOR};
`;
