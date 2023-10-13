import { useNavigate } from 'react-router';

import { BiSearch } from 'react-icons/bi';
import styled from 'styled-components';
import { MAIN_COLOR } from '../../color/color';
import { FaArrowLeft } from 'react-icons/fa';
import { SetStateAction, useState } from 'react';

const SearchHead = () => {
  const navigator = useNavigate();

  const [keyword, setKeyword] = useState('%^&');

  const handleSearch = (event: { target: { value: SetStateAction<string> } }) => {
    if (event.target.value === '') {
      setKeyword('%^&');
    } else {
      setKeyword(event.target.value);
    }
  };

  return (
    <>
      <Container>
        <BackBtn onClick={() => navigator(-1)} />
        <HeadWrap>
          <Input type="text" placeholder="닉네임을 입력해주세요" onChange={handleSearch} />
          <SearchBtn />
        </HeadWrap>
      </Container>
    </>
  );
};

export default SearchHead;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

const BackBtn = styled(FaArrowLeft)`
  margin-right: 30px;
  font-size: 1.5rem;
  cursor: pointer;
`;

const HeadWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${MAIN_COLOR};
`;

const Input = styled.input`
  width: 70%;
  height: 40px;
  &:focus {
    outline: none;
  }
`;
const SearchBtn = styled(BiSearch)`
  font-size: 1.5rem;
`;
