import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';

export default function Search() {
  return (
    <SearchBox>
      <SearchInput type="search" name="search" placeholder="검색어를 입력해 주세요" />
      <SearchBtn type="button">
        <BiSearch />
      </SearchBtn>
    </SearchBox>
  );
}

const SearchBox = styled.div`
  display: flex;
  position: relative;
`;

const SearchInput = styled.input`
  width: 530px;
  height: 50px;
  border-radius: 55px;
  border-color: transparent;
  background-image: linear-gradient(#fff, #fff), linear-gradient(to right, #f46222, #ffe94d);
  background-origin: border-box;
  background-clip: content-box, border-box;
  outline: none;

  &::placeholder {
    padding-left: 15px;
  }
`;

const SearchBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 23%;
  font-size: 25px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
